"use client";
import { useEffect, useRef, useState } from "react";

interface BlurFadeTextProps {
    text: string;
    className?: string;
    delayBetweenWords?: number; // in ms - delay between words (if animating by words)
    delayBetweenCharacters?: number; // in ms - delay between characters (if animating by characters)
    threshold?: number; // IntersectionObserver threshold (0-1)
    animateOnce?: boolean; // whether to animate only once
}

export default function BlurFadeText({
    text,
    className = "",
    delayBetweenWords,
    delayBetweenCharacters,
    threshold = 0.5,
    animateOnce = true
}: BlurFadeTextProps) {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const textRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Determine animation mode based on which prop is provided
    const animateByCharacters = delayBetweenCharacters !== undefined;
    const delay = animateByCharacters ? delayBetweenCharacters : (delayBetweenWords || 100);

    // Split text into words or characters based on mode
    const items = animateByCharacters ? text.split("") : text.split(" ");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (animateOnce && hasAnimated.current) return;

                        hasAnimated.current = true;
                        setVisibleItems([]);

                        // Animate items one by one
                        items.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, index * delay);
                        });
                    }
                });
            },
            { threshold }
        );

        const currentText = textRef.current;
        if (currentText) {
            observer.observe(currentText);
        }

        return () => {
            if (currentText) {
                observer.unobserve(currentText);
            }
        };
    }, [items, delay, threshold, animateOnce]);

    return (
        <div ref={textRef} className={animateByCharacters ? "flex" : "flex flex-wrap gap-4"}>
            {items.map((item, index) => (
                <span
                    key={index}
                    className={`transition-all duration-1000 ${visibleItems.includes(index)
                        ? "opacity-100 blur-0 translate-y-0"
                        : "opacity-0 blur-md translate-y-8"
                        } ${className}`}
                    style={{
                        transitionDelay: `${index * delay}ms`,
                    }}
                >
                    {item === " " ? "\u00A0" : item}
                </span>
            ))}
        </div>
    );
}
