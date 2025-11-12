import Link from "next/link";

interface ExploreButtonProps {
    category?: string;
}

export default function ExploreButton({ category }: ExploreButtonProps) {
    if (!category) {
        return (
            <button className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-full text-black text-sm md:text-base font-medium transition-colors duration-300 hover:bg-white/2">
                {/* Left arrow - hidden initially, appears on hover */}
                <span className="absolute left-4 scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    →
                </span>

                {/* Text - shifts right on hover to make room for left arrow */}
                <span className="transition-transform duration-300 group-hover:translate-x-5">
                    Explore more
                </span>

                {/* Right arrow - visible initially, disappears on hover */}
                <span className="scale-100 opacity-100 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                    →
                </span>
            </button>
        );
    }

    return (
        <Link
            href={`/catalog/${category}`}
            className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-full text-black text-sm md:text-base font-medium transition-colors duration-300 hover:bg-white/2"
        >
            {/* Left arrow - hidden initially, appears on hover */}
            <span className="absolute left-4 scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                →
            </span>

            {/* Text - shifts right on hover to make room for left arrow */}
            <span className="transition-transform duration-300 group-hover:translate-x-5">
                Explore more
            </span>

            {/* Right arrow - visible initially, disappears on hover */}
            <span className="scale-100 opacity-100 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                →
            </span>
        </Link>
    );
}
