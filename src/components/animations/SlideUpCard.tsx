"use client";
import { useEffect, useRef, useState } from "react";

interface SlideUpCardProps {
    children: React.ReactNode;
    delay?: number;
}

export default function SlideUpCard({ children, delay = 0 }: SlideUpCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ease-out ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
        >
            {children}
        </div>
    );
}
