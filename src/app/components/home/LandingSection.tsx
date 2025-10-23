"use client";
import { useEffect, useRef, useState } from "react";

export default function LandingSection() {
    const [visibleWords, setVisibleWords] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    // Desktop layout: 3 lines
    const desktopLines = [
        ["DESIGNED", "WITH"],
        ["ORIGINALITY", "AND"],
        ["PURPOSE"]
    ];

    // Mobile/Tablet layout: 3 lines
    const mobileLines = [
        ["DESIGNED", "WITH"],
        ["ORIGINALITY"],
        ["AND", "PURPOSE"]
    ];

    // Flatten for sequential animation (use desktop as reference)
    const allWords = desktopLines.flat();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        // Animate words one by one
                        allWords.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleWords((prev) => [...prev, index]);
                            }, index * 20); // 400ms delay between each word
                        });
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* First Section - Logo and Tagline */}
            <section className="absolute -z-10 top-[100vh] left-0 h-[100vh] w-full flex flex-col items-center justify-center" style={{ backgroundColor: '#E8E8E8' }}>
                <div className="flex flex-col items-center justify-center gap-12">
                    {/* Logo */}
                    <img
                        src="/assets/images/afashions_logo.svg"
                        alt="A Fashions Logo"
                        className="w-[80vw] h-auto"
                    />

                    {/* Tagline */}
                    <p className="text-black text-sm md:text-base lg:text-xl font-light text-center px-4">
                        DESIGNING AND MANUFACTURING FINEST LEATHER GOODS
                    </p>
                </div>
            </section>

            {/* Second Section - Animated Text */}
            <section
                ref={sectionRef}
                className="absolute -z-10 top-[200vh] left-0 h-[100vh] w-full flex items-center justify-start px-8 md:px-12 lg:px-16"
                style={{ backgroundColor: '#E8E8E8' }}
            >
                {/* Desktop Layout - Hidden on mobile/tablet */}
                <div className="hidden lg:flex flex-col gap-8 w-full">
                    {desktopLines.map((line, lineIndex) => {
                        const startIndex = desktopLines.slice(0, lineIndex).flat().length;
                        return (
                            <div key={lineIndex} className="flex gap-12">
                                {line.map((word, wordIndex) => {
                                    const globalIndex = startIndex + wordIndex;
                                    return (
                                        <div
                                            key={wordIndex}
                                            className={`text-[12vw] leading-none font-bold text-black tracking-wide transition-all duration-1000 ${visibleWords.includes(globalIndex)
                                                ? "opacity-100 blur-0 translate-y-0"
                                                : "opacity-0 blur-md translate-y-8"
                                                }`}
                                            style={{
                                                transitionDelay: `${globalIndex * 100}ms`,
                                            }}
                                        >
                                            {word}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile/Tablet Layout - Hidden on desktop */}
                <div className="flex lg:hidden flex-col gap-6 w-full">
                    {mobileLines.map((line, lineIndex) => {
                        const startIndex = mobileLines.slice(0, lineIndex).flat().length;
                        return (
                            <div key={lineIndex} className="flex gap-4 md:gap-8">
                                {line.map((word, wordIndex) => {
                                    const globalIndex = startIndex + wordIndex;
                                    return (
                                        <div
                                            key={wordIndex}
                                            className={`text-[10vw] md:text-[9vw] leading-none font-bold text-black tracking-wide transition-all duration-1000 ${visibleWords.includes(globalIndex)
                                                ? "opacity-100 blur-0 translate-y-0"
                                                : "opacity-0 blur-md translate-y-8"
                                                }`}
                                            style={{
                                                transitionDelay: `${globalIndex * 100}ms`,
                                            }}
                                        >
                                            {word}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
