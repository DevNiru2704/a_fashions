"use client";
import { useRef } from "react";
import Navbar from "../components/common/Navbar";
import AboutAFashion from "../components/who_we_are/AboutAFashion";
import ImageGrid from "../components/who_we_are/ImageGrid";
import ProcessSection from "../components/who_we_are/ProcessSection";
import EthicalPractices from "../components/who_we_are/EthicalPractices";
import YouDreamWeCreate from "../components/who_we_are/YouDreamWeCreate";
import OurStorySection from "../components/who_we_are/OurStorySection";
import LetsTalk2 from "../components/who_we_are/LetsTalk2";
import Footer from "../components/common/Footer";
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
                <EthicalPractices title={OUR_STORY_CONTENT.ethical.title} description={OUR_STORY_CONTENT.ethical.description} image={OUR_STORY_CONTENT.ethical.image} author={OUR_STORY_CONTENT.ethical.author} authorImage={OUR_STORY_CONTENT.ethical.authorImage} />
                <YouDreamWeCreate title={OUR_STORY_CONTENT.youDream.title} founders={OUR_STORY_CONTENT.youDream.founders} />
                <OurStorySection title={OUR_STORY_CONTENT.ourStory.title} paragraphs={OUR_STORY_CONTENT.ourStory.paragraphs} />
                <LetsTalk2 title={OUR_STORY_CONTENT.letsTalk.title} ctaText={OUR_STORY_CONTENT.letsTalk.ctaText} ctaLink={OUR_STORY_CONTENT.letsTalk.ctaLink} galleryImages={OUR_STORY_CONTENT.letsTalk.galleryImages} />
            </main>
            <Footer />
        </>
    );
}
