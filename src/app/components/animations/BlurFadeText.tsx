"use client";
import { useEffect, useRef, useState } from "react";

interface BlurFadeTextProps {
    text: string;
    className?: string;
    delayBetweenWords?: number; // in ms
    threshold?: number; // IntersectionObserver threshold (0-1)
    animateOnce?: boolean; // whether to animate only once
}

export default function BlurFadeText({
    text,
    className = "",
    delayBetweenWords = 100,
    threshold = 0.5,
    animateOnce = true
}: BlurFadeTextProps) {
    const [visibleWords, setVisibleWords] = useState<number[]>([]);
    const textRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const words = text.split(" ");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (animateOnce && hasAnimated.current) return;

                        hasAnimated.current = true;
                        setVisibleWords([]);

                        // Animate words one by one
                        words.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleWords((prev) => [...prev, index]);
                            }, index * delayBetweenWords);
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
    }, [words, delayBetweenWords, threshold, animateOnce]);

    return (
        <div ref={textRef} className="flex flex-wrap gap-4">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`transition-all duration-1000 ${visibleWords.includes(index)
                        ? "opacity-100 blur-0 translate-y-0"
                        : "opacity-0 blur-md translate-y-8"
                        } ${className}`}
                    style={{
                        transitionDelay: `${index * 100}ms`,
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}
