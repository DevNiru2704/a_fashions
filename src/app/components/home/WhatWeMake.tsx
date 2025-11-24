"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFadeText from "../animations/BlurFadeText";
import SlideIn from "../animations/SlideIn";
import ExploreButton from "../common/ExploreButton";

interface ProductItem {
    id: number;
    title: string;
    badge: string;
    description: string;
    image: string;
    imagePosition?: "left" | "right";
    category: string; // catalog route slug
}

interface ProductRow {
    type: "full" | "grid";  // full = full width, grid = side by side
    columns?: number;  // number of items per row (for grid type)
    items: ProductItem[];
}

// CMS-ready data structure
// This can be easily replaced with API data from your CMS
const PRODUCT_ROWS: ProductRow[] = [
    {
        type: "full",
        items: [
            {
                id: 1,
                title: "WOMEN'S BAG",
                badge: "Immerse yourself in sound",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/women_s_bag_web.webp",
                imagePosition: "left",
                category: "womens-bag"
            }
        ]
    },
    {
        type: "grid",
        columns: 2,
        items: [
            {
                id: 2,
                title: "MEN'S WALLET",
                badge: "Immerse yourself in sound",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/men_s_wallet.webp",
                category: "mens-wallet"
            },
            {
                id: 3,
                title: "WOMEN'S WALLET",
                badge: "Hear every detail",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/women_s_wallet_web.webp",
                category: "womens-wallet"
            }
        ]
    },
    {
        type: "full",
        items: [
            {
                id: 4,
                title: "MEN'S BAG",
                badge: "Hear every detail",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/men_s_bag_web.webp",
                imagePosition: "right",
                category: "mens-bag"
            }
        ]
    },
    {
        type: "grid",
        columns: 2,
        items: [
            {
                id: 5,
                title: "BELTS",
                badge: "Hear every detail",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/belt_web.webp",
                category: "belt"
            },
            {
                id: 6,
                title: "HARD GOODS",
                badge: "Immerse yourself in sound",
                description: "This is a mock product description intended for layout and styling purposes only. The real product description will be displayed here once finalized. It will include key features, material details, usage context, and brand tone crafted to evoke narrative impact and editorial clarity.",
                image: "/assets/images/home_page_category/hardgoods_web.webp",
                category: "other-hard-goods"
            }
        ]
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

                const isMobile = windowWidth < 768;
                const parallaxStartPoint = isMobile ? windowHeight * 2.2 : windowHeight * 2.2;

                if (scrollPosition >= parallaxStartPoint) {
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

                {/* Products Grid - CMS Ready */}
                <div className="space-y-32">
                    {PRODUCT_ROWS.map((row, rowIndex) => {
                        // Calculate global item index for zigzag pattern
                        let globalIndex = 0;
                        for (let i = 0; i < rowIndex; i++) {
                            globalIndex += PRODUCT_ROWS[i].items.length;
                        }

                        return (
                            <div key={rowIndex}>
                                {row.type === "full" ? (
                                    /* Full Width Layout */
                                    row.items.map((product, itemIndex) => {
                                        const currentGlobalIndex = globalIndex + itemIndex;
                                        return (
                                            <div
                                                key={product.id}
                                                className={`flex flex-col ${product.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-16 items-center`}
                                            >
                                                <SlideIn
                                                    direction={product.imagePosition === "right" ? "right" : "left"}
                                                    className="w-full md:w-1/2"
                                                >
                                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.title}
                                                            fill
                                                            priority={currentGlobalIndex === 0}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </SlideIn>

                                                <SlideIn
                                                    direction={product.imagePosition === "right" ? "left" : "right"}
                                                    delay={100}
                                                    className="w-full md:w-1/2"
                                                >
                                                    <div className="space-y-6">
                                                        <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal">
                                                            {product.title}
                                                        </h2>

                                                        <p className="font-archivo-regular text-black text-base md:text-xl leading-relaxed">
                                                            {product.description}
                                                        </p>

                                                        <ExploreButton category={product.category} />
                                                    </div>
                                                </SlideIn>
                                            </div>
                                        );
                                    })
                                ) : (
                                    /* Grid Layout - Zigzag on mobile/tablet, Grid on desktop */
                                    <div className="space-y-32 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16">
                                        {row.items.map((product, itemIndex) => {
                                            // Calculate global position for continuous zigzag
                                            const currentGlobalIndex = globalIndex + itemIndex;
                                            const isEven = currentGlobalIndex % 2 === 0;
                                            return (
                                                <div
                                                    key={product.id}
                                                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} lg:flex-row gap-6 md:gap-12 lg:gap-6 items-center`}
                                                >
                                                    <SlideIn
                                                        direction={isEven ? "left" : "right"}
                                                        className={`w-full md:w-1/2 lg:w-2/5 lg:order-2`}
                                                    >
                                                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                fill
                                                                loading="lazy"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </SlideIn>

                                                    <SlideIn
                                                        direction={isEven ? "right" : "left"}
                                                        delay={100}
                                                        className={`w-full md:w-1/2 lg:w-3/5 lg:order-1`}
                                                    >
                                                        <div className="space-y-4">
                                                            <h2 className="text-black text-3xl md:text-4xl lg:text-3xl font-bold tracking-normal">
                                                                {product.title}
                                                            </h2>

                                                            <p className="font-archivo-regular text-black text-sm md:text-xl leading-relaxed">
                                                                {product.description}
                                                            </p>

                                                            <ExploreButton category={product.category} />
                                                        </div>
                                                    </SlideIn>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
