import { Link } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import MountainBlue from "/images/mountain_blue_sky.jpg";
import MountainForest from "/images/mountain_forest.jpg";
import RockMountain from "/images/rock_mountain.jpg";

const AvailableArticle = () => {
    const { blogs } = useBlog();
    const blogLength = blogs?.results;
    return (
        <div className="bg-gray-100 p-2 md:px-32 px-5 text-white py-10 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-5 h-[30rem] max-h-[50rem] max-w-[100rem] w-full">
                <div
                    style={{
                        backgroundImage: `url(${MountainBlue})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="row-span-3 col-span-2 rounded-lg p-5 flex flex-col justify-end items-start space-y-5"
                >
                    <p className="text-xl font-medium">
                        Exploring the world, one adventure at a time.
                    </p>
                    <Link to="/blogs" className="bg-white text-black px-5 py-2">
                        Explore
                    </Link>
                </div>
                <div
                    className="row-span-5 col-span-3 flex items-center justify-center rounded-lg"
                    style={{
                        backgroundImage: `url(${MountainForest})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h2 className="text-4xl font-semibold text-white text-center">
                        Creating memories of a lifetime, one moment at a time.
                    </h2>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${RockMountain})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="row-span-2 col-span-2 rounded-lg p-5 flex flex-col justify-end"
                >
                    <p className="text-lg font-medium">Available Article</p>
                    <h2 className="text-5xl font-bold">{blogLength}</h2>
                </div>
            </div>
        </div>
    );
};

export default AvailableArticle;
