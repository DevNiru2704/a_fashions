"use client";
import { useState } from "react";
import Image from "next/image";

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
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80"
    },
    {
        id: "mens-bag",
        title: "MEN'S BAG",
        subtitle: "PRODUCT",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1761275389856-3c4f7d61b623?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
        id: "wallet",
        title: "WALLET",
        subtitle: "LEATHER",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1614330316567-11d8e572db16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
    },
    {
        id: "belt",
        title: "BELT",
        subtitle: "VISUAL STORYTELLING",
        image: "https://images.unsplash.com/photo-1664285612706-b32633c95820?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=958",
        hoverImage: "https://images.unsplash.com/photo-1585856331452-87ea5a04c21c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    },
    {
        id: "other-hard-goods",
        title: "OTHER HARD GOODS",
        subtitle: "COLLECTION",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        hoverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"
    }
];

export default function ProductsSection() {
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    return (
        <section className="w-full bg-black text-white pt-8 pb-20 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1400px] mx-auto space-y-16">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative group bg-black cursor-pointer"
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
                    </div>
                ))}
            </div>
        </section>
    );
}
