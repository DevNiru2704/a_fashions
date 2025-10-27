"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavbarProps {
    onNavHover?: (isHovering: boolean) => void;
    navRef?: React.RefObject<HTMLElement | null>;
}

export default function Navbar({ onNavHover, navRef: externalNavRef }: NavbarProps) {
    const [scrollUp, setScrollUp] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const internalNavRef = useRef<HTMLElement>(null);
    const navRef = externalNavRef || internalNavRef;
    const lastScrollY = useRef(0);

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

    return (
        <>
            {/* Navbar */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full h-16 flex items-center justify-center backdrop-blur-md bg-white/5 text-black font-medium z-50 transition-transform duration-500 ease-in-out mix-blend-difference ${scrollUp ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                {/* Left-aligned logo */}
                <div className="absolute left-8">
                    <Link
                        href="/"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 tracking-widest text-xl cursor-pointer text-white"
                    >
                        A FASHION
                    </Link>
                </div>

                {/* Desktop menu items - hidden on mobile */}
                <div className="hidden min-[811px]:flex space-x-8">
                    <Link
                        href="/our-story"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                    >
                        Our Story
                    </Link>
                    <Link
                        href="/catalogue"
                        className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer text-white"
                    >
                        Catalogue
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
                    className="absolute right-8 min-[811px]:hidden w-8 h-6 flex flex-col justify-center items-center gap-[6px] cursor-pointer"
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

            {/* Mobile menu - slides down/up */}
            <div
                className={`fixed left-0 w-full backdrop-blur-md bg-white/5 z-40 min-[811px]:hidden transition-all duration-500 ease-in-out mix-blend-difference ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    } ${scrollUp ? "top-16" : "-top-full"}`}
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
        </>
    );
}
