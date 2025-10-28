"use client";
import Link from "next/link";
import { useState } from "react";

interface AnimatedButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function MorphButton({ href, children, className = "" }: AnimatedButtonProps) {
    const [borderRadius, setBorderRadius] = useState('16px');

    return (
        <Link
            href={href}
            className={`group text-white text-lg md:text-lg font-medium px-8 py-3 inline-flex items-center gap-3 transition-all duration-300 hover:bg-white hover:text-black ${className}`}
            style={{
                borderRadius,
                transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
                setBorderRadius('4px');
                e.currentTarget.style.webkitTextStroke = '1px black';
            }}
            onMouseLeave={(e) => {
                setBorderRadius('16px');
                e.currentTarget.style.webkitTextStroke = '0px';
            }}
        >
            {children}
            <span className="text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
            </span>
        </Link>
    );
}
