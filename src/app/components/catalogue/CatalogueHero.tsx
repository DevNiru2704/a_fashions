"use client";
import { useEffect, useRef, useState } from "react";

export default function CatalogueHero() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen w-full flex items-center justify-center bg-black text-white px-8 py-32 pb-12"
        >
            <div className="max-w-4xl text-center">
                <h1
                    className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-wider transition-all duration-1000 ease-out ${isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-16"
                        }`}
                >
                    OUR CATALOG
                </h1>
                <p
                    className={`text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-wide transition-all duration-1000 ease-out delay-300 ${isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-16"
                        }`}
                >
                    A showcase of our finest creations—where creativity meets impact. From bold
                    branding to immersive digital experiences, each project reflects our passion
                    for design and innovation. Explore how we bring ideas to life through
                    thoughtful execution and striking visuals.
                </p>
            </div>
        </section>
    );
}
