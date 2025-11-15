"use client";
import { useRef, use } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import ProductDetail from "../../../components/catalogue/ProductDetail";
import { getProductBySlug, PRODUCT_MODELS } from "../../../../data/catalogProducts";

interface PageProps {
    params: Promise<{
        category: string;
        productId: string;
    }>;
}

export default function ProductPage({ params }: PageProps) {
    const navRef = useRef<HTMLElement>(null);
    const { category, productId } = use(params);
    const product = getProductBySlug(productId);

    if (!product) {
        notFound();
    }

    // Get products in the same category
    const categoryProducts = PRODUCT_MODELS.filter(m => m.category === category);
    const currentIndex = categoryProducts.findIndex(m => m.id === productId);

    // Find previous and next products within the same category
    const previousProduct = currentIndex > 0 ? (() => {
        const prevModel = categoryProducts[currentIndex - 1];
        return {
            slug: prevModel.id,
            title: prevModel.name,
            image: prevModel.image
        };
    })() : undefined;

    const nextProduct = currentIndex < categoryProducts.length - 1 ? (() => {
        const nextModel = categoryProducts[currentIndex + 1];
        return {
            slug: nextModel.id,
            title: nextModel.name,
            image: nextModel.image
        };
    })() : undefined;

    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full bg-black">
                <ProductDetail
                    product={product}
                    categorySlug={category}
                    previousProduct={previousProduct}
                    nextProduct={nextProduct}
                />
            </main>
            <Footer />
        </>
    );
}
