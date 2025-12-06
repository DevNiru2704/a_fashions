"use client";
import { useRef } from "react";
import Navbar from "../../components/common/Navbar";
import AboutAFashion from "../../components/who_we_are/AboutAFashion";
import ImageGrid from "../../components/who_we_are/ImageGrid";
import ProcessSection from "../../components/who_we_are/ProcessSection";
import OurStorySection from "../../components/who_we_are/OurStorySection";
import LetsTalk from "../../components/common/LetsTalk";
import Footer from "../../components/common/Footer";
import OUR_STORY_CONTENT from "../../data/ourStory";

export default function OurStory() {
    const navRef = useRef<HTMLElement>(null);
    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full">
                <AboutAFashion title={OUR_STORY_CONTENT.about.title} paragraphs={OUR_STORY_CONTENT.about.paragraphs} />
                <ImageGrid images={OUR_STORY_CONTENT.imageGrid.images} />
                <ProcessSection title={OUR_STORY_CONTENT.process.title} steps={OUR_STORY_CONTENT.process.steps} />
                <OurStorySection title={OUR_STORY_CONTENT.ourStory.title} paragraphs={OUR_STORY_CONTENT.ourStory.paragraphs} />
                <LetsTalk imageSeed={43} />
            </main>
            <Footer />
        </>
    );
}
