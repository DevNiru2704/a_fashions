"use client";
import { useRef } from "react";
import Navbar from "./components/common/Navbar";
import VideoCurtain from "./components/home/VideoCurtain";
import LogoSection from "./components/home/LogoSection";
import ManifestoSection from "./components/home/ManifestoSection";
import WhatWeMake from "./components/home/WhatWeMake";
import KeyFigures from "./components/home/KeyFigures";
import OurPresenceGlobally from "./components/home/OurPresenceGlobally";
import WhoWeAre from "./components/home/WhoWeAre";
import LetsTalk from "./components/common/LetsTalk";
import Footer from "./components/common/Footer";

// Metadata is exported from layout.tsx with home-specific overrides

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  return (
    <>
      {/* Navbar */}
      <Navbar navRef={navRef} />
      <main className="relative w-full">
        <VideoCurtain />
        <LogoSection />
        <ManifestoSection />
        <WhatWeMake />
        <KeyFigures />
        <OurPresenceGlobally />
        <WhoWeAre />
        <LetsTalk />
      </main>
      <Footer />
    </>
  );
}
