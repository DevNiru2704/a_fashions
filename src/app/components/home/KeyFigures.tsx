"use client";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

interface HeroCard {
    title: string;
    description?: string;
    points?: string[];
    image: string;
    authorImage: string;
    authorName: string;
}

interface KeyFiguresData {
    sectionTitle: string;
    heroCards: HeroCard[];
}

// CMS-ready data structure
// This can be easily replaced with API data from your CMS
const KEY_FIGURES_DATA: KeyFiguresData = {
    sectionTitle: "KEY FIGURES",
    heroCards: [
        {
            title: "INFRASTRUCTURE",
            description: "Equipped with the latest machinery and a team of skilled workers and craftsmen, we operate a fully in-house manufacturing facility for bags, wallets, belts, and SLGs.",
            image: "https://ik.imagekit.io/zqjkk9ui6/images/home_page_key_figures/infrastructure.webp",
            authorImage: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
            authorName: "A FASHIONS"
        },
        {
            title: "TANNERY",
            description: "Having our own tannery gives us complete control over the quality, consistency, and sustainability of the leather we use. From raw material selection to finishing, every stage is closely monitored, allowing us to deliver uniform colours, textures, and performance across all products. With faster development, improved customisation, and transparent processes, our tannery strengthens our supply chain and ensures that every piece we create meets the highest standards of craftsmanship and responsibility.",
            image: "https://ik.imagekit.io/zqjkk9ui6/images/home_page_key_figures/tannery.webp",
            authorImage: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
            authorName: "A FASHIONS"
        },
        {
            title: "OUR SOCIAL & ETHICAL COMPLIANCES",
            points: [
                "Legal & Ethical Employment : Compliance with local labour laws (wages, working hours, overtime). No child labour or forced labour.",
                "Health & Safety Standards",
                "Fair Wages & Benefits",
                "Anti-Discrimination & Equal Opportunity",
                "Ethical Sourcing & Traceability : Procurement of leather and materials from LWG-rated tanneries or compliant suppliers.",
                "Environmental Responsibility : Waste disposal, chemical handling, and effluent treatment practices. Use of restricted chemicals in line with buyer RSL/REACH."
            ],
            image: "https://ik.imagekit.io/zqjkk9ui6/images/our_story_ethical_section/ethics.webp",
            authorImage: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
            authorName: "A FASHIONS"
        }
    ]
};

export default function KeyFigures() {
    const { sectionTitle, heroCards } = KEY_FIGURES_DATA;

    return (
        <section className="relative z-20 w-full bg-[#E8E8E8] py-12 md:py-20">
            <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="max-w-[1600px] mx-auto">
                    <SlideUpCard delay={0}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">
                            {sectionTitle}
                        </h2>
                    </SlideUpCard>

                    {/* Hero Cards */}
                    <div className="space-y-6 md:space-y-8">
                        {heroCards.map((card, index) => (
                            <SlideUpCard key={`card-${index}`} delay={index * 150}>
                                <div
                                    data-cursor-hover="card"
                                    className="group relative w-full bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row cursor-pointer md:min-h-[600px]"
                                >
                                    {/* Image Section */}
                                    <div className="relative w-full md:w-[50%] h-[300px] md:h-auto overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Text Section */}
                                    <div className="font-archivo-regular w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                                                {card.title}
                                            </h3>
                                            {card.description && (
                                                <p className="text-sm md:text-xl text-gray-600">
                                                    {card.description}
                                                </p>
                                            )}
                                            {card.points && (
                                                <ul className="space-y-3">
                                                    {card.points.map((point, idx) => (
                                                        <li key={idx} className="text-sm md:text-xl text-gray-600 flex items-start">
                                                            <span className="mr-2 mt-1 flex-shrink-0">•</span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Author Section */}
                                        <div className="flex items-center gap-3 mt-8">
                                            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                                <Image
                                                    src={card.authorImage}
                                                    alt={card.authorName}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="text-xs md:text-sm font-medium text-gray-700">{card.authorName}</p>
                                        </div>
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
