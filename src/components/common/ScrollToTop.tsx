"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force instant scroll to top on mount and route change
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    // Also reset scroll position on initial load
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    return null;
}
