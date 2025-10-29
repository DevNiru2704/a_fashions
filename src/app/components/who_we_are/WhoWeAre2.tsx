"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function WhoWeAre2() {
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

    // IMAGE SPACING: Control gaps between images
    const IMAGE_GAP_MOBILE = 20; // Vertical gap mobile (20 = -80px overlap)
    const IMAGE_GAP_DESKTOP = 32; // Vertical gap desktop (32 = -128px overlap)

    // SECTION SPACING: Control spacing around content
    const SECTION_MIN_HEIGHT = 280; // Minimum section height (in vh)
    const IMAGE_TOP_SPACING = 50; // Space at top before images start (in vh)

    // TEXT CONTENT SPACING: Control gap between title and paragraph
    const TEXT_CONTENT_GAP = 12; // Gap between "WHO WE ARE" and paragraph (in tailwind units, 16 = 64px)

    // IMAGE DIMENSIONS: Control image width and height
    const IMAGE_WIDTH_DESKTOP = 45; // Image width as percentage (45 = 45% width)
    const IMAGE_HEIGHT_MOBILE = 800; // Mobile image height in pixels
    const IMAGE_HEIGHT_DESKTOP = 700; // Desktop image height in pixels
    const IMAGE_EDGE_PUSH = 100; // Push images toward edges (in pixels, negative margin)

    // CONTAINER WIDTH: Control horizontal gap by adjusting container width
    const CONTAINER_MAX_WIDTH = 1480; // Max width in pixels (smaller = more gap, larger = less gap)

    // TEXT MOVEMENT: Starts at top, stays for a while, then slides down with scroll
    const TEXT_MOVE_RANGE = [0, 0.3, 0.4, 0.95]; // Stay -> pause -> slide down
    const TEXT_MOVE_DISTANCE = [0, 300, 600, 2000]; // Stay at 0 -> stay at 0 -> start sliding -> end far down

    // ========================================

    // Text moves along with scroll
    const titleY = useTransform(scrollYProgress, TEXT_MOVE_RANGE, TEXT_MOVE_DISTANCE);

    return (
        <section ref={sectionRef} className="relative z-10 w-full bg-black" style={{ minHeight: `${SECTION_MIN_HEIGHT}vh` }}>
            {/* Text Content Block - Positioned absolutely, moves with scroll */}
            <motion.div
                style={{
                    y: titleY,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    perspective: 1000,
                    WebkitPerspective: 1000
                }}
                className="absolute top-20 md:top-32 left-0 w-full z-50 pointer-events-none mix-blend-difference"
                transition={{ type: "tween", ease: "linear" }}
            >
                <div
                    className="w-full mx-auto px-6 md:px-12"
                    style={{ maxWidth: `${CONTAINER_MAX_WIDTH}px` }}
                >
                    <div
                        className="flex flex-col md:flex-row md:items-start md:justify-between"
                        style={{ gap: `${TEXT_CONTENT_GAP * 4}px` }}
                    >
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
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Space at top for text content */}
            <div style={{ height: `${IMAGE_TOP_SPACING}vh` }} />

            <div
                className="w-full mx-auto"
                style={{ maxWidth: `${CONTAINER_MAX_WIDTH}px` }}
            >
                {/* Images - Staggered Layout */}
                <div
                    className="flex flex-col md:hidden"
                    style={{ gap: `${IMAGE_GAP_MOBILE * -4}px` }}
                >
                    {/* Mobile images */}
                    {/* First image - Left aligned */}
                    <div
                        style={{ height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
                    >
                        <Image
                            src={images[0]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Second image - Right aligned */}
                    <div
                        style={{ height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
                    >
                        <Image
                            src={images[1]}
                            alt="Who we are 2"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Third image - Left aligned */}
                    <div
                        style={{ height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
                    >
                        <Image
                            src={images[2]}
                            alt="Who we are 3"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Desktop images */}
                <div
                    className="hidden md:flex flex-col"
                    style={{ gap: `${IMAGE_GAP_DESKTOP * -4}px` }}
                >
                    {/* First image - Left aligned */}
                    <div
                        style={{
                            width: `${IMAGE_WIDTH_DESKTOP}%`,
                            height: `${IMAGE_HEIGHT_DESKTOP}px`,
                            marginLeft: `-${IMAGE_EDGE_PUSH}px`
                        }}
                        className="relative overflow-hidden"
                    >
                        <Image
                            src={images[0]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Second image - Right aligned */}
                    <div
                        style={{
                            width: `${IMAGE_WIDTH_DESKTOP}%`,
                            height: `${IMAGE_HEIGHT_DESKTOP}px`,
                            marginRight: `-${IMAGE_EDGE_PUSH}px`
                        }}
                        className="relative overflow-hidden md:ml-auto z-10"
                    >
                        <Image
                            src={images[1]}
                            alt="Who we are 2"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Third image - Left aligned */}
                    <div
                        style={{
                            width: `${IMAGE_WIDTH_DESKTOP}%`,
                            height: `${IMAGE_HEIGHT_DESKTOP}px`,
                            marginLeft: `-${IMAGE_EDGE_PUSH}px`
                        }}
                        className="relative overflow-hidden"
                    >
                        <Image
                            src={images[2]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}