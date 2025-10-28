"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MorphButton from "../animations/MorphButton";

export default function LetsTalk() {
    const galleryImages = [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
        "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    ];

    return (
        <section className="relative z-20 w-full bg-black py-20 overflow-hidden">
            {/* Left gradient overlay - full section height */}
            <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-gradient-to-r from-black via-black/95 to-transparent z-30 pointer-events-none" />

            {/* Right gradient overlay - full section height */}
            <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-gradient-to-l from-black via-black/95 to-transparent z-30 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    TURNING IMAGINATION
                    <br />
                    INTO REALITY
                </h2>

                <div className="mt-8">
                    <MorphButton href="/lets-connect">
                        LET'S TALK
                    </MorphButton>
                </div>
            </div>

            {/* Moving Gallery */}
            <div className="relative w-full mt-32">
                <motion.div
                    className="flex gap-2"
                    style={{ rotate: '-5deg' }}
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        x: [-3060, 0],
                        y: [267, 0]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear"
                        },
                        y: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear"
                        }
                    }}
                >
                    {/* Render images three times for seamless loop */}
                    {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-[300px] h-[200px] rounded-lg overflow-hidden"
                        >
                            <Image
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Extra space at the bottom */}
            <div className="w-full h-[30vh]" />
        </section>
    );
}
