"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-50 w-full bg-black text-white py-12 px-6 md:px-12">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* About Section */}
                <div>
                    <h3 className="text-sm font-light mb-4 text-gray-400">ABOUT</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/catalog"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                CATALOG
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/our-story"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                OUR STORY
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/lets-connect"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Location Section */}
                <div>
                    <h3 className="text-sm font-light mb-4 text-gray-400">LOCATION</h3>
                    <address className="text-sm not-italic leading-relaxed">
                        62, MATHEWATALA ROAD, TANGRA
                        <br />
                        KOLKATA, WEST BENGAL 700046
                        <br />
                        INDIA
                    </address>
                </div>

                {/* Socials Section */}
                <div>
                    <h3 className="text-sm font-light mb-4 text-gray-400">SOCIALS</h3>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                INSTAGRAM
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                TWITTER
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm hover:-translate-y-1 transition-transform duration-300"
                            >
                                BEHANCE
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="w-full max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-right">
                <p className="text-sm text-gray-500">2025 © AFASHION</p>
            </div>
        </footer>
    );
}
