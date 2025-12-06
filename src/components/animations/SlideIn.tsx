"use client";
import { useEffect, useRef, useState } from "react";

interface SlideInProps {
    children: React.ReactNode;
    direction: "left" | "right";
    delay?: number; // in ms
    duration?: number; // in ms
    threshold?: number; // IntersectionObserver threshold (0-1)
    className?: string;
}

export default function SlideIn({
    children,
    direction,
    delay = 0,
    duration = 800,
    threshold = 0.2,
    className = ""
}: SlideInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold]);

    const translateX = direction === "left" ? "-100px" : "100px";

    return (
        <div
            ref={elementRef}
            className={`transition-all ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : `translateX(${translateX})`,
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
            }}
        >
            {children}
        </div>
    );
}
