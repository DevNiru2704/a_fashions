"use client";
import { useEffect } from "react";

export default function ContentProtection({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Prevent right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Prevent drag start
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
        };

        // Prevent keyboard shortcuts for saving/copying
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Ctrl+S (Save), Ctrl+U (View Source), Ctrl+Shift+I (DevTools)
            if (
                (e.ctrlKey && e.key === 's') ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                e.key === 'F12'
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return <>{children}</>;
}
