"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlurIn from "../animations/BlurIn";

type Props = {
    title?: string;
    paragraphs?: string[];
};

export default function AboutAFashion(props: Props = {}) {
    const { title = "ABOUT A FASHIONS", paragraphs = [
        `A FASHIONS WAS FOUNDED IN KOLKATA, INDIA, A CITY LONG CELEBRATED FOR ITS HERITAGE OF CRAFTSMANSHIP AND ARTISTRY. WE ARE A YOUNG AND DYNAMIC LEATHER GOODS MANUFACTURER WITH A PASSION FOR DESIGN AND CRAFTSMANSHIP. A FASHIONS WAS ESTABLISHED WITH A CLEAR VISION — TO CREATE WORLD-CLASS LEATHER PRODUCTS THAT BLEND TRADITIONAL CRAFTSMANSHIP WITH MODERN, SUSTAINABLE LIVING.`,
        `FROM THE VERY BEGINNING, A FASHIONS SET OUT TO BUILD A COMPANY THAT NOT ONLY MANUFACTURES LEATHER GOODS BUT ALSO DESIGNS THEM WITH ORIGINALITY AND PURPOSE. OUR IN-HOUSE DESIGN STUDIO IS THE CREATIVE HEART OF OUR OPERATIONS, WHERE CONCEPTS ARE SKETCHED, MATERIALS ARE HANDPICKED, AND EVERY DETAIL IS THOUGHTFULLY REFINED. THIS INTEGRATED APPROACH ALLOWS US TO MAINTAIN FULL CONTROL OVER QUALITY, INNOVATION, AND FINISH — ENSURING THAT EVERY PRODUCT LEAVING OUR WORKSHOP REFLECTS OUR COMMITMENT TO EXCELLENCE.`,
        `SPECIALIZING IN LEATHER BAGS, WALLETS, BELTS AND ACCESSORIES, WE TAKE PRIDE IN OFFERING PRODUCTS THAT COMBINE FUNCTIONALITY AND ELEGANCE. EACH PIECE IS CRAFTED USING PREMIUM MATERIALS AND IS SHAPED BY SKILLED ARTISANS WHO CARRY FORWARD LONG-STANDING LEGACY OF LEATHER CRAFTSMANSHIP.`,
        `DESPITE BEING A RELATIVELY YOUNG ENTERPRISE, A FASHIONS HAS QUICKLY EARNED RECOGNITION IN INTERNATIONAL MARKETS. WE DESIGN, MANUFACTURE, AND EXPORT TO SEVERAL COUNTRIES ACROSS EUROPE, UNITED STATES, AND MANY CITIES, CATERING TO BRANDS AND BUYERS WHO VALUE QUALITY, DESIGN INTEGRITY, AND TIMELY DELIVERY.`,
        `AT THE CORE OF A FASHIONS LIES A BELIEF THAT GOOD DESIGN TRANSCENDS BORDERS. OUR MISSION IS TO CONTINUE EVOLVING — BLENDING HERITAGE TECHNIQUES WITH CONTEMPORARY AESTHETICS, AND CREATING LEATHER GOODS THAT TELL A STORY OF CRAFTSMANSHIP, PASSION, AND GLOBAL APPEAL. AT OUR CORE, WE BELIEVE LEATHER TELLS A STORY — OF HERITAGE, OF HANDS THAT SHAPE, AND OF JOURNEYS YET TO COME. AND THROUGH EVERY PRODUCT WE CRAFT, A FASHIONS CONTINUES TO WRITE ITS OWN CHAPTER IN THAT TIMELESS NARRATIVE OF CRAFTSMANSHIP AND CREATIVITY.`
    ] } = props;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            className="min-h-screen w-full bg-black flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 tracking-wide"
                >
                    {title}
                </motion.h1>

                {/* Content */}
                <BlurIn delay={0.2} duration={1}>
                    <div className="space-y-8 md:space-y-10">
                        {paragraphs.map((p, idx) => (
                            <p key={idx} className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-light tracking-wide">
                                {p}
                            </p>
                        ))}
                    </div>
                </BlurIn>
            </div>
        </section>
    );
}
