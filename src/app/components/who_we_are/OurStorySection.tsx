"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlurIn from "../animations/BlurIn";

export default function OurStorySection() {
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
                    OUR STORY
                </motion.h1>

                {/* Content */}
                <BlurIn delay={0.2} duration={1}>
                    <div className="space-y-8 md:space-y-10">
                        {/* Paragraph 1 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            TWO FRIENDS, ONE VISION.
                        </p>

                        {/* Paragraph 2 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            ARIJIT AND ANDREW, BOUND BY FRIENDSHIP AND A SHARED PASSION FOR LEATHER, CAME TOGETHER TO ESTABLISH A FASHIONS — A LEATHER GOODS EXPORT UNIT DEDICATED TO DESIGN EXCELLENCE AND UNCOMPROMISING QUALITY.
                        </p>

                        {/* Paragraph 3 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            ARIJIT, A LEATHER FASHION DESIGN GRADUATE WITH OVER 25 YEARS OF EXPERIENCE, BRINGS CREATIVITY AND GLOBAL DESIGN INSIGHT.
                        </p>

                        {/* Paragraph 4 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            ANDREW, A FOURTH-GENERATION TANNER WITH MORE THAN 25 YEARS IN THE TRADE, CONTRIBUTES DEEP EXPERTISE IN LEATHER CRAFTSMANSHIP AND TRADITION.
                        </p>

                        {/* Paragraph 5 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            BACKED BY THEIR DEDICATED TEAM, ARIJIT AND ANDREW COMBINE DESIGN INNOVATION, HERITAGE, AND SKILLED WORKMANSHIP TO CREATE FINEST LEATHER PRODUCTS FOR INTERNATIONAL MARKETS.
                        </p>

                        {/* Paragraph 6 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            AT A FASHIONS, WE BELIEVE IN COLLABORATION, CREATIVITY, AND EXCELLENCE.
                        </p>

                        {/* Paragraph 7 */}
                        <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                            JOIN OUR JOURNEY — LET'S CREATE TIMELESS LEATHER PRODUCTS TOGETHER.
                        </p>
                    </div>
                </BlurIn>
            </div>
        </section>
    );
}
