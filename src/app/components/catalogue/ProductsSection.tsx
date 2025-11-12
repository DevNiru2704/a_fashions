"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    hoverImage: string;
}

const products: Product[] = [
    {
        id: "womens-bag",
        title: "WOMEN'S BAG",
        subtitle: "LEATHER",
        image: "/assets/images/catalog_face_cards/women_s_bag_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/women_s_bag_secondary_catalog.webp"
    },
    {
        id: "mens-bag",
        title: "MEN'S BAG",
        subtitle: "PRODUCT",
        image: "/assets/images/catalog_face_cards/men_s_bag_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/men_s_bag_secondary_catalog.webp"
    },
    {
        id: "mens-wallet",
        title: "MEN'S WALLET",
        subtitle: "LEATHER",
        image: "/assets/images/catalog_face_cards/men_s_wallet_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/men_s_wallter_secondary_catalog.webp"
    },
    {
        id: "womens-wallet",
        title: "WOMEN'S WALLET",
        subtitle: "LEATHER",
        image: "/assets/images/catalog_face_cards/women_s_wallet_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/women_s_wallet_secondary_catalog.webp"
    },
    {
        id: "belt",
        title: "BELT",
        subtitle: "VISUAL STORYTELLING",
        image: "/assets/images/catalog_face_cards/belt_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/belt_secondary_catalog.webp"
    },
    {
        id: "other-hard-goods",
        title: "OTHER HARD GOODS",
        subtitle: "COLLECTION",
        image: "/assets/images/catalog_face_cards/other_hard_goods_catalog.webp",
        hoverImage: "/assets/images/catalog_face_cards/other_hard_goods_secondary_catalog.webp"
    }
];

export default function ProductsSection() {
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    return (
        <section className="w-full bg-black text-white pt-8 pb-20 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1400px] mx-auto space-y-16">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/catalog/${product.id}`}
                        className="relative group bg-black cursor-pointer block"
                        data-cursor-hover="card"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {/* Image container */}
                        <div className="relative w-full aspect-[18/9] overflow-hidden rounded-lg">
                            {/* Default Image */}
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className={`object-cover transition-all duration-700 ease-out ${hoveredProduct === product.id
                                    ? "opacity-0 scale-110 rotate-3"
                                    : "opacity-100 scale-100 rotate-0"
                                    }`}
                                sizes="100vw"
                            />

                            {/* Hover Image */}
                            <Image
                                src={product.hoverImage}
                                alt={`${product.title} - hover`}
                                fill
                                className={`object-cover transition-all duration-700 ease-out ${hoveredProduct === product.id
                                    ? "opacity-100 scale-110 rotate-3"
                                    : "opacity-0 scale-100 rotate-0"
                                    }`}
                                sizes="100vw"
                            />
                        </div>

                        {/* Product info */}
                        <div className="mt-6 pb-4">
                            <h3 className="text-lg font-medium tracking-widest mb-1">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-400 tracking-wider">
                                {product.subtitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
