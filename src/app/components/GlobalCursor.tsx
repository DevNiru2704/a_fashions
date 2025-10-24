"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function GlobalCursor() {
    const [hoveringNav, setHoveringNav] = useState(false);
    const [hoveringCard, setHoveringCard] = useState(false);
    const [scale, setScale] = useState(1);
    const [isClicking, setIsClicking] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);
    const cursorRef = useRef<HTMLDivElement>(null);
    const hoveringRef = useRef(false);
    const hoveringCardRef = useRef(false);
    const pathname = usePathname();

    // Track if we're on the homepage to determine cursor section
    useEffect(() => {
        setIsHomePage(pathname === '/');
    }, [pathname]);

    // --- Update hoveringRef whenever hoveringNav changes ---
    useEffect(() => {
        hoveringRef.current = hoveringNav;
    }, [hoveringNav]);

    // --- Update hoveringCardRef whenever hoveringCard changes ---
    useEffect(() => {
        hoveringCardRef.current = hoveringCard;
    }, [hoveringCard]);

    // --- Smooth following using requestAnimationFrame ---
    useEffect(() => {
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Initialize to center
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let isInitialized = false;

        const handleMove = (e: MouseEvent) => {
            if (!isInitialized) {
                // On first mouse move, snap to mouse position
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                pos.x = e.clientX;
                pos.y = e.clientY;
                isInitialized = true;
            } else {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }

            // Check if mouse is within navbar bounds
            const navElements = document.querySelectorAll('nav');
            let isOverNav = false;

            navElements.forEach((nav) => {
                const rect = nav.getBoundingClientRect();
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    isOverNav = true;
                }
            });

            if (isOverNav !== hoveringRef.current) {
                setHoveringNav(isOverNav);
                hoveringRef.current = isOverNav;
            }

            // Check if mouse is within KeyFigures card bounds
            const cardElements = document.querySelectorAll('[data-cursor-hover="card"]');
            let isOverCard = false;

            cardElements.forEach((card) => {
                const rect = card.getBoundingClientRect();
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    isOverCard = true;
                }
            });

            if (isOverCard !== hoveringCardRef.current) {
                setHoveringCard(isOverCard);
                hoveringCardRef.current = isOverCard;
            }
        };

        const handleScroll = () => {
            // Only handle scroll-based cursor changes on homepage
            if (!isHomePage) return;
        };

        const handleMouseDown = () => {
            setIsClicking(true);
        };

        const handleMouseUp = () => {
            setIsClicking(false);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        const follow = () => {
            const delayFactor = 0.08; // Lower = smoother delay
            pos.x += (mouse.x - pos.x) * delayFactor;
            pos.y += (mouse.y - pos.y) * delayFactor;

            const el = cursorRef.current;
            if (el) {
                // On homepage, check section based on scroll
                let cursorSection: 'hero' | 'logo' | 'animated' = 'hero';
                if (isHomePage) {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;

                    if (scrollY < windowHeight) {
                        cursorSection = 'hero';
                    } else if (scrollY >= windowHeight && scrollY < windowHeight * 2) {
                        cursorSection = 'logo';
                    } else {
                        cursorSection = 'animated';
                    }
                }

                // Show HELLO only in hero/logo sections on homepage, and when not hovering nav or card
                const showHello = isHomePage && cursorSection !== 'animated' && !hoveringRef.current && !hoveringCardRef.current;
                const helloOffset = { x: 20, y: 10 };
                const ballOffset = { x: 0, y: 0 };
                const { x: offsetX, y: offsetY } = showHello ? helloOffset : ballOffset;

                el.style.left = `${pos.x + offsetX}px`;
                el.style.top = `${pos.y + offsetY}px`;
            }

            requestAnimationFrame(follow);
        };

        follow();

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isHomePage]);

    // Determine cursor section based on scroll (only on homepage)
    const [cursorSection, setCursorSection] = useState<'hero' | 'logo' | 'animated'>('hero');

    useEffect(() => {
        if (!isHomePage) {
            setCursorSection('animated'); // Default to ball on other pages
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY < windowHeight) {
                setCursorSection('hero');
            } else if (scrollY >= windowHeight && scrollY < windowHeight * 2) {
                setCursorSection('logo');
            } else {
                setCursorSection('animated');
            }
        };

        handleScroll(); // Initial check
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHomePage]);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-[100] mix-blend-difference hidden min-[811px]:block"
            style={{
                transform: `translate(-50%, -50%) scale(${scale})`,
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
        >
            <div
                className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center ${hoveringCard
                    ? "w-12 h-12 rounded-full bg-white"
                    : hoveringNav || cursorSection === 'animated'
                        ? "w-3 h-3 rounded-full bg-white"
                        : "px-3 py-1 rounded-md text-xs font-medium text-white bg-transparent border border-white"
                    }`}
                style={{
                    transform: hoveringCard
                        ? `translate(0px, 0px) scale(${isClicking ? 0.8 : 1})`
                        : (hoveringNav || cursorSection === 'animated')
                            ? `translate(0px, 0px) scale(${isClicking ? 0.5 : 1})`
                            : "translate(40px, 40px) scale(1.6)",
                    transformOrigin: "center",
                    transition:
                        "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), all 0.3s ease-in-out",
                }}
            >
                {hoveringCard ? (
                    <Image
                        src="/assets/images/eye.svg"
                        alt="Eye"
                        width={40}
                        height={32}
                        className="w-10 h-8"
                    />
                ) : !hoveringNav && cursorSection !== 'animated' ? "HELLO" : null}
            </div>
        </div>
    );
}
