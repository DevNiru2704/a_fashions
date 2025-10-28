"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import MorphButton from "../animations/MorphButton";

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
    const TEXT_ZOOM_AMOUNT = [0.60, 1]; // Very small -> Full size

    // IMAGE ANIMATIONS: Zoom in gradually throughout the section - always visible
    const IMAGE_ZOOM_RANGE = [0.30, 0.85]; // When zoom happens (start to end)
    const IMAGE_ZOOM_START = 0.4; // Starting zoom size (0.2 = 20%, 0.5 = 50%, etc.)
    const IMAGE_ZOOM_END = 1; // Ending zoom size (1 = 100%, 1.2 = 120%, etc.)
    const IMAGE_ZOOM_AMOUNT = [IMAGE_ZOOM_START, IMAGE_ZOOM_END]; // Zoom from start to end

    // IMAGE SLIDE UP: Images slide up from below as they appear
    const IMAGE_SLIDE_RANGE = [0.35, 0.65]; // Slide up as text scrolls down
    const IMAGE_SLIDE_DISTANCE = [400, 0]; // Start 300px below, slide to normal position

    // IMAGE SPACING: Control gaps between images
    const IMAGE_GAP_MOBILE = 20; // Vertical gap mobile (20 = -80px overlap)
    const IMAGE_GAP_DESKTOP = 32; // Vertical gap desktop (32 = -128px overlap)

    // SECTION SPACING: Control spacing around content
    const TOP_SPACER_HEIGHT = 50; // Space at top before images (in vh)
    const IMAGE_START_OFFSET = 60; // Push images down below text (in vh)
    const SECTION_MIN_HEIGHT = 350; // Minimum section height (in vh)

    // TEXT CONTENT SPACING: Control gap between title and paragraph
    const TEXT_CONTENT_GAP = 12; // Gap between "WHO WE ARE" and paragraph (in tailwind units, 16 = 64px)

    // IMAGE DIMENSIONS: Control image width and height
    const IMAGE_WIDTH_DESKTOP = 45; // Image width as percentage (45 = 45% width)
    const IMAGE_HEIGHT_MOBILE = 800; // Mobile image height in pixels
    const IMAGE_HEIGHT_DESKTOP = 700; // Desktop image height in pixels
    const IMAGE_EDGE_PUSH = 100; // Push images toward edges (in pixels, negative margin)

    // CONTAINER WIDTH: Control horizontal gap by adjusting container width
    const CONTAINER_MAX_WIDTH = 1480; // Max width in pixels (smaller = more gap, larger = less gap)
    // Default is 1280px (max-w-7xl). Try 1024px (max-w-5xl) for more gap, 1536px (max-w-7xl) for less

    // TEXT MOVEMENT: Starts below, slides up smoothly, pauses briefly, then slides down gradually
    const TEXT_MOVE_RANGE = [0, 0.25, 0.35, 0.95]; // Slide up -> pause -> slide down slower
    const TEXT_MOVE_DISTANCE = [500, 400, 600, 2400]; // Start 500px -> slide to 400px -> hold -> settle at 1600px

    // ========================================

    // Text content animations - always visible, no opacity
    const textScale = useTransform(scrollYProgress, TEXT_ZOOM_RANGE, TEXT_ZOOM_AMOUNT);

    // Images zoom in/out and slide up - always visible, no opacity fade
    const imagesScale = useTransform(scrollYProgress, IMAGE_ZOOM_RANGE, IMAGE_ZOOM_AMOUNT);
    const imagesY = useTransform(scrollYProgress, IMAGE_SLIDE_RANGE, IMAGE_SLIDE_DISTANCE);


    // Text slides up to appear, then slides down with scroll
    const titleY = useTransform(scrollYProgress, TEXT_MOVE_RANGE, TEXT_MOVE_DISTANCE);

    return (
        <section ref={sectionRef} className="relative z-20 w-full bg-black" style={{ minHeight: `${SECTION_MIN_HEIGHT}vh` }}>
            {/* Extra space at the top for scroll effect */}
            <div style={{ height: `${TOP_SPACER_HEIGHT}vh` }} />

            {/* Push images down so they start below the text */}
            <div style={{ height: `${IMAGE_START_OFFSET}vh` }} />

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
                    <motion.div
                        style={{ scale: imagesScale, y: imagesY, height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
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
                        style={{ scale: imagesScale, y: imagesY, height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
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
                        style={{ scale: imagesScale, y: imagesY, height: `${IMAGE_HEIGHT_MOBILE}px` }}
                        className="relative w-full overflow-hidden"
                    >
                        <Image
                            src={images[2]}
                            alt="Who we are 3"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Desktop images */}
                <div
                    className="hidden md:flex flex-col"
                    style={{ gap: `${IMAGE_GAP_DESKTOP * -4}px` }}
                >
                    {/* First image - Left aligned */}
                    <motion.div
                        style={{
                            scale: imagesScale,
                            y: imagesY,
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
                    </motion.div>

                    {/* Second image - Right aligned */}
                    <motion.div
                        style={{
                            scale: imagesScale,
                            y: imagesY,
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
                    </motion.div>

                    {/* Third image - Left aligned */}
                    <motion.div
                        style={{
                            scale: imagesScale,
                            y: imagesY,
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
                    </motion.div>
                </div>
            </div>

            {/* Sticky Content Block - Title, Paragraph, and Button all move together */}
            <motion.div
                style={{
                    scale: textScale,
                    y: titleY,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    perspective: 1000,
                    WebkitPerspective: 1000
                }}
                className="absolute top-[50vh] left-0 w-full z-50 pointer-events-none mix-blend-difference"
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

                            <MorphButton href="/our-story" className="self-start">
                                KNOW MORE
                            </MorphButton>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Horizontal line at the bottom */}
            <div className="w-full h-px bg-white/20 mt-20 md:mt-32" />
        </section>
    );
}