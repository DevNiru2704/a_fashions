import Navbar from "../components/Navbar";

export default function LetsConnect() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#E8E8E8' }}>
                <div className="flex flex-col items-center justify-center gap-8 px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-wide">
                        LETS CONNECT
                    </h1>
                    <p className="text-base md:text-lg text-black text-center max-w-2xl font-light">
                        Coming soon...
                    </p>
                </div>
            </main>
        </>
    );
}
