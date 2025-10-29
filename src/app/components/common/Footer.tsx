"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-20 w-full bg-black text-white px-8 md:px-20 lg:px-48 py-12 md:py-16">
            {/* Mobile: 2x2 Grid Layout, Desktop: Flex Row */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:flex md:flex-row md:gap-12 lg:gap-48">
                {/* About Section - Top Left */}
                <div className="flex-shrink-0">
                    <h3 className="text-xs md:text-sm font-light mb-6 md:mb-4 text-gray-500 tracking-widest">ABOUT</h3>
                    <ul className="space-y-3 md:space-y-1">
                        <li>
                            <Link
                                href="/catalog"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                CATALOG
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/our-story"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                OUR STORY
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Location Section - Top Right */}
                <div className="flex-shrink-0">
                    <h3 className="text-xs md:text-sm font-light mb-6 text-gray-500 tracking-widest">LOCATION</h3>
                    <address className="text-base md:text-sm text-gray-300 not-italic leading-relaxed tracking-wide">
                        62, Mathewartala Road, Tangra
                        <br />
                        Kolkata, West Bengal 700046
                        <br />
                        INDIA
                    </address>
                </div>

                {/* Socials Section - Bottom Left */}
                <div className="flex-shrink-0">
                    <h3 className="text-xs md:text-sm font-light mb-6 md:mb-4 text-gray-500 tracking-widest">SOCIALS</h3>
                    <ul className="space-y-3 md:space-y-1">
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-base md:text-sm text-gray-300 tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                Behance
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Copyright - Bottom Right on mobile, far right on desktop */}
                <div className="flex-shrink-0 flex items-end md:ml-auto md:self-end">
                    <p className="text-xs md:text-sm text-gray-600 tracking-wider">2025 © AFASHION</p>
                </div>
            </div>
        </footer>
    );
}
