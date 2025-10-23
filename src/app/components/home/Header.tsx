"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [hoveringNav, setHoveringNav] = useState(false);
    const [scale, setScale] = useState(1);
    const [scrollUp, setScrollUp] = useState(true); // new state for scroll direction
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile menu state
    const cursorRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const hoveringRef = useRef(false);
    const lastScrollY = useRef(0);

    // --- Track scroll direction for hiding/showing navbar ---
    useEffect(() => {
        const handleScrollDirection = () => {
            const currentScroll = window.scrollY;
            // If scrolling down
            if (currentScroll > lastScrollY.current && currentScroll > 100) {
                setScrollUp(false);
                setMobileMenuOpen(false); // Close mobile menu when scrolling down
            } else {
                setScrollUp(true);
            }
            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScrollDirection);
        return () => window.removeEventListener("scroll", handleScrollDirection);
    }, []);

    // --- Update hoveringRef whenever hoveringNav changes ---
    useEffect(() => {
        hoveringRef.current = hoveringNav;
    }, [hoveringNav]);

    // --- Smooth following using requestAnimationFrame ---
    useEffect(() => {
        const mouse = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 };

        const handleMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Check if mouse is within navbar bounds
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                const isOverNav =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                if (isOverNav !== hoveringRef.current) {
                    setHoveringNav(isOverNav);
                    hoveringRef.current = isOverNav;
                }
            }
        };
        window.addEventListener("mousemove", handleMove);

        const follow = () => {
            const delayFactor = 0.08; // Lower = smoother delay
            pos.x += (mouse.x - pos.x) * delayFactor;
            pos.y += (mouse.y - pos.y) * delayFactor;

            const el = cursorRef.current;
            if (el) {
                const helloOffset = { x: 20, y: 10 };
                const ballOffset = { x: 0, y: 0 };
                const { x: offsetX, y: offsetY } =
                    hoveringRef.current ? ballOffset : helloOffset;
                el.style.left = `${pos.x + offsetX}px`;
                el.style.top = `${pos.y + offsetY}px`;
            }

            requestAnimationFrame(follow);
        };

        follow();
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    // --- Scroll animation for curtain videos ---
    useEffect(() => {
        const leftVideo = document.getElementById("left-video") as HTMLVideoElement;
        const rightVideo = document.getElementById("right-video") as HTMLVideoElement;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);

            leftVideo.style.transform = `translateX(-${progress * 100}%)`;
            rightVideo.style.transform = `translateX(${progress * 100}%)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // --- Keep transition smooth ---
    useEffect(() => {
        setScale(1);
    }, [hoveringNav]);

    // --- Navbar + Layout ---
    return (
        <main className="relative min-h-[200vh] w-screen overflow-hidden">
            {/* Navbar */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full h-16 flex items-center justify-center backdrop-blur-md bg-white/5 text-black font-medium z-50 transition-transform duration-500 ease-in-out ${scrollUp ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                {/* Left-aligned logo */}
                <div className="absolute left-8">
                    <Link href="/" className="tracking-widest text-xl cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1">
                        A FASHION
                    </Link>
                </div>

                {/* Desktop menu items - hidden on mobile */}
                <div className="hidden min-[811px]:flex space-x-8">
                    <Link
                        href="/our-story"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer"
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/catalogue"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer"
                    >
                        Catalogue
                    </Link>
                    <Link
                        href="/lets-connect"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer"
                    >
                        Lets Connect
                    </Link>
                </div>

                {/* Hamburger button - visible only on mobile */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="absolute right-8 min-[811px]:hidden w-8 h-6 flex flex-col justify-center items-center gap-[6px] cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-full h-[2px] bg-black transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                            }`}
                    />
                    <span
                        className={`w-full h-[2px] bg-black transition-all duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile menu - slides down/up */}
            <div
                className={`fixed left-0 w-full backdrop-blur-md bg-white/5 z-40 min-[811px]:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    } ${scrollUp ? "top-16" : "-top-full"}`}
            >
                <div className="flex flex-col items-center space-y-6 py-8 text-black font-medium">
                    <Link
                        href="/our-story"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg tracking-wide cursor-pointer"
                    >
                        OUR STORY
                    </Link>
                    <Link
                        href="/catalogue"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg tracking-wide cursor-pointer"
                    >
                        CATALOGUE
                    </Link>
                    <Link
                        href="/lets-connect"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg tracking-wide cursor-pointer"
                    >
                        LETS CONNECT
                    </Link>
                </div>
            </div>

            {/* Curtain Container */}
            <section className="relative h-screen w-screen">
                <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full w-full">
                        <video
                            id="left-video"
                            className="h-1/2 md:h-full md:w-1/2 object-cover will-change-transform transition-transform duration-200 ease-out"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src="/assets/videos/left_video.mp4" type="video/mp4" />
                        </video>

                        <video
                            id="right-video"
                            className="h-1/2 md:h-full md:w-1/2 object-cover will-change-transform transition-transform duration-200 ease-out"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                        >
                            <source src="/assets/videos/right_video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>

            {/* Revealed Section */}
            <section className="absolute -z-10 top-[100vh] left-0 h-[100vh] w-full flex flex-col items-center justify-center" style={{ backgroundColor: '#E8E8E8' }}>
                <div className="flex flex-col items-center justify-center gap-12">
                    {/* Logo */}
                    <img
                        src="/assets/images/afashions_logo.svg"
                        alt="A Fashions Logo"
                        className="w-[80vw] h-auto"
                    />

                    {/* Tagline */}
                    <p className="text-black text-sm md:text-base lg:text-xl font-light text-center px-4">
                        DESIGNING AND MANUFACTURING FINEST LEATHER GOODS
                    </p>
                </div>
            </section>

            {/* Floating Cursor */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[100] mix-blend-difference hidden min-[811px]:block"
                style={{
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                <div
                    className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${hoveringNav
                        ? "w-3 h-3 rounded-full bg-white"
                        : "px-3 py-1 rounded-md text-xs font-medium text-white bg-transparent border border-white"
                        }`}
                    style={{
                        transform: hoveringNav
                            ? "translate(0px, 0px) scale(1)"
                            : "translate(40px, 40px) scale(1.6)",
                        transformOrigin: "center",
                        transition:
                            "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), all 0.3s ease-in-out",
                    }}
                >
                    {!hoveringNav && "HELLO"}
                </div>
            </div>
        </main>
    );
}
