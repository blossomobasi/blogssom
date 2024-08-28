const HomeMain = () => {
    return (
        <div className="relative h-screen">
            <video autoPlay muted loop id="myVideo" className="h-full object-cover w-full">
                <source
                    src="https://videos.pexels.com/video-files/2257010/2257010-uhd_3840_2160_24fps.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="absolute top-1/2 -translate-y-1/2 md:px-20 px-5 text-white">
                <h1 className="text-6xl font-bold">
                    Blog your way <br /> round the world
                </h1>
                <p className="pt-5">Share your stories with the world</p>
            </div>
        </div>
    );
};

export default HomeMain;
