"use client";
import { useRef } from "react";
import Navbar from "./components/common/Navbar";
import VideoCurtain from "./components/home/VideoCurtain";
import LogoSection from "./components/home/LogoSection";
import ManifestoSection from "./components/home/ManifestoSection";
import WhatWeMake from "./components/home/WhatWeMake";
import KeyFigures from "./components/home/KeyFigures";
import WhoWeAre from "./components/home/WhoWeAre";
import LetsTalk from "./components/common/LetsTalk";
import Footer from "./components/common/Footer";

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
        <WhoWeAre />
        <LetsTalk />
      </main>
      <Footer />
    </>
  );
}
