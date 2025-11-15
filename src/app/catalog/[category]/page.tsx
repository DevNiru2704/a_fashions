"use client";
import { useRef, use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import BlurFadeText from "../../components/animations/BlurFadeText";
import { PRODUCT_MODELS, CATEGORY_NAMES, type ProductModel } from "../../../data/catalogProducts";

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export default function CategoryPage({ params }: PageProps) {
    const navRef = useRef<HTMLElement>(null);
    const { category } = use(params);
    const [visibleCount, setVisibleCount] = useState(6);
    const [hoveredModel, setHoveredModel] = useState<string | null>(null);

    const categoryModels = PRODUCT_MODELS.filter((model) => model.category === category);

    if (categoryModels.length === 0) {
        notFound();
    }

    const visibleModels = categoryModels.slice(0, visibleCount);
    const hasMore = visibleCount < categoryModels.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full bg-black min-h-screen">
                {/* Header */}
                <div className="px-6 md:px-12 lg:px-16 pt-32 pb-12">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Catalog
                    </Link>

                    <p className="text-sm text-gray-400 tracking-widest mb-4">LEATHER</p>
                    <BlurFadeText
                        text={CATEGORY_NAMES[category] || category.toUpperCase()}
                        className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-white"
                        delayBetweenWords={10}
                    />
                </div>

                {/* Product Grid */}
                <div className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {visibleModels.map((model) => (
                            <Link
                                key={model.id}
                                href={`/catalog/${category}/${model.id}`}
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredModel(model.id)}
                                onMouseLeave={() => setHoveredModel(null)}
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 mb-4">
                                    {/* Default Image */}
                                    <Image
                                        src={model.image}
                                        alt={model.name}
                                        fill
                                        className={`object-cover transition-opacity duration-700 ease-out ${hoveredModel === model.id ? "opacity-0" : "opacity-100"
                                            }`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {/* Hover Image */}
                                    <Image
                                        src={model.hoverImage}
                                        alt={`${model.name} - hover`}
                                        fill
                                        className={`object-cover transition-opacity duration-700 ease-out ${hoveredModel === model.id ? "opacity-100" : "opacity-0"
                                            }`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {/* View Badge - Bottom Right */}
                                    <div
                                        className={`absolute bottom-6 right-6 transition-all duration-500 ease-out ${hoveredModel === model.id
                                            ? "scale-100 opacity-100"
                                            : "scale-0 opacity-0"
                                            }`}
                                    >
                                        <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center">
                                            <span className="text-white text-base font-medium tracking-wider">
                                                View
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-medium tracking-widest text-white">
                                    {model.name}
                                </h3>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="flex justify-center mt-16">
                            <button
                                onClick={handleLoadMore}
                                className="px-8 py-3 bg-white text-black font-medium tracking-wider hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                            >
                                LOAD MORE
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
