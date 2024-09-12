import { useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import DisplayBlog from "../ui/DisplayBlog";
import ScrollToTop from "../ui/ScrollToTop";
import Spinner from "../ui/Spinner";
import Woman_ON_A_Boat from "/images/woman_on_a_boat.jpg";

const MyBlogsPage = () => {
    const navigate = useNavigate();
    const { myBlogs, isFetchingMyBlog, myBlogError } = useBlog();

    if (myBlogError) return <div>{myBlogError.message}</div>;

    return (
        <ScrollToTop>
            <div
                style={{
                    backgroundImage: `url(${Woman_ON_A_Boat})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="h-[70vh] w-full flex flex-col items-center justify-center text-white"
            >
                <h1 className="text-6xl font-extrabold drop-shadow-lg pb-3">BLOG</h1>
                <p className="text-lg font-medium drop-shadow-lg">Travel blog | My Blogs</p>
            </div>

            <h2 className="text-3xl font-semibold text-center mt-10">My Blogs</h2>

            <div className="md:px-20 px-5">
                {isFetchingMyBlog ? (
                    <Spinner />
                ) : !myBlogs?.results ? (
                    <div className="py-10 px-4 text-center">
                        <p className="text-lg text-gray-400 font-medium">
                            You have not created any blog yet.
                        </p>

                        <p className="text-lg text-gray-400 font-medium">
                            Click the button below to create a blog.
                        </p>

                        <button
                            className="mt-5 bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate("/blogs/create")}
                        >
                            Create Blog
                        </button>
                    </div>
                ) : (
                    <DisplayBlog data={myBlogs.data.blogs} />
                )}
            </div>
        </ScrollToTop>
    );
};

export default MyBlogsPage;
