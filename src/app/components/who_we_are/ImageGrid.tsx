"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Props = {
    images?: string[];
};

export default function ImageGrid(props: Props = {}) {
    const { images = [
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    ] } = props;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const image1 = images[0];
    const image2 = images[1];

    return (
        <section
            ref={ref}
            className="min-h-screen w-full bg-black flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-32"
        >
            <div className="w-full max-w-7xl">
                {/* Custom Grid Layout */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-end">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                        {/* Top Left - Circle Image (Dark Blue Portrait) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="relative aspect-square overflow-hidden rounded-full"
                        >
                            <Image
                                src={image2}
                                alt="Fashion portrait - dark blue background"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 40vw"
                            />
                        </motion.div>

                        {/* Bottom Left - Tall Rectangle (Orange Sweater) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-lg"
                            style={{ aspectRatio: "3/4" }}
                        >
                            <Image
                                src={image1}
                                alt="Fashion portrait - orange sweater"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 40vw"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 h-full justify-between">
                        {/* Top Right - Very Tall Rectangle (Orange Sweater) - Extends to bottom */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-lg flex-1"
                        >
                            <Image
                                src={image1}
                                alt="Fashion portrait - orange sweater"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 40vw"
                            />
                        </motion.div>

                        {/* Bottom Right - Square (Dark Blue Portrait) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="relative aspect-square overflow-hidden rounded-lg"
                        >
                            <Image
                                src={image2}
                                alt="Fashion portrait - dark blue background"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 40vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
