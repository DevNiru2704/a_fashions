"use client";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
    const images = [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
        "https://images.unsplash.com/photo-1761216674297-6ffa4d89400c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    ];

    return (
        <section className="relative z-20 w-full bg-black py-20 md:py-32">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                {/* Title and Text Content */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none">
                        WHO WE ARE
                    </h2>

                    <div className="flex flex-col gap-6 md:max-w-md lg:max-w-lg">
                        <p className="text-white text-base md:text-xl leading-relaxed">
                            At A Fashion, we are a team of<br />
                            passionate creatives dedicated to<br />
                            crafting striking visual narratives.<br />
                            Specializing in photography,<br />
                            videography, and creative direction,<br />
                            we bring brands, stories, and concepts<br />
                            to life with a refined artistic touch.
                        </p>

                        <Link
                            href="/our-story"
                            className="group text-white text-lg md:text-lg font-medium px-8 py-3 hover:bg-white hover:text-black hover:scale-110 self-start inline-flex items-center gap-3 transition-all duration-300"
                            style={{
                                borderRadius: '16px',
                                transition: 'all 0.3s ease-in-out'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderRadius = '0px'}
                            onMouseLeave={(e) => e.currentTarget.style.borderRadius = '16px'}
                        >
                            KNOW MORE
                            <span className="text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Images - Staggered Layout */}
                <div className="flex flex-col -space-y-20 md:-space-y-32">
                    {/* First image - Left aligned */}
                    <div className="relative w-full md:w-[45%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                        <Image
                            src={images[0]}
                            alt="Who we are 1"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Second image - Right aligned */}
                    <div className="relative w-full md:w-[45%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden md:ml-auto z-10">
                        <Image
                            src={images[1]}
                            alt="Who we are 2"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Third image - Left aligned */}
                    <div className="relative w-full md:w-[45%] h-[500px] md:h-[600px] rounded-2xl overflow-hidden z-20">
                        <Image
                            src={images[2]}
                            alt="Who we are 3"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Horizontal line at the bottom */}
            <div className="w-full h-px bg-white/20 mt-20 md:mt-32" />
        </section>
    );
}