"use client";
import { useRef } from "react";
import Navbar from "../components/common/Navbar";
import CatalogueHero from "../components/catalogue/CatalogueHero";
import ProductsSection from "../components/catalogue/ProductsSection";
import Footer from "../components/common/Footer";

export default function Catalogue() {
    const navRef = useRef<HTMLElement>(null);
    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full bg-black">
                <CatalogueHero />
                <ProductsSection />
            </main>
            <Footer />
        </>
    );
}
