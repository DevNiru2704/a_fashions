"use client";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

export default function KeyFigures() {
    const smallCards = [
        {
            title: "EXPERIENCE",
            date: "April 9, 2025",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
        },
        {
            title: "CERTIFICATIONS",
            date: "March 19, 2025",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
        },
        {
            title: "WORKFORCE",
            date: "April 10, 2024",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        }
    ];

    return (
        <section className="relative z-20 w-full bg-[#E8E8E8] py-12 md:py-20">
            <div className="w-full px-6 md:px-12">
                <SlideUpCard delay={0}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">
                        KEY FIGURES
                    </h2>
                </SlideUpCard>

                {/* Large Hero Card - Split Layout */}
                <SlideUpCard delay={0}>
                    <div
                        data-cursor-hover="card"
                        className="group relative w-full bg-white rounded-2xl overflow-hidden mb-6 md:mb-8 flex flex-col md:flex-row cursor-pointer"
                    >
                        {/* Image Section */}
                        <div className="relative w-full md:w-[50%] h-[300px] md:h-[420px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                                alt="Infrastructure"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                                    INFRASTRUCTURE
                                </h3>
                                <p className="text-sm md:text-base text-gray-600">
                                    150,000 sq ft .....
                                </p>
                            </div>

                            {/* Author Section */}
                            <div className="flex items-center gap-3 mt-8">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                                        alt="Author"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-xs md:text-sm font-medium text-gray-700">A FASHION</p>
                            </div>
                        </div>
                    </div>
                </SlideUpCard>

                {/* Three Small Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {smallCards.map((card, index) => (
                        <SlideUpCard key={`card-${index}`} delay={index * 150}>
                            <div
                                key={index}
                                data-cursor-hover="card"
                                className="group w-full rounded-2xl cursor-pointer overflow-hidden transition-all duration-500"
                                style={{
                                    backgroundColor: 'transparent',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {/* Image container with zoom effect */}
                                <div className="relative w-full h-[280px] md:h-[300px] overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Text below image with slide animation */}
                                <div className="p-4 transition-transform duration-500 ease-out group-hover:translate-x-2">
                                    <h3 className="text-base md:text-lg font-bold mb-1 tracking-wide text-black">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-black/60">
                                        {card.date}
                                    </p>
                                </div>
                            </div>
                        </SlideUpCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
