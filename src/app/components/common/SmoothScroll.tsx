"use client";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const rafRef = useRef<number | undefined>(undefined);
    const targetScrollY = useRef(0);
    const currentScrollY = useRef(0);

    useEffect(() => {
        // Detect if device has touch capability or is mobile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth < 768;

        // Only enable smooth scroll on non-touch desktop devices
        if (isTouchDevice || isMobile) {
            return; // Exit early, use native scroll
        }

        let maxScroll = 0;

        const updateMaxScroll = () => {
            maxScroll = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            ) - window.innerHeight;
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Update max scroll on each wheel event to handle dynamic content
            updateMaxScroll();

            targetScrollY.current += e.deltaY;
            targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll));
        };

        const smoothScroll = () => {
            // Lerp (linear interpolation) for smooth easing
            const ease = 0.1; // Slightly faster response
            const delta = targetScrollY.current - currentScrollY.current;

            // Only update if there's a meaningful difference (reduces jitter)
            if (Math.abs(delta) > 0.1) {
                currentScrollY.current += delta * ease;
                window.scrollTo(0, currentScrollY.current);
            }

            // Continue animation
            rafRef.current = requestAnimationFrame(smoothScroll);
        };

        // Initialize
        updateMaxScroll();
        targetScrollY.current = window.scrollY;
        currentScrollY.current = window.scrollY;

        // Start smooth scroll loop
        smoothScroll();

        // Add wheel listener with passive: false to allow preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });

        // Update max scroll on resize
        window.addEventListener("resize", updateMaxScroll);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("resize", updateMaxScroll);
        };
    }, []);

    return <>{children}</>;
}
