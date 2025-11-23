"use client";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

interface SmallCard {
    title: string;
    image: string;
}

interface HeroCard {
    title: string;
    description: string;
    image: string;
    authorImage: string;
    authorName: string;
}

interface KeyFiguresData {
    sectionTitle: string;
    heroCard: HeroCard;
    smallCards: SmallCard[];
}

// CMS-ready data structure
// This can be easily replaced with API data from your CMS
const KEY_FIGURES_DATA: KeyFiguresData = {
    sectionTitle: "KEY FIGURES",
    heroCard: {
        title: "INFRASTRUCTURE",
        description: "Equipped with the latest machinery and a team of skilled workers and craftsmen, we operate a fully in-house manufacturing facility for bags, wallets, belts, and SLGs.",
        image: "/assets/images/home_page_key_figures/infrastructure.webp",
        authorImage: "/assets/images/afashions_favicon.svg",
        authorName: "A FASHION"
    },
    smallCards: [
        {
            title: "BSCI & SEDEX CERTIFICATIONS",
            image: "/assets/images/home_page_key_figures/certification.webp"
        },
        {
            title: "TANNERY",
            image: "/assets/images/home_page_key_figures/tannery.webp"
        }
    ]
};

export default function KeyFigures() {
    const { sectionTitle, heroCard, smallCards } = KEY_FIGURES_DATA;

    return (
        <section className="relative z-20 w-full bg-[#E8E8E8] py-12 md:py-20">
            <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="max-w-[1600px] mx-auto">
                    <SlideUpCard delay={0}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">
                            {sectionTitle}
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
                                    src={heroCard.image}
                                    alt={heroCard.title}
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                            </div>

                            {/* Text Section */}
                            <div className="w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                                        {heroCard.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600">
                                        {heroCard.description}
                                    </p>
                                </div>

                                {/* Author Section */}
                                <div className="flex items-center gap-3 mt-8">
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                        <Image
                                            src={heroCard.authorImage}
                                            alt={heroCard.authorName}
                                            width={32}
                                            height={32}
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="text-xs md:text-sm font-medium text-gray-700">{heroCard.authorName}</p>
                                </div>
                            </div>
                        </div>
                    </SlideUpCard>

                    {/* Two Small Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>

                                    {/* Text below image with slide animation */}
                                    <div className="p-4 transition-transform duration-500 ease-out group-hover:translate-x-2">
                                        <h3 className="text-base md:text-lg font-bold tracking-wide text-black">
                                            {card.title}
                                        </h3>
                                    </div>
                                </div>
                            </SlideUpCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
