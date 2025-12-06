import Image from "next/image";

export default function LogoSection() {
    return (
        <section className="relative h-[150vh] md:h-[100vh] z-10 w-full flex flex-col items-center justify-center bg-[#E8E8E8]">
            <div className="flex flex-col items-center justify-center gap-12">
                {/* Logo */}
                <Image
                    src="https://ik.imagekit.io/zqjkk9ui6/images/afashions_logo.svg"
                    alt="A Fashions Logo"
                    width={1200}
                    height={400}
                    className="w-[80vw] h-auto"
                    priority
                />

                {/* Tagline */}
                <p className="text-black text-sm md:text-base lg:text-xl font-light text-center px-4">
                    DESIGNING AND MANUFACTURING FINEST LEATHER GOODS
                </p>
                <div className="lg:h-[10vh] hidden"></div>
            </div>
        </section>
    );
}
