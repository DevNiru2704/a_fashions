"use client";
import { useRef, use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import BlurFadeText from "../../components/animations/BlurFadeText";

interface ProductModel {
    id: string;
    name: string;
    category: string;
    image: string;
    hoverImage: string;
}

const PRODUCT_MODELS: ProductModel[] = [
    // Women's Bag Models
    { id: "af-01", name: "AF-01", category: "womens-bag", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80" },
    { id: "af-02", name: "AF-02", category: "womens-bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },
    { id: "demiverde", name: "DermaVerde", category: "womens-bag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80" },
    { id: "af-03", name: "AF-03", category: "womens-bag", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
    { id: "af-04", name: "AF-04", category: "womens-bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80" },
    { id: "af-05", name: "AF-05", category: "womens-bag", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },
    { id: "af-06", name: "AF-06", category: "womens-bag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
    { id: "af-07", name: "AF-07", category: "womens-bag", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80" },

    // Men's Bag Models
    { id: "mb-01", name: "MB-01", category: "mens-bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=1200&q=80" },
    { id: "mb-02", name: "MB-02", category: "mens-bag", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { id: "mb-03", name: "MB-03", category: "mens-bag", image: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80" },
    { id: "mb-04", name: "MB-04", category: "mens-bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80" },
    { id: "mb-05", name: "MB-05", category: "mens-bag", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { id: "mb-06", name: "MB-06", category: "mens-bag", image: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80" },
    { id: "mb-07", name: "MB-07", category: "mens-bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80" },

    // Wallet Models
    { id: "wl-01", name: "WL-01", category: "wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },
    { id: "wl-02", name: "WL-02", category: "wallet", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
    { id: "wl-03", name: "WL-03", category: "wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },
    { id: "wl-04", name: "WL-04", category: "wallet", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
    { id: "wl-05", name: "WL-05", category: "wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },
    { id: "wl-06", name: "WL-06", category: "wallet", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
    { id: "wl-07", name: "WL-07", category: "wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80" },

    // Belt Models
    { id: "bl-01", name: "BL-01", category: "belt", image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=1200&q=80" },
    { id: "bl-02", name: "BL-02", category: "belt", image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80" },
    { id: "bl-03", name: "BL-03", category: "belt", image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80" },
    { id: "bl-04", name: "BL-04", category: "belt", image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80" },
    { id: "bl-05", name: "BL-05", category: "belt", image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80" },
    { id: "bl-06", name: "BL-06", category: "belt", image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80" },
    { id: "bl-07", name: "BL-07", category: "belt", image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&q=80" },

    // Other Hard Goods Models
    { id: "hg-01", name: "HG-01", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80" },
    { id: "hg-02", name: "HG-02", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { id: "hg-03", name: "HG-03", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
    { id: "hg-04", name: "HG-04", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { id: "hg-05", name: "HG-05", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
    { id: "hg-06", name: "HG-06", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { id: "hg-07", name: "HG-07", category: "other-hard-goods", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
];

const CATEGORY_NAMES: Record<string, string> = {
    "womens-bag": "WOMEN'S BAG",
    "mens-bag": "MEN'S BAG",
    "wallet": "WALLET",
    "belt": "BELT",
    "other-hard-goods": "OTHER HARD GOODS"
};

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
