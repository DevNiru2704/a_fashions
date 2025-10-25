"use client";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | undefined>(undefined);
    const targetScrollY = useRef(0);
    const currentScrollY = useRef(0);

    useEffect(() => {
        // Detect if device has touch capability
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Only enable smooth scroll on non-touch devices (desktop)
        if (isTouchDevice) {
            return; // Exit early, use native scroll on mobile
        }

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScrollY.current += e.deltaY;
            targetScrollY.current = Math.max(
                0,
                Math.min(targetScrollY.current, document.body.scrollHeight - window.innerHeight)
            );
        };

        const smoothScroll = () => {
            // Lerp (linear interpolation) for smooth easing
            const ease = 0.08; // Lower = smoother but slower (0.05-0.15 recommended)
            currentScrollY.current += (targetScrollY.current - currentScrollY.current) * ease;

            // Apply the scroll
            window.scrollTo(0, currentScrollY.current);

            // Continue animation
            rafRef.current = requestAnimationFrame(smoothScroll);
        };

        // Initialize
        targetScrollY.current = window.scrollY;
        currentScrollY.current = window.scrollY;

        // Start smooth scroll loop
        smoothScroll();

        // Add wheel listener with passive: false to allow preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return <>{children}</>;
}
