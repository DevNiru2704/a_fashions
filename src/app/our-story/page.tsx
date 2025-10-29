"use client";
import { useRef } from "react";
import Navbar from "../components/common/Navbar";
import WhoWeAre2 from "../components/who_we_are/WhoWeAre2";
import ProcessSection from "../components/who_we_are/ProcessSection";
import LetsTalk2 from "../components/who_we_are/LetsTalk2";
import Footer from "../components/common/Footer";

export default function OurStory() {
    const navRef = useRef<HTMLElement>(null);
    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full">
                <WhoWeAre2 />
                <ProcessSection />
                <LetsTalk2 />
            </main>
            <Footer />
        </>
    );
}
