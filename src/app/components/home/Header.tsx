"use client";
import { useEffect } from "react";

export default function Header() {
    useEffect(() => {
        const leftVideo = document.getElementById("left-video") as HTMLVideoElement;
        const rightVideo = document.getElementById("right-video") as HTMLVideoElement;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Clamp between 0 and 1
            const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);

            // Move the videos outward as user scrolls
            leftVideo.style.transform = `translateX(-${progress * 100}%)`;
            rightVideo.style.transform = `translateX(${progress * 100}%)`;

            // Optional fade-out
            leftVideo.style.opacity = `${1 - progress}`;
            rightVideo.style.opacity = `${1 - progress}`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="relative min-h-[200vh] w-screen">
            {/* Fixed Curtain Videos */}
            <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden">
                <video
                    id="left-video"
                    className="absolute top-0 left-0 h-full w-1/2 object-cover will-change-transform"
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
                    className="absolute top-0 right-0 h-full w-1/2 object-cover will-change-transform"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/assets/videos/right_video.mp4" type="video/mp4" />
                </video>
            </section>

            {/* Revealed Section */}
            <section className="absolute -z-10 top-[100vh] left-0 h-[100vh] w-full bg-black text-white flex items-center justify-center">
                <h1 className="text-5xl font-bold">Revealed Section</h1>
            </section>
        </main>
    );
}
