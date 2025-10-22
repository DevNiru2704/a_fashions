"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [hoveringNav, setHoveringNav] = useState(false);
    const [scale, setScale] = useState(1);
    const cursorRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const hoveringRef = useRef(false);

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
                className="fixed top-0 left-0 w-full h-16 flex items-center justify-center backdrop-blur-md bg-white/5 text-black font-medium z-50"
            >
                {/* Left-aligned logo */}
                <div className="absolute left-8">
                    <Link href="/" className="tracking-widest text-xl cursor-pointer">
                        A FASHION
                    </Link>
                </div>

                {/* Center-aligned menu items */}
                <div className="flex space-x-8">
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
            </nav>

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
            <section className="absolute -z-10 top-[100vh] left-0 h-[100vh] w-full bg-black text-white flex items-center justify-center">
                <h1 className="text-5xl font-bold">Revealed Section</h1>
            </section>

            {/* Floating Cursor */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[100] mix-blend-difference"
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
