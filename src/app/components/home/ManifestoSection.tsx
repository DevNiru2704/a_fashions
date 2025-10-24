import BlurFadeText from "../animations/BlurFadeText";

export default function ManifestoSection() {
    return (
        <section className="relative h-[100vh] w-full flex items-center justify-start px-8 md:px-12 lg:px-16 z-10 bg-[#E8E8E8]">
            {/* Desktop Layout - Hidden on mobile/tablet */}
            <div className="hidden lg:block w-full">
                <BlurFadeText
                    text="DESIGNED WITH ORIGINALITY AND PURPOSE"
                    className="text-[12vw] leading-none font-bold text-black tracking-wide"
                    delayBetweenWords={20}
                    threshold={0.5}
                />
            </div>

            {/* Mobile/Tablet Layout - Hidden on desktop */}
            <div className="block lg:hidden w-full">
                <BlurFadeText
                    text="DESIGNED WITH ORIGINALITY AND PURPOSE"
                    className="text-[10vw] md:text-[9vw] leading-none font-bold text-black tracking-wide"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
            </div>
        </section>
    );
}
