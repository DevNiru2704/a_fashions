"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
    const sectionRef = useRef<HTMLElement>(null);

    const images = [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
        "https://images.unsplash.com/photo-1761216674297-6ffa4d89400c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    ];

    // Scroll progress for the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // ========== ANIMATION CONTROLS ==========

    // TEXT ZOOM: Zooms in gradually throughout the scroll, reaches full size when settling
    const TEXT_ZOOM_RANGE = [0, 0.85]; // Zoom in gradually throughout most of the section
    const TEXT_ZOOM_AMOUNT = [0.75, 1]; // Very small -> Full size

    // IMAGE ANIMATIONS: Start appearing when text starts scrolling down
    const IMAGE_APPEAR_RANGE = [0.30, 0.50]; // Appear when text starts scrolling down
    const IMAGE_ZOOM_AMOUNT = [0.8, 1, 1.05]; // Start scale, Mid scale, End scale

    // IMAGE SLIDE UP: Images slide up from below as they appear
    const IMAGE_SLIDE_RANGE = [0.35, 0.65]; // Slide up as text scrolls down
    const IMAGE_SLIDE_DISTANCE = [300, 0]; // Start 300px below, slide to normal position

    // TEXT MOVEMENT: Starts below, slides up smoothly, pauses briefly, then slides down gradually
    const TEXT_MOVE_RANGE = [0, 0.25, 0.35, 0.75]; // Slide up -> pause -> slide down
    const TEXT_MOVE_DISTANCE = [500, 400, 600, 1700]; // Start 500px -> slide to 400px -> hold -> slide to 1300px

    // ========================================

    // Text content animations - always visible, no opacity
    const textScale = useTransform(scrollYProgress, TEXT_ZOOM_RANGE, TEXT_ZOOM_AMOUNT);

    // Images appear and slide up from below when text starts scrolling down
    const imagesOpacity = useTransform(scrollYProgress, IMAGE_APPEAR_RANGE, [0, 1]);
    const imagesScale = useTransform(scrollYProgress, [IMAGE_APPEAR_RANGE[0], IMAGE_APPEAR_RANGE[1], 0.8], IMAGE_ZOOM_AMOUNT);
    const imagesY = useTransform(scrollYProgress, IMAGE_SLIDE_RANGE, IMAGE_SLIDE_DISTANCE);

    // Text slides up to appear, then slides down with scroll
    const titleY = useTransform(scrollYProgress, TEXT_MOVE_RANGE, TEXT_MOVE_DISTANCE);

    return (
        <section ref={sectionRef} className="relative z-20 w-full bg-black min-h-[350vh]">
            {/* Extra space at the top for scroll effect */}
            <div className="h-[50vh] md:h-[50vh]" />

            {/* Push images down so they start below the text */}
            <div className="h-[60vh]" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                {/* Images - Staggered Layout */}
                <div className="flex flex-col -space-y-20 md:-space-y-32">
                    {/* First image - Left aligned */}
                    <motion.div
                        style={{ opacity: imagesOpacity, scale: imagesScale, y: imagesY }}
                        className="relative w-full md:w-[45%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={images[0]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Second image - Right aligned */}
                    <motion.div
                        style={{ opacity: imagesOpacity, scale: imagesScale, y: imagesY }}
                        className="relative w-full md:w-[35%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden md:ml-auto z-10"
                    >
                        <Image
                            src={images[1]}
                            alt="Who we are 2"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Third image - Left aligned */}
                    <motion.div
                        style={{ opacity: imagesOpacity, scale: imagesScale, y: imagesY }}
                        className="relative w-full md:w-[45%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={images[2]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Sticky Content Block - Title, Paragraph, and Button all move together */}
            <motion.div
                style={{
                    scale: textScale,
                    y: titleY
                }}
                className="absolute top-[50vh] left-0 w-full z-50 pointer-events-none mix-blend-difference"
            >
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none">
                            WHO WE ARE
                        </h2>

                        <div className="flex flex-col gap-6 md:max-w-md lg:max-w-lg pointer-events-auto">
                            <p className="text-white text-base md:text-xl leading-relaxed">
                                At A Fashion, we are a team of<br />
                                passionate creatives dedicated to<br />
                                crafting striking visual narratives.<br />
                                Specializing in photography,<br />
                                videography, and creative direction,<br />
                                we bring brands, stories, and concepts<br />
                                to life with a refined artistic touch.
                            </p>

                            <Link
                                href="/our-story"
                                className="group text-white text-lg md:text-lg font-medium px-8 py-3 self-start inline-flex items-center gap-3 transition-all duration-300 hover:bg-white"
                                style={{
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderRadius = '0px';
                                    e.currentTarget.style.webkitTextStroke = '1px black';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderRadius = '16px';
                                    e.currentTarget.style.webkitTextStroke = '0px';
                                }}
                            >
                                KNOW MORE
                                <span className="text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Horizontal line at the bottom */}
            <div className="w-full h-px bg-white/20 mt-20 md:mt-32" />
        </section>
    );
}