import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import DOMPurify from 'isomorphic-dompurify';

// Enhanced rate limiter with multiple tiers
const rateLimiterStrict = new RateLimiterMemory({
    points: 3, // 3 requests
    duration: 60, // per 1 minute
    blockDuration: 300, // Block for 5 minutes if exceeded
});

const rateLimiterModerate = new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 3600, // per 1 hour
    blockDuration: 3600, // Block for 1 hour if exceeded
});

const rateLimiterDaily = new RateLimiterMemory({
    points: 50, // 50 requests
    duration: 86400, // per 24 hours
    blockDuration: 86400, // Block for 24 hours if exceeded
});

// Security event logging
function logSecurityEvent(event: string, details: any) {
    const timestamp = new Date().toISOString();
    console.warn(`[SECURITY] ${timestamp} - ${event}:`, JSON.stringify(details));
}

// Get client IP with multiple fallbacks
function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

    if (cfConnectingIp) return cfConnectingIp;
    if (realIp) return realIp;
    if (forwardedFor) return forwardedFor.split(',')[0].trim();

    return 'unknown';
}

// Enhanced input sanitization with DOMPurify
function sanitizeInput(input: string, fieldName: string): string {
    // Remove any HTML/script tags using DOMPurify
    const cleanHtml = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // No HTML tags allowed
        ALLOWED_ATTR: [], // No attributes allowed
    });

    // Additional sanitization
    const sanitized = cleanHtml
        .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();

    // Length limits based on field
    const maxLengths: Record<string, number> = {
        name: 100,
        email: 254, // RFC 5321
        message: 5000,
        honeypot: 0, // Should always be empty
    };

    const maxLength = maxLengths[fieldName] || 1000;
    return sanitized.slice(0, maxLength);
}

// Enhanced email validation
function isValidEmail(email: string): boolean {
    // RFC 5322 compliant regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) return false;

    // Additional checks
    if (email.length > 254) return false;
    if (email.includes('..')) return false; // Double dots not allowed
    if (email.startsWith('.') || email.endsWith('.')) return false;

    // Blacklist common spam/temporary email domains
    const spamDomains = [
        'tempmail.com', 'throwaway.email', '10minutemail.com',
        'guerrillamail.com', 'mailinator.com', 'trashmail.com'
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    if (spamDomains.includes(domain)) {
        logSecurityEvent('SPAM_EMAIL_DOMAIN', { email: domain });
        return false;
    }

    return true;
}

// Verify hCaptcha token
async function verifyHCaptcha(token: string): Promise<boolean> {
    if (!process.env.HCAPTCHA_SECRET_KEY) {
        console.warn('hCaptcha secret key not configured');
        return true; // Allow if not configured (for development)
    }

    try {
        const response = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
        });

        const data = await response.json();
        return data.success === true;
    } catch (error) {
        logSecurityEvent('HCAPTCHA_VERIFICATION_ERROR', { error });
        return false;
    }
}

