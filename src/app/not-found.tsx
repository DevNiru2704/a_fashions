"use client";
import { motion } from "framer-motion";
import BlurFadeText from "./components/animations/BlurFadeText";
import MorphButton from "./components/animations/MorphButton";
import Footer from "./components/common/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col">
            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="flex flex-col items-center justify-center gap-8">
                    {/* 404 with BlurFadeText animation */}
                    <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wide">
                        <BlurFadeText
                            text="404"
                            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white"
                            delayBetweenWords={150}
                        />
                    </div>

                    {/* Page Not Found with slower BlurFadeText animation */}
                    <div className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide">
                        <BlurFadeText
                            text="PAGE NOT FOUND"
                            className="text-xl md:text-2xl lg:text-3xl font-medium text-white"
                            delayBetweenCharacters={100}
                        />
                    </div>

                    {/* Back to Home button with appear and slide up animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: "easeOut"
                        }}
                        className="mt-8"
                    >
                        <MorphButton href="/">
                            BACK TO HOME
                        </MorphButton>
                    </motion.div>
                </div>
            </main>

            {/* Footer with appear and slide up animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 1.5,
                    ease: "easeOut"
                }}
            >
                <Footer />
            </motion.div>
        </div>
    );
}
