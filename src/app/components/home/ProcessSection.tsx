"use client";
import { useEffect, useRef, useState } from "react";

interface ProcessStep {
    title: string;
    icon: string; // Path to SVG icon (to be added later)
}

const processSteps: ProcessStep[] = [
    { title: "Design & Development", icon: "/assets/images/design-icon.svg" },
    { title: "Merchandising Team", icon: "/assets/images/merchandising-icon.svg" },
    { title: "Production Team", icon: "/assets/images/production-icon.svg" },
    { title: "Quality Assurance", icon: "/assets/images/quality-icon.svg" },
];

export default function ProcessSection() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const [translateY, setTranslateY] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;

            // Calculate when section is in view
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            // Parallax effect - move section faster upward as user scrolls
            // This creates the "overtaking" effect
            const scrollPosition = window.scrollY;
            const animatedTextSectionStart = windowHeight * 3; // After video (100vh) + logo (100vh)

            if (scrollPosition > animatedTextSectionStart) {
                // Move section up faster (multiply by factor > 1 to speed up)
                const parallaxSpeed = 1.5; // 1.5x faster than normal scroll
                const offset = (scrollPosition - animatedTextSectionStart) * (parallaxSpeed - 1);
                setTranslateY(-offset);
            }

            // Progress starts when section enters viewport and completes when it exits
            if (sectionTop < windowHeight && sectionBottom > 0) {
                // Calculate progress (0 to 1)
                const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
                const progress = Math.min(
                    Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0),
                    1
                );

                setScrollProgress(progress);

                // Show steps progressively based on scroll progress
                const newVisibleSteps: number[] = [];
                processSteps.forEach((_, index) => {
                    const stepThreshold = (index + 1) / processSteps.length;
                    if (progress >= stepThreshold - 0.15) {
                        newVisibleSteps.push(index);
                    }
                });
                setVisibleSteps(newVisibleSteps);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col items-center justify-center py-20 px-8 md:px-12 lg:px-16"
            style={{
                backgroundColor: "#E8E8E8",
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.1s linear"
            }}
        >
            {/* Header */}
            <div className="text-center mb-16">
                <h3 className="text-orange-500 text-sm md:text-base font-medium tracking-widest mb-4">
                    OUR PROCESS
                </h3>
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    ENSURING ABSOLUTE RESULTS
                </h2>
            </div>

            {/* Progress Line Container */}
            <div className="relative w-full max-w-6xl">
                {/* Vertical Progress Line - Left on mobile, Center on desktop */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 md:transform md:-translate-x-1/2">
                    {/* Animated Orange Progress Fill */}
                    <div
                        className="absolute top-0 left-0 w-full bg-orange-500 transition-all duration-300 ease-out"
                        style={{
                            height: `${scrollProgress * 100}%`,
                        }}
                    />
                </div>

                {/* Process Steps */}
                <div className="relative space-y-32 py-12">
                    {processSteps.map((step, index) => {
                        // Design & Development: right, Merchandising: left, Production: right, Quality Assurance: left
                        const isRight = index === 0 || index === 2; // Index 0 and 2 are right-aligned
                        const isVisible = visibleSteps.includes(index);

                        return (
                            <div
                                key={index}
                                className="relative flex items-center"
                            >
                                {/* Arrow Icon Circle - Left on mobile, center on desktop */}
                                <div
                                    className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black border-4 border-[#E8E8E8] flex items-center justify-center z-10 transition-all duration-500 ${isVisible
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-50"
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {/* Card - Full width on mobile with left padding, positioned left/right on desktop */}
                                <div
                                    className={`w-full pl-20 md:pl-0 md:w-[45%] ${isRight ? "md:ml-auto md:pl-16" : "md:mr-auto md:pr-16"
                                        }`}
                                >
                                    <div
                                        className={`bg-black rounded-2xl p-8 transition-all duration-700 ${isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-12"
                                            }`}
                                        style={{
                                            transitionDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        {/* Icon Placeholder */}
                                        <div className="w-16 h-16 mb-6 rounded-full border-2 border-white flex items-center justify-center">
                                            {/* SVG icon will go here */}
                                            <div className="w-8 h-8 bg-white rounded-full" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-white text-xl md:text-2xl font-semibold">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Final Arrow at the end of progress bar */}
                    <div className="relative flex items-center pt-12">
                        <div
                            className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black border-4 border-[#E8E8E8] flex items-center justify-center z-10 transition-all duration-500 ${scrollProgress >= 0.95
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-50"
                                }`}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
