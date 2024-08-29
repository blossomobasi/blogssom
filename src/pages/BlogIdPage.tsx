import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import Spinner from "../ui/Spinner";
import { FaArrowLeft } from "react-icons/fa";

const BlogIdPage = () => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const { blog, isFetchingBlog, error } = useBlog(undefined, blogId);

    if (isFetchingBlog) return <Spinner />;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="md:px-20 px-5 pt-36">
            <div className="p-2 w-fit hover:bg-gray-100 cursor-pointer">
                <FaArrowLeft size={25} onClick={() => navigate(-1)} />
            </div>

            <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-semibold">
                {blog?.data.blog.title}
            </h1>
            <img
                className="w-full pt-5"
                src={blog?.data.blog.imageCover}
                alt={blog?.data.blog.title}
            />
            <p className="pt-5">{blog?.data.blog.content}</p>
        </div>
    );
};

export default BlogIdPage;
