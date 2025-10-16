export default function Header() {
    return (
        <main className="relative h-screen w-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 h-full w-1/2 object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/assets/videos/left_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <video
                className="absolute top-0 right-0 h-full w-1/2 object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/assets/videos/right_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </main>
    );
}
