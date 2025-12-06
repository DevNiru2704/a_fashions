"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlurIn from "../animations/BlurIn";

type Props = {
    title?: string;
    paragraphs?: string[];
};

export default function OurStorySection(props: Props = {}) {
    const { title = "OUR STORY", paragraphs = [
        "TWO FRIENDS, ONE VISION.",
        "ARIJIT AND ANDREW, BOUND BY FRIENDSHIP AND A SHARED PASSION FOR LEATHER, CAME TOGETHER TO ESTABLISH A FASHIONS — A LEATHER GOODS EXPORT UNIT DEDICATED TO DESIGN EXCELLENCE AND UNCOMPROMISING QUALITY.",
        "ARIJIT, A LEATHER FASHION DESIGN GRADUATE WITH OVER 25 YEARS OF EXPERIENCE, BRINGS CREATIVITY AND GLOBAL DESIGN INSIGHT.",
        "ANDREW, A FOURTH-GENERATION TANNER WITH MORE THAN 25 YEARS IN THE TRADE, CONTRIBUTES DEEP EXPERTISE IN LEATHER CRAFTSMANSHIP AND TRADITION.",
        "BACKED BY THEIR DEDICATED TEAM, ARIJIT AND ANDREW COMBINE DESIGN INNOVATION, HERITAGE, AND SKILLED WORKMANSHIP TO CREATE FINEST LEATHER PRODUCTS FOR INTERNATIONAL MARKETS.",
        "AT A FASHIONS, WE BELIEVE IN COLLABORATION, CREATIVITY, AND EXCELLENCE.",
        "JOIN OUR JOURNEY — LET'S CREATE TIMELESS LEATHER PRODUCTS TOGETHER."
    ] } = props;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            className="min-h-screen w-full bg-black flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 tracking-wide"
                >
                    {title}
                </motion.h1>

                {/* Content */}
                <BlurIn delay={0.2} duration={1}>
                    <div className="space-y-8 md:space-y-10">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                                {p}
                            </p>
                        ))}
                    </div>
                </BlurIn>
            </div>
        </section>
    );
}
