"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import BlurIn from "../animations/BlurIn";

export default function YouDreamWeCreate() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl">
                {/* Title */}
                <BlurIn delay={0.1} duration={1}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16 md:mb-24 tracking-wide">
                        YOU DREAM, WE CREATE
                    </h2>
                </BlurIn>

                {/* Founder Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {/* Founder 1 Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col group cursor-pointer"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                                alt="Founder 1 - Creative Director"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:rotate-3 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Title and Role */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                                FOUNDER 1
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 tracking-wide">
                                CREATIVE DIRECTOR
                            </p>
                        </div>
                    </motion.div>

                    {/* Founder 2 Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col group cursor-pointer"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                                alt="Founder 2 - Lead Photographer"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:rotate-3 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Title and Role */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                                FOUNDER 2
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 tracking-wide">
                                LEAD PHOTOGRAPHER
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
