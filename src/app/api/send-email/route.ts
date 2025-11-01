import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) {
            rateLimitMap.delete(key);
        }
    }
}, 60000); // Clean up every minute

function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(identifier);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + 60000, // 1 minute window
        });
        return true;
    }

    if (limit.count >= 3) {
        // Max 3 requests per minute
        return false;
    }

    limit.count++;
    return true;
}

function sanitizeInput(input: string): string {
    // Remove any potentially harmful characters
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .trim()
        .slice(0, 5000); // Limit length
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const forwardedFor = request.headers.get('x-forwarded-for');
        const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

        // Check rate limit
        if (!checkRateLimit(clientIp)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);

        // Validate environment variables
        if (
            !process.env.EMAIL_HOST ||
            !process.env.EMAIL_PORT ||
            !process.env.EMAIL_USER ||
            !process.env.EMAIL_PASSWORD ||
            !process.env.EMAIL_TO
        ) {
            console.error('Missing email configuration');
            return NextResponse.json(
                { error: 'Email service is not configured properly.' },
                { status: 500 }
            );
        }

        // Create transporter with TLS/SSL encryption
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === '465', // true for 465 (SSL), false for 587 (STARTTLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                // Enforce TLS encryption
                rejectUnauthorized: true,
                minVersion: 'TLSv1.2',
                ciphers: 'HIGH:!aNULL:!MD5:!RC4', // Use strong ciphers only
            },
            requireTLS: true, // Force TLS encryption
            // Connection timeout
            connectionTimeout: 10000,
            // Socket timeout
            socketTimeout: 10000,
        });

        // Verify transporter configuration
        await transporter.verify();

        // Email content
        const mailOptions = {
            from: {
                name: 'A Fashions Contact Form',
                address: process.env.EMAIL_USER,
            },
            to: process.env.EMAIL_TO,
            replyTo: sanitizedEmail,
            subject: `New Contact Form Submission from ${sanitizedName}`,
            text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Message: ${sanitizedMessage}
      `,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #333;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the A Fashions contact form.
          </p>
        </div>
      `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
