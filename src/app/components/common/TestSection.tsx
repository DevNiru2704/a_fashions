"use client";

interface TestSectionProps {
    label?: string;
    height?: string;
    bgColor?: string;
    textColor?: string;
}

export default function TestSection({
    label = "TEST SECTION",
    height = "h-screen",
    bgColor = "bg-purple-600",
    textColor = "text-white"
}: TestSectionProps) {
    return (
        <section className={`relative w-full ${height} ${bgColor} flex items-center justify-center`}>
            <div className="text-center">
                <h2 className={`text-4xl md:text-6xl font-bold ${textColor} tracking-tight`}>
                    {label}
                </h2>
                <p className={`mt-4 text-lg ${textColor} opacity-70`}>
                    Scroll position marker
                </p>
            </div>
        </section>
    );
}
