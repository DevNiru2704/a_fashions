"use client";
import { useEffect, useRef, useState } from "react";
import BlurFadeText from "../animations/BlurFadeText";
import SlideIn from "../animations/SlideIn";
import ExploreButton from "../common/ExploreButton";

interface Product {
    id: number;
    title: string;
    badge: string;
    description: string;
    image: string;
    imagePosition: "left" | "right";
}

const products: Product[] = [
    {
        id: 1,
        title: "WOMEN'S BAG",
        badge: "Immerse yourself in sound",
        description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        imagePosition: "left"
    },
    {
        id: 2,
        title: "MEN'S BAG",
        badge: "Hear every detail",
        description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        imagePosition: "right"
    },
    {
        id: 3,
        title: "WALLETS",
        badge: "Immerse yourself in sound",
        description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        imagePosition: "left"
    }
];

const lastRowProducts = [
    {
        id: 4,
        title: "BELTS",
        badge: "Hear every detail",
        description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
        image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=958"
    },
    {
        id: 5,
        title: "HARD GOODS",
        badge: "Immerse yourself in sound",
        description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    }
];

export default function WhatWeMake() {
    const [translateY, setTranslateY] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                if (!sectionRef.current) return;

                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const scrollPosition = window.scrollY;

                // Mobile: stronger parallax and starts earlier
                const isMobile = windowWidth < 768;
                const parallaxStartPoint = isMobile
                    ? windowHeight * 2.2  // Starts much earlier on mobile (after 1.2 sections)
                    : windowHeight * 2.2; // Desktop starts later

                if (scrollPosition >= parallaxStartPoint) {
                    // Mobile: stronger effect, Desktop: current effect
                    const parallaxSpeed = isMobile ? 1.5 : 1.5;
                    const offset = (scrollPosition - parallaxStartPoint) * (parallaxSpeed - 1);
                    setTranslateY(-offset);
                } else {
                    setTranslateY(0);
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div className="relative" style={{ marginTop: `${translateY}px` }}>
            <section
                ref={sectionRef}
                className="relative w-full z-20 py-20 px-8 md:px-12 lg:px-16 bg-[#E8E8E8]"
            >
                {/* Header */}
                <div className="mb-20">
                    <BlurFadeText
                        text="WHAT WE MAKE"
                        className="text-black text-5xl md:text-6xl lg:text-7xl tracking-tight"
                        delayBetweenWords={10}
                        threshold={0.3}
                    />
                </div>

                {/* Products Grid */}
                <div className="space-y-32">
                    {/* First 3 products - full width alternating layout */}
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`flex flex-col ${product.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-16 items-center`}
                        >
                            {/* Image */}
                            <SlideIn
                                direction={product.imagePosition === "right" ? "right" : "left"}
                                className="w-full md:w-1/2"
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </SlideIn>

                            {/* Content */}
                            <SlideIn
                                direction={product.imagePosition === "right" ? "left" : "right"}
                                delay={100}
                                className="w-full md:w-1/2"
                            >
                                <div className="space-y-6">
                                    <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full">
                                        {product.badge}
                                    </span>

                                    <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                        {product.title}
                                    </h2>

                                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                        {product.description}
                                    </p>

                                    <ExploreButton />
                                </div>
                            </SlideIn>
                        </div>
                    ))}

                    {/* Last row - Belts and Hard Goods side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {/* Belts - Image above text on mobile, Text Left Image Right on desktop */}
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Image - appears first on mobile */}
                            <SlideIn direction="right" delay={100} className="w-full md:w-2/5 md:order-2">
                                <div className="relative aspect-square rounded-3xl overflow-hidden bg-white">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={lastRowProducts[0].image}
                                        alt={lastRowProducts[0].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </SlideIn>
                            {/* Text - appears second on mobile */}
                            <SlideIn direction="left" className="w-full md:w-3/5 md:order-1">
                                <div className="space-y-4">
                                    <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full">
                                        {lastRowProducts[0].badge}
                                    </span>

                                    <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">
                                        {lastRowProducts[0].title}
                                    </h2>

                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {lastRowProducts[0].description}
                                    </p>

                                    <ExploreButton />
                                </div>
                            </SlideIn>
                        </div>

                        {/* Hard Goods - Image above text on mobile, Image Left Text Right on desktop */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            {/* Image - appears first on mobile */}
                            <SlideIn direction="left" delay={100} className="w-full md:w-2/5 md:order-1">
                                <div className="relative aspect-square rounded-3xl overflow-hidden bg-white">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={lastRowProducts[1].image}
                                        alt={lastRowProducts[1].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </SlideIn>

                            {/* Text - appears second on mobile */}
                            <SlideIn direction="right" className="w-full md:w-3/5 md:order-2">
                                <div className="space-y-4">
                                    <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full">
                                        {lastRowProducts[1].badge}
                                    </span>

                                    <h2 className="text-black text-3xl md:text-4xl font-bold tracking-tight">
                                        {lastRowProducts[1].title}
                                    </h2>

                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {lastRowProducts[1].description}
                                    </p>

                                    <ExploreButton />
                                </div>
                            </SlideIn>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
