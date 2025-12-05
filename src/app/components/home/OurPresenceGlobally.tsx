"use client";
import Image from "next/image";
import SlideUpCard from "../animations/SlideUpCard";

interface PresenceImage {
    src: string;
    alt: string;
}

interface OurPresenceGloballyData {
    title: string;
    subtitle: string;
    images: PresenceImage[];
}

// CMS-ready data structure
const PRESENCE_DATA: OurPresenceGloballyData = {
    title: "OUR PRESENCE GLOBALLY",
    subtitle: "Includes our participation in international trade\nfairs and our design selected & displayed by Mipel, Milan",
    images: [
        {
            src: "https://ik.imagekit.io/zqjkk9ui6/images/global_presence/global1.webp",
            alt: "A Fashions at international trade fair - booth overview"
        },
        {
            src: "https://ik.imagekit.io/zqjkk9ui6/images/global_presence/global2.webp",
            alt: "A Fashions exhibition booth at Mipel Milan"
        },
        {
            src: "https://ik.imagekit.io/zqjkk9ui6/images/global_presence/global3.webp",
            alt: "A Fashions product display at international event"
        }
    ]
};

export default function OurPresenceGlobally() {
    const { title, subtitle, images } = PRESENCE_DATA;

    return (
        <section className="relative z-20 w-full bg-[#E8E8E8] py-12 md:py-20">
            <div className="w-full px-6 md:px-12 lg:px-16">
                <div className="max-w-[1600px] mx-auto">
                    <SlideUpCard delay={0}>
                        <div className="bg-white rounded-2xl p-8 md:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                                {title}
                            </h2>
                            <p className="font-archivo-regular text-xl md:text-xl text-gray-600 mb-8 md:mb-12 whitespace-pre-line">
                                {subtitle}
                            </p>

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {images.map((image, index) => (
                                    <div
                                        key={`presence-${index}`}
                                        data-cursor-hover="card"
                                        className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideUpCard>
                </div>
            </div>
        </section>
    );
}
