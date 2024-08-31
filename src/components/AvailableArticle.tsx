import { Link } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import MountainBlue from "/images/mountain_blue_sky.jpg";
import MountainForest from "/images/mountain_forest.jpg";
import RockMountain from "/images/rock_mountain.jpg";

const AvailableArticle = () => {
    const { blogs } = useBlog();
    const blogLength = blogs?.results;
    return (
        <div className="bg-gray-100 p-2 md:px-20 px-5 text-white py-20 flex items-center justify-center">
            <div className="grid md:grid-cols-5 grid-cols-6 md:gap-5 gap-3 h-[30rem] max-h-[50rem] max-w-[100rem] w-full">
                <div
                    style={{
                        backgroundImage: `url(${MountainBlue})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="row-span-3 md:col-span-2 col-span-3 rounded-lg p-5 flex flex-col md:justify-end justify-center md:items-start items-center space-y-5 md:text-start text-center"
                >
                    <p className="md:text-xl text-lg font-medium">
                        Exploring the world, one adventure at a time.
                    </p>
                    <Link to="/blogs" className="bg-white text-black px-5 py-2">
                        Explore
                    </Link>
                </div>
                <div
                    className="md:row-span-5 row-span-3 col-span-3 flex items-center justify-center rounded-lg md:p-5 p-2"
                    style={{
                        backgroundImage: `url(${MountainForest})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h2 className="lg:text-4xl md:text-3xl text-lg font-semibold text-white text-center">
                        Creating memories of a lifetime, one moment at a time.
                    </h2>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${RockMountain})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="row-span-2 md:col-span-2 col-span-6 rounded-lg p-5 flex flex-col justify-end"
                >
                    <p className="text-lg font-medium">Available Article</p>
                    <h2 className="text-5xl font-bold">{blogLength}</h2>
                </div>
            </div>
        </div>
    );
};

export default AvailableArticle;
