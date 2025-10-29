"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-20 w-full bg-black text-white px-20 md:px-40 lg:px-48 py-12 md:py-16">
            <div className="w-full flex flex-col md:flex-row gap-12 md:gap-48">
                {/* About Section */}
                <div className="flex-shrink-0">
                    <h3 className="text-sm font-light mb-4 text-gray-500 tracking-wider">ABOUT</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/catalog"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                CATALOG
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/our-story"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                OUR STORY
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Location Section */}
                <div className="flex-shrink-0">
                    <h3 className="text-sm font-light mb-6 text-gray-500 tracking-wider">LOCATION</h3>
                    <address className="text-sm not-italic leading-relaxed tracking-wide">
                        62, MATHEWATALA ROAD, TANGRA
                        <br />
                        KOLKATA, WEST BENGAL 700046
                        <br />
                        INDIA
                    </address>
                </div>

                {/* Socials Section */}
                <div className="flex-shrink-0">
                    <h3 className="text-sm font-light mb-4 text-gray-500 tracking-wider">SOCIALS</h3>
                    <ul className="space-y-1">
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                INSTAGRAM
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                TWITTER
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm tracking-wide hover:-translate-y-1 transition-transform duration-300"
                            >
                                BEHANCE
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Copyright - aligned to the right */}
                <div className="flex-shrink-0 ml-auto self-end">
                    <p className="text-sm text-gray-600 tracking-wider">2025 © AFASHION</p>
                </div>
            </div>
        </footer>
    );
}
