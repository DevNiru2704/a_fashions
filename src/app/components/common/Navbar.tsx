"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavbarProps {
    onNavHover?: (isHovering: boolean) => void;
    navRef?: React.RefObject<HTMLElement | null>;
}

export default function Navbar({ navRef: externalNavRef }: NavbarProps) {
    const [scrollUp, setScrollUp] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isIPad, setIsIPad] = useState(false);
    const internalNavRef = useRef<HTMLElement>(null);
    const navRef = externalNavRef || internalNavRef;
    const lastScrollY = useRef(0);

    // Detect iPad/tablet
    useEffect(() => {
        const checkDevice = () => {
            const ua = navigator.userAgent;
            const isIPadDevice = /iPad|Macintosh/.test(ua) && 'ontouchend' in document;
            setIsIPad(isIPadDevice);
        };
        checkDevice();
    }, []);

    // Track scroll direction for hiding/showing navbar
    useEffect(() => {
        const handleScrollDirection = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollY.current && currentScroll > 100) {
                setScrollUp(false);
                setMobileMenuOpen(false);
            } else {
                setScrollUp(true);
            }
            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScrollDirection);
        return () => window.removeEventListener("scroll", handleScrollDirection);
    }, []);

    // iPad/Tablet version with isolated layers
    if (isIPad) {
        return (
            <>
                {/* Navbar - iPad version */}
                <nav
                    ref={navRef}
                    className={`nav-blur-container fixed top-0 left-0 w-full h-16 font-medium z-50 transition-transform duration-500 ease-in-out ${scrollUp ? "translate-y-0" : "-translate-y-full"
                        }`}
                    style={{
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* Blur background layer */}
                    <div className="nav-blur-bg" />

                    {/* Content with blend mode */}
                    <div className="nav-blend-content w-full h-full">
                        {/* Left-aligned logo */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2">
                            <Link
                                href="/"
                                className="inline-block transition-transform duration-300 ease-out hover:-translate-y-1 tracking-widest text-xl cursor-pointer text-white"
                            >
                                A FASHION
                            </Link>
                        </div>

                        {/* Desktop menu items - centered */}
                        <div className="hidden min-[811px]:flex items-center justify-center space-x-8 h-full">
                            <Link
                                href="/our-story"
                                className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                            >
                                Our Story
                            </Link>
                            <Link
                                href="/catalog"
                                className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                            >
                                Catalog
                            </Link>
                            <Link
                                href="/lets-connect"
                                className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                            >
                                Lets Connect
                            </Link>
                        </div>

                        {/* Hamburger button - visible only on mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="absolute right-8 top-1/2 -translate-y-1/2 min-[811px]:hidden w-8 h-6 flex flex-col justify-center items-center gap-[6px] cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                                    }`}
                            />
                            <span
                                className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile menu - iPad version */}
                <div
                    className={`nav-blur-container fixed left-0 top-16 w-full z-40 min-[811px]:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                        }`}
                    style={{
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* Blur background layer */}
                    <div className="nav-blur-bg" />

                    {/* Content with blend mode */}
                    <div className="nav-blend-content flex flex-col items-center space-y-6 py-8 text-white font-medium">
                        <Link
                            href="/our-story"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg tracking-wide cursor-pointer"
                        >
                            OUR STORY
                        </Link>
                        <Link
                            href="/catalog"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg tracking-wide cursor-pointer"
                        >
                            CATALOG
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
            </>
        );
    }

    // Desktop/Mobile version with direct blur + blend
    return (
        <>
            {/* Navbar - Desktop/Mobile version */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full h-16 font-medium z-50 transition-transform duration-500 ease-in-out backdrop-blur-md bg-black/20 mix-blend-difference ${scrollUp ? "translate-y-0" : "-translate-y-full"
                    }`}
                style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transform: 'translateZ(0)',
                }}
            >
                {/* Left-aligned logo */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                    <Link
                        href="/"
                        className="inline-block transition-transform duration-300 ease-out hover:-translate-y-1 tracking-widest text-xl cursor-pointer text-white"
                    >
                        A FASHION
                    </Link>
                </div>

                {/* Desktop menu items - centered */}
                <div className="hidden min-[811px]:flex items-center justify-center space-x-8 h-full">
                    <Link
                        href="/our-story"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/catalog"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                    >
                        Catalog
                    </Link>
                    <Link
                        href="/lets-connect"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                    >
                        Lets Connect
                    </Link>
                </div>

                {/* Hamburger button - visible only on mobile */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 min-[811px]:hidden w-8 h-6 flex flex-col justify-center items-center gap-[6px] cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                            }`}
                    />
                    <span
                        className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile menu - Desktop/Mobile version */}
            <div
                className={`fixed left-0 top-16 w-full z-40 min-[811px]:hidden transition-all duration-500 ease-in-out backdrop-blur-md bg-black/20 mix-blend-difference ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
                style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transform: 'translateZ(0)',
                }}
            >
                <div className="flex flex-col items-center space-y-6 py-8 text-white font-medium">
                    <Link
                        href="/our-story"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg tracking-wide cursor-pointer"
                    >
                        OUR STORY
                    </Link>
                    <Link
                        href="/catalog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg tracking-wide cursor-pointer"
                    >
                        CATALOG
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
        </>
    );
}
