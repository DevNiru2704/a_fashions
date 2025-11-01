"use client";
import { useRef } from "react";
import Navbar from "../components/common/Navbar";
import AboutAFashion from "../components/who_we_are/AboutAFashion";
import ImageGrid from "../components/who_we_are/ImageGrid";
import WhoWeAre2 from "../components/who_we_are/WhoWeAre2";
import ProcessSection from "../components/who_we_are/ProcessSection";
import EthicalPractices from "../components/who_we_are/EthicalPractices";
import YouDreamWeCreate from "../components/who_we_are/YouDreamWeCreate";
import OurStorySection from "../components/who_we_are/OurStorySection";
import LetsTalk2 from "../components/who_we_are/LetsTalk2";
import Footer from "../components/common/Footer";

export default function OurStory() {
    const navRef = useRef<HTMLElement>(null);
    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full">
                <AboutAFashion />
                <ImageGrid />
                <ProcessSection />
                <EthicalPractices />
                <YouDreamWeCreate />
                <OurStorySection />
                <LetsTalk2 />
            </main>
            <Footer />
        </>
    );
}
