import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#E8E8E8' }}>
            <div className="flex flex-col items-center justify-center gap-8 px-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-wide">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-wide">
                    PAGE NOT FOUND
                </h2>
                <p className="text-base md:text-lg text-black text-center max-w-2xl font-light">
                    The page you are looking for doesn&rsquo;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="mt-4 px-8 py-3 border-2 border-black text-black font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300"
                >
                    RETURN HOME
                </Link>
            </div>
        </main>
    );
}
