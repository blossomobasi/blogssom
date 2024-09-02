import { useBlog } from "../hooks/useBlog";
import { FaRegSquarePlus } from "react-icons/fa6";

import DisplayBlog from "../ui/DisplayBlog";
import ScrollToTop from "../ui/ScrollToTop";
import Spinner from "../ui/Spinner";
import Mountain from "/images/mountain.jpg";
import { Link } from "react-router-dom";

const BlogPage = () => {
    const { blogs, isFetchingBlogs, blogError } = useBlog();

    if (blogError) return <div>{blogError.message}</div>;

    return (
        <ScrollToTop>
            <div
                style={{
                    backgroundImage: `url(${Mountain})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="h-[70vh] w-full flex flex-col items-center justify-center text-white"
            >
                <h1 className="text-6xl font-extrabold drop-shadow-lg pb-3">BLOG</h1>
                <p className="text-lg font-medium drop-shadow-lg">
                    Travel blog | Recent blog posts
                </p>

                <Link
                    to="create"
                    className="border hover:bg-white/5 px-5 py-2 mt-5 font-medium cursor-pointer flex items-center justify-center"
                >
                    <FaRegSquarePlus size={23} />
                    <span className="ml-2">Create Blog</span>
                </Link>
            </div>

            <h2 className="text-3xl font-semibold text-center mt-10">Recent Blogs</h2>

            <div className="md:px-20 px-5">
                {isFetchingBlogs ? (
                    <Spinner />
                ) : !blogs?.results ? (
                    <div className="pt-10 px-4">No Blog found</div>
                ) : (
                    <DisplayBlog data={blogs.data.blogs} />
                )}
            </div>
        </ScrollToTop>
    );
};

export default BlogPage;
