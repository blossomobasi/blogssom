import { Link } from "react-router-dom";

const HomeMain = () => {
    return (
        <div className="relative h-screen">
            <video autoPlay muted loop id="myVideo" className="h-full object-cover w-full">
                <source
                    src="https://videos.pexels.com/video-files/2257010/2257010-hd_1920_1080_24fps.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="lg:w-2/3 w-full absolute top-1/2 -translate-y-1/2 md:px-20 px-5 text-white flex flex-col md:items-start items-center md:text-left text-center space-y-5">
                <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold drop-shadow-lg">
                    Journey the Globe One Blog at a Time
                </h1>
                <p>
                    Explore the world through your words. Share your journeys, inspire others, and
                    connect with fellow travelers. Your adventure starts here—blog your way around
                    the world.
                </p>
                <Link
                    to="/blogs"
                    className="bg-white text-black px-5 py-2 hover:scale-105 transition-all duration-300"
                >
                    Start Blogging
                </Link>
            </div>
        </div>
    );
};

export default HomeMain;