// Validate request origin (CSRF protection)
function validateOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Allow requests from same origin
    const allowedOrigins = [
        process.env.NEXT_PUBLIC_SITE_URL,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ].filter(Boolean);

    if (origin) {
        return allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed!));
    }

    if (referer) {
        return allowedOrigins.some(allowed => referer.startsWith(allowed!));
    }

    // If neither origin nor referer, might be a direct API call
    return false;
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();
    const clientIp = getClientIp(request);

    try {
        // 1. CORS and Origin Validation
        if (!validateOrigin(request)) {
            logSecurityEvent('INVALID_ORIGIN', {
                ip: clientIp,
                origin: request.headers.get('origin'),
                referer: request.headers.get('referer'),
            });
            return NextResponse.json(
                { error: 'Invalid request origin.' },
                { status: 403 }
            );
        }

        // 2. Rate Limiting (Multi-tier)
        try {
            await rateLimiterStrict.consume(clientIp);
            await rateLimiterModerate.consume(clientIp);
            await rateLimiterDaily.consume(clientIp);
        } catch (rateLimitError: any) {
            logSecurityEvent('RATE_LIMIT_EXCEEDED', {
                ip: clientIp,
                msBeforeNext: rateLimitError.msBeforeNext,
            });

            const retryAfter = Math.ceil(rateLimitError.msBeforeNext / 1000) || 60;

            return NextResponse.json(
                {
                    error: 'Too many requests. Please try again later.',
                    retryAfter,
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': retryAfter.toString(),
                    },
                }
            );
        }

        // 3. Parse request body with size check
        let body;
        try {
            const text = await request.text();

            // Check payload size (100KB limit)
            if (text.length > 100 * 1024) {
                logSecurityEvent('PAYLOAD_TOO_LARGE', {
                    ip: clientIp,
                    size: text.length,
                });
                return NextResponse.json(
                    { error: 'Request payload too large.' },
                    { status: 413 }
                );
            }

            body = JSON.parse(text);
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid request format.' },
                { status: 400 }
            );
        }

        const { name, email, message, honeypot, captchaToken } = body;

        // 4. Honeypot Check (bot detection)
        if (honeypot && honeypot.trim() !== '') {
            logSecurityEvent('HONEYPOT_TRIGGERED', {
                ip: clientIp,
                honeypot,
            });
            // Pretend success to confuse bots
            return NextResponse.json(
                { message: 'Email sent successfully!' },
                { status: 200 }
            );
        }

        // 5. Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // 6. Validate email format
        if (!isValidEmail(email)) {
            logSecurityEvent('INVALID_EMAIL', {
                ip: clientIp,
                email,
            });
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        // 7. Verify hCaptcha
        if (!captchaToken) {
            return NextResponse.json(
                { error: 'Captcha verification required.' },
                { status: 400 }
            );
        }

        const isCaptchaValid = await verifyHCaptcha(captchaToken);
        if (!isCaptchaValid) {
            logSecurityEvent('CAPTCHA_FAILED', {
                ip: clientIp,
                email,
            });
            return NextResponse.json(
                { error: 'Captcha verification failed. Please try again.' },
                { status: 400 }
            );
        }

        // 8. Sanitize inputs
        const sanitizedName = sanitizeInput(name, 'name');
        const sanitizedEmail = sanitizeInput(email, 'email');
        const sanitizedMessage = sanitizeInput(message, 'message');

        // 9. Validate sanitized inputs aren't empty
        if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
            return NextResponse.json(
                { error: 'Invalid input detected.' },
                { status: 400 }
            );
        }

        // 10. Check for suspicious patterns
        const suspiciousPatterns = [
            /viagra|cialis|pharmacy/i,
            /casino|poker|gambling/i,
            /crypto|bitcoin|investment/i,
            /click here|buy now/i,
            /<script|javascript:|onerror=/i,
        ];

        const fullText = `${sanitizedName} ${sanitizedEmail} ${sanitizedMessage}`;
        if (suspiciousPatterns.some(pattern => pattern.test(fullText))) {
            logSecurityEvent('SUSPICIOUS_CONTENT', {
                ip: clientIp,
                email: sanitizedEmail,
            });
            return NextResponse.json(
                { error: 'Your message contains suspicious content.' },
                { status: 400 }
            );
        }

        // 11. Validate environment variables
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

        // 12. Create transporter with enhanced security
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: 'TLSv1.2',
                ciphers: 'HIGH:!aNULL:!MD5:!RC4',
            },
            requireTLS: true,
            connectionTimeout: 10000,
            socketTimeout: 10000,
            pool: true, // Use connection pooling
            maxConnections: 5,
            maxMessages: 100,
        });

        // 13. Verify transporter
        await transporter.verify();

        // 14. Email content with additional security info
        const mailOptions = {
            from: {
                name: 'A Fashions Contact Form',
                address: process.env.EMAIL_USER,
            },
            to: process.env.EMAIL_TO,
            replyTo: sanitizedEmail,
            subject: `Contact Form: ${sanitizedName}`,
            text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}
IP: ${clientIp}
Time: ${new Date().toISOString()}

Message:
${sanitizedMessage}

---
Security: Verified by hCaptcha
      `,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 10px 0;"><strong>IP:</strong> ${clientIp}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #333;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            ✓ Verified by hCaptcha | Sent from A Fashions contact form
          </p>
        </div>
      `,
        };

        // 15. Send email
        await transporter.sendMail(mailOptions);

        // 16. Log successful submission
        const processingTime = Date.now() - startTime;
        console.log(`[SUCCESS] Email sent from ${clientIp} in ${processingTime}ms`);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            {
                status: 200,
                headers: {
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                },
            }
        );
    } catch (error: any) {
        logSecurityEvent('EMAIL_SEND_ERROR', {
            ip: clientIp,
            error: error.message,
        });

        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
        process.env.NEXT_PUBLIC_SITE_URL,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ].filter(Boolean);

    const isAllowed = allowedOrigins.some(allowed => origin === allowed || origin?.startsWith(allowed!));

    if (!isAllowed) {
        return new NextResponse(null, { status: 403 });
    }

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        },
    });
}
