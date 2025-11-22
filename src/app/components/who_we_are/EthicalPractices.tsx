"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

type Props = {
    title?: string;
    description?: string;
    points?: string[];
    image?: string;
    author?: string;
    authorImage?: string;
};

export default function EthicalPractices(props: Props = {}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const {
        title = "OUR SOCIAL & ETHICAL COMPLIANCES",
        description = "Our Social & Ethical Compliances",
        points = [
            "Legal & Ethical Employment : Compliance with local labour laws (wages, working hours, overtime). No child labour or forced labour.",
            "Health & Safety Standards",
            "Fair Wages & Benefits",
            "Anti-Discrimination & Equal Opportunity",
            "Ethical Sourcing & Traceability : Procurement of leather and materials from LWG-rated tanneries or compliant suppliers.",
            "Environmental Responsibility : Waste disposal, chemical handling, and effluent treatment practices. Use of restricted chemicals in line with buyer RSL/REACH."
        ],
        image = "/assets/images/our_story_ethical_section/ethics.webp",
        author = "A FASHION",
        authorImage = "/assets/images/afashions_favicon.svg"
    } = props;

    return (
        <section
            ref={ref}
            className="w-full bg-black px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Large Hero Card - Split Layout */}
                <SlideUpCard delay={0}>
                    <div
                        data-cursor-hover="card"
                        className="group relative w-full bg-white rounded-2xl overflow-hidden mb-6 md:mb-8 flex flex-col md:flex-row cursor-pointer"
                    >
                        {/* Image Section */}
                        <div className="relative w-full md:w-[50%] h-[300px] md:h-auto overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                                    {title}
                                </h3>
                                <ul className="space-y-3">
                                    {points.map((point, index) => (
                                        <li key={index} className="text-sm md:text-base text-gray-600 flex items-start">
                                            <span className="mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Author Section */}
                            <div className="flex items-center gap-3 mt-8">
                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                    <Image
                                        src={authorImage}
                                        alt={author}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-xs md:text-sm font-medium text-gray-700">{author}</p>
                            </div>
                        </div>
                    </div>
                </SlideUpCard>
            </div>
        </section>
    );
}
