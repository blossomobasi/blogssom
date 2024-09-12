import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import Spinner from "../ui/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import ScrollToTop from "../ui/ScrollToTop";
import DisplayBlog from "../ui/DisplayBlog";

const BlogIdPage = () => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const { blog, blogs, isFetchingBlogs, blogError, isFetchingBlog, error } = useBlog(
        undefined,
        blogId
    );

    if (isFetchingBlog) return <Spinner />;
    if (error) return <div>{error.message}</div>;
    if (blogError) return <div>{blogError.message}</div>;

    return (
        <ScrollToTop>
            <section>
                <div className="md:px-20 px-5 pt-36">
                    <div className="p-2 w-fit hover:bg-gray-100 cursor-pointer">
                        <FaArrowLeft size={25} onClick={() => navigate(-1)} />
                    </div>

                    <h1 className="text-center pb-10 pt-5 lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-semibold">
                        {blog?.data.blog.title}
                    </h1>
                    <img
                        className="w-full pt-5"
                        src={blog?.data.blog.imageCover}
                        alt={blog?.data.blog.title}
                    />
                    <div className="pt-5">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: blog?.data.blog.content || "",
                            }}
                        />
                    </div>
                </div>

                <div className="md:px-20 px-5">
                    {isFetchingBlogs ? (
                        <Spinner />
                    ) : !blogs?.results ? (
                        <div className="pt-10 px-4">No Blog found</div>
                    ) : (
                        <DisplayBlog data={blogs.data.blogs} />
                    )}
                </div>
            </section>
        </ScrollToTop>
    );
};

export default BlogIdPage;
