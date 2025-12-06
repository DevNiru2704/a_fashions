import BlurFadeText from "../animations/BlurFadeText";

export default function ManifestoSection() {
    return (
        <section className="relative h-[50vh] md:h-[100vh] w-full flex items-center justify-start px-8 md:px-12 lg:px-16 z-10 bg-[#E8E8E8]">
            {/* Desktop Layout - Hidden on mobile/tablet */}
            <div className="hidden lg:flex flex-col gap-4 w-full">
                <BlurFadeText
                    text="DESIGNED    WITH"
                    className="text-[12vw] leading-none text-black tracking-tight"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
                <BlurFadeText
                    text="ORIGINALITY    AND"
                    className="text-[12vw] leading-none text-black tracking-tight"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
                <BlurFadeText
                    text="PURPOSE"
                    className="text-[12vw] leading-none text-black tracking-tight"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
            </div>

            {/* Mobile/Tablet Layout - Hidden on desktop */}
            <div className="block lg:hidden w-full">
                <BlurFadeText
                    text="DESIGNED WITH"
                    className="text-[12vw] leading-none text-black tracking-wide"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
                <BlurFadeText
                    text="ORIGINALITY"
                    className="text-[12vw] leading-none text-black tracking-wide"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
                <BlurFadeText
                    text="AND PURPOSE"
                    className="text-[12vw] leading-none text-black tracking-wide"
                    delayBetweenWords={10}
                    threshold={0.5}
                />
            </div>
            <div className="lg:h-[20vh] hidden"></div>
        </section>
    );
}
