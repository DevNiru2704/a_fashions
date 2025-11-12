"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurFadeText from "../animations/BlurFadeText";
import MorphButton from "../animations/MorphButton";

interface Product {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    fullDescription: string;
    features: string[];
    specifications: {
        material: string;
        lining: string;
        hardware: string;
        dimensions: string;
        weight: string;
    };
    images: {
        thumbnail: string;
        hover: string;
        gallery: string[];
    };
}

interface RelatedProduct {
    slug: string;
    title: string;
    image: string;
}

interface ProductDetailProps {
    product: Product;
    categorySlug?: string;
    previousProduct?: RelatedProduct;
    nextProduct?: RelatedProduct;
}

export default function ProductDetail({ product, categorySlug, previousProduct, nextProduct }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const backLink = categorySlug ? `/catalog/${categorySlug}` : "/catalog";

    return (
        <div className="min-h-screen w-full bg-black text-white">
            {/* Back Button */}
            <div className="px-6 md:px-12 lg:px-16 pt-32 pb-8">
                <Link
                    href={backLink}
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
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
            </div>

            {/* Product Content */}
            <div className="px-6 md:px-12 lg:px-16 pb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Product Header */}
                    <div className="mb-12">
                        <p className="text-sm text-gray-400 tracking-widest mb-4">
                            {product.category}
                        </p>
                        <BlurFadeText
                            text={product.title}
                            className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4"
                            delayBetweenWords={10}
                        />
                        <p className="text-xl text-gray-300 tracking-wide">
                            {product.subtitle}
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            {/* Main Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                                <Image
                                    src={product.images.gallery[selectedImage]}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images.gallery.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${selectedImage === index
                                                ? "ring-2 ring-white"
                                                : "opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.title} - ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="25vw"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 tracking-wide">
                                    About This Product
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    {product.description}
                                </p>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {product.fullDescription}
                                </p>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 tracking-wide">
                                    Features
                                </h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start text-gray-300"
                                        >
                                            <span className="text-white mr-3">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 tracking-wide">
                                    Specifications
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(product.specifications).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between border-b border-gray-800 pb-2"
                                            >
                                                <span className="text-gray-400 capitalize">
                                                    {key}
                                                </span>
                                                <span className="text-white">{value}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* CTA Button - use same simple style as Lets Connect submit button, full width of text column, no hover animations */}
                            <div className="pt-6 w-full">
                                <Link
                                    href={`/lets-connect?product=${encodeURIComponent(product.title)}`}
                                    className="block bg-white text-black px-6 py-3 rounded font-medium w-full text-center"
                                >
                                    INQUIRE NOW
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Browse More Section */}
                    {(previousProduct || nextProduct) && (
                        <div className="mt-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-wide">
                                Browse More
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {previousProduct && (
                                    <Link
                                        href={`/catalog/${categorySlug}/${previousProduct.slug}`}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 mb-4">
                                            <Image
                                                src={previousProduct.image}
                                                alt={previousProduct.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <h3 className="text-xl font-medium text-white mb-1">
                                            {previousProduct.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">Previous</p>
                                    </Link>
                                )}
                                {nextProduct && (
                                    <Link
                                        href={`/catalog/${categorySlug}/${nextProduct.slug}`}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 mb-4">
                                            <Image
                                                src={nextProduct.image}
                                                alt={nextProduct.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <h3 className="text-xl font-medium text-white mb-1">
                                            {nextProduct.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">Next</p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
