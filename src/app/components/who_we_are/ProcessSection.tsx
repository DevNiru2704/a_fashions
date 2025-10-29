"use client";
import { useEffect, useRef, useState } from "react";

interface ProcessStep {
    title: string;
    icon: string;
    description: string;
}

const processSteps: ProcessStep[] = [
    {
        title: "Design & Development",
        icon: "/assets/images/design_and_development.svg",
        description: "Our in-house Design & Development team, which blends creativity, craftsmanship, and technical expertise. The team constantly studies global fashion trends and materials to create seasonal design collections that are both functional and refined."
    },
    {
        title: "Merchandising Team",
        icon: "/assets/images/merchandising_team.svg",
        description: "Our Merchandising team serves as the vital link between our clients and every department within the company. They ensure that each order — from sampling to final shipment — runs smoothly, efficiently, and as per the client's expectations."
    },
    {
        title: "Production Team",
        icon: "/assets/images/production_team.svg",
        description: "The Production team oversees the manufacturing process, ensuring high-quality construction and adherence to design specifications. From pattern-making and stitching to finishing and packing, they maintain strict quality standards while optimizing workflow to meet delivery schedules."
    },
    {
        title: "Quality Assurance",
        icon: "/assets/images/quality_assurance.svg",
        description: "Our Quality Assurance team ensures that every product meets both buyer expectations and international quality standards. They conduct inspections at every stage — from incoming materials to final shipment — monitoring craftsmanship, functionality, and compliance to deliver perfect products."
    },
];

export default function ProcessSectionStandalone() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;

            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            if (sectionTop < windowHeight && sectionBottom > 0) {
                const progress = Math.min(Math.max((windowHeight - sectionTop) / sectionHeight, 0), 1);
                setScrollProgress(progress);

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
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col items-center justify-center py-20 px-8 md:px-12 lg:px-16"
            style={{ backgroundColor: "#E8E8E8" }}
        >
            {/* Header */}
            <div className="text-center mb-16">
                <h3 className="text-orange-500 text-base md:text-xl lg:text-2xl font-medium tracking-widest mb-4">
                    OUR PROCESS
                </h3>
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    ENSURING ABSOLUTE RESULTS
                </h2>
            </div>

            {/* Progress Line Container */}
            <div className="relative w-full max-w-6xl">
                {/* Vertical Progress Line */}
                <div className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gray-300 md:transform md:-translate-x-1/2" style={{ height: 'calc(100% - 3rem)' }}>
                    <div
                        className="absolute top-0 left-0 w-full bg-orange-500 transition-all duration-300 ease-out"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />
                </div>

                {/* Process Steps */}
                <div className="relative space-y-32 py-12">
                    {/* Initial Arrow */}
                    <div className="relative flex items-center pb-12">
                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black border-4 border-[#E8E8E8] flex items-center justify-center z-10">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {processSteps.map((step, index) => {
                        const isRight = index === 0 || index === 2;
                        const isVisible = visibleSteps.includes(index);

                        return (
                            <div key={index} className="relative flex items-center">
                                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black border-4 border-[#E8E8E8] flex items-center justify-center z-10 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div className={`w-full pl-20 md:pl-0 md:w-[45%] ${isRight ? "md:ml-auto md:pl-16" : "md:mr-auto md:pr-16"}`}>
                                    <div className={`bg-black rounded-2xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${index * 100}ms` }}>
                                        <img src={step.icon} alt={step.title} className="w-32 h-32 md:w-36 md:h-36" />
                                        <h3 className="text-white text-xl md:text-2xl font-semibold mb-4">{step.title}</h3>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
