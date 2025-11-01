"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

export default function EthicalPractices() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            className="w-full bg-black px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Large Hero Card - Split Layout */}
                <SlideUpCard delay={0}>
                    <div
                        data-cursor-hover="card"
                        className="group relative w-full bg-white rounded-2xl overflow-hidden mb-6 md:mb-8 flex flex-col md:flex-row cursor-pointer"
                    >
                        {/* Image Section */}
                        <div className="relative w-full md:w-[50%] h-[300px] md:h-[420px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                                alt="Ethical Practices"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                                    ETHICAL PRACTICES
                                </h3>
                                <p className="text-sm md:text-base text-gray-600">
                                    150,000 sq ft .....
                                </p>
                            </div>

                            {/* Author Section */}
                            <div className="flex items-center gap-3 mt-8">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                                        alt="A Fashion"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-xs md:text-sm font-medium text-gray-700">A FASHION</p>
                            </div>
                        </div>
                    </div>
                </SlideUpCard>
            </div>
        </section>
    );
}
