'use client';
import { useEffect, useState } from 'react';

export default function VideoCurtain() {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
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

            // Hide scroll indicator immediately on any scroll
            if (scrollY > 0 && showScrollIndicator) {
                setHideScrollIndicator(true);
                setTimeout(() => setShowScrollIndicator(false), 400);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showScrollIndicator]);

    return (
        <section className="relative h-screen w-full z-20">
            <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-0">
                <div className="flex flex-col md:flex-row h-full w-full">
                    <video
                        id="left-video"
                        className="h-1/2 md:h-full md:w-1/2 object-cover will-change-transform transition-transform duration-200 ease-out grayscale"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster="https://ik.imagekit.io/zqjkk9ui6/images/left_video_poster.jpg"
                    >
                        <source src="https://ik.imagekit.io/zqjkk9ui6/videos/left_video.mp4" type="video/mp4" />
                    </video>

                    <video
                        id="right-video"
                        className="h-1/2 md:h-full md:w-1/2 object-cover will-change-transform transition-transform duration-200 ease-out grayscale"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster="https://ik.imagekit.io/zqjkk9ui6/images/right_video_poster.jpg"
                    >
                        <source src="https://ik.imagekit.io/zqjkk9ui6/videos/right_video.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Scroll Indicator - Mouse Icon */}
            {showScrollIndicator && (
                <div
                    className={`fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-400 ease-out ${hideScrollIndicator
                        ? 'opacity-0 -translate-y-20 scale-0'
                        : 'opacity-100 translate-y-0 scale-100'
                        }`}
                >
                    <div className="flex flex-col items-center gap-3">
                        {/* Mouse Icon - Solid White with Down Arrow */}
                        <div className="relative w-9 h-12 bg-[#E8E8E8] rounded-full animate-bounce flex items-center justify-center">
                            <svg
                                className="w-6 h-7 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M12 5v14m0 0l-5-5m5 5l5-5"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            {/* Spacer to create scroll height for video section */}
            <div className="lg:h-[50vh] hidden"></div>
        </section>
    );
}