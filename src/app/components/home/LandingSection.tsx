"use client";
import WhatWeMake from "./WhatWeMake";
import BlurFadeText from "../animations/BlurFadeText";

export default function LandingSection() {

    return (
        <>
            {/* First Section - Logo and Tagline */}
            <section className="relative h-[100vh] z-10 w-full flex flex-col items-center justify-center bg-[#E8E8E8]">
                <div className="flex flex-col items-center justify-center gap-12">
                    {/* Logo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/images/afashions_logo.svg"
                        alt="A Fashions Logo"
                        className="w-[80vw] h-auto"
                    />

                    {/* Tagline */}
                    <p className="text-black text-sm md:text-base lg:text-xl font-light text-center px-4">
                        DESIGNING AND MANUFACTURING FINEST LEATHER GOODS
                    </p>
                </div>
            </section>

            {/* Second Section - Animated Text */}
            <section
                className="relative h-[100vh] w-full flex items-center justify-start px-8 md:px-12 lg:px-16 z-10 bg-[#E8E8E8]"
            >
                {/* Desktop Layout - Hidden on mobile/tablet */}
                <div className="hidden lg:block w-full">
                    <BlurFadeText
                        text="DESIGNED WITH ORIGINALITY AND PURPOSE"
                        className="text-[12vw] leading-none font-bold text-black tracking-wide"
                        delayBetweenWords={100}
                        threshold={0.5}
                    />
                </div>

                {/* Mobile/Tablet Layout - Hidden on desktop */}
                <div className="block lg:hidden w-full">
                    <BlurFadeText
                        text="DESIGNED WITH ORIGINALITY AND PURPOSE"
                        className="text-[10vw] md:text-[9vw] leading-none font-bold text-black tracking-wide"
                        delayBetweenWords={500}
                        threshold={0.5}
                    />
                </div>
            </section>

            {/* Third Section - What We Make */}
            <WhatWeMake />
        </>
    );
}
