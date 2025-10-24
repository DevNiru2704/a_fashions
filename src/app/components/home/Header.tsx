"use client";
import { useEffect, useRef } from "react";
import Navbar from "../Navbar";
import LandingSection from "./LandingSection";

export default function Header() {
    const navRef = useRef<HTMLElement>(null);

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

    return (
        <>
            {/* Navbar */}
            <Navbar navRef={navRef} />

            <main className="relative w-full">
                {/* Curtain Container */}
                <section className="relative h-screen w-full z-20">
                    <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-0">
                        <div className="flex flex-col md:flex-row h-full w-full">
                            <video
                                id="left-video"
                                className="h-1/2 md:h-full md:w-1/2 object-cover will-change-transform transition-transform duration-200 ease-out"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                poster="/assets/images/video-poster-left.jpg"
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
                                preload="metadata"
                                poster="/assets/images/video-poster-right.jpg"
                            >
                                <source src="/assets/videos/right_video.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </section>

                {/* Spacer to create scroll height for video section */}
                <div className="lg:h-[50vh] hidden"></div>

                {/* Landing Section */}
                <LandingSection />
            </main>
        </>
    );
}
