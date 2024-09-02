import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../types/blog";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { formatDate } from "../utils";
import { IoMdArrowForward } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeBlogApi, UnlikeBlogApi } from "../services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUser } from "../hooks/useUser";

type DisplayBlogProps = {
    data: Blog[];
};

const DisplayBlog = ({ data }: DisplayBlogProps) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: LikeBlog } = useMutation({
        mutationFn: LikeBlogApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            });
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const { mutate: UnlikeBlog } = useMutation({
        mutationFn: UnlikeBlogApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            });
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const hasAlreadyLikedBlog = (blogId: string) => {
        const blog = data.find((blog) => blog._id === blogId);
        if (!blog || !user) return false;

        return blog.likes.includes(user.data.user._id);
    };

    function handleLike(blogId: string) {
        if (!user) {
            navigate("/login");
        }
        LikeBlog(blogId);
    }

    function handleUnlike(blogId: string) {
        UnlikeBlog(blogId);
    }

    return (
        <div className="flex justify-center">
            <div className="py-10 grid lg:grid-cols-3 sm:grid-cols-2 gap-5 max-w-[110rem] w-full">
                {data.map((blog) => {
                    return (
                        <div key={blog._id} className="py-5">
                            <div
                                className="h-[15rem] relative cursor-pointer"
                                onClick={() => navigate(`/blogs/${blog._id}`)}
                            >
                                <img
                                    src={blog.imageCover}
                                    alt={blog.title}
                                    className="h-full w-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
                                />
                                <span className="absolute top-3 left-3 py-2 px-4 rounded-full bg-gray-500 text-white">
                                    {blog.category.name}
                                </span>
                            </div>

                            <p className="py-3 text-gray-600 text-sm">
                                {formatDate(blog.createdAt)} &bull; {blog.readingTime} min read
                            </p>

                            <Link
                                to={`/blogs/${blog._id}`}
                                className="text-lg font-medium pb-2 hover:underline flex justify-between group"
                                title={blog.title}
                            >
                                <span>{blog.title}</span>
                                <span>
                                    <IoMdArrowForward size={25} className="-rotate-45" />
                                </span>
                            </Link>
                            <p className="text-gray-600 text-sm pb-2">
                                {blog.content.substring(0, 100)}...
                            </p>

                            <div className="flex items-center justify-between">
                                <figure className="flex items-center space-x-2 pt-2">
                                    <img
                                        src={blog.author.avatar}
                                        alt={blog.author.firstName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <figcaption className="text-sm">
                                        {blog.author.firstName} {blog.author.lastName}
                                    </figcaption>
                                </figure>

                                <div className="flex items-center space-x-5 text-gray-600">
                                    <span className="flex items-center space-x-2">
                                        {!hasAlreadyLikedBlog(blog._id) ? (
                                            <FaRegHeart
                                                size={20}
                                                onClick={() => handleLike(blog._id)}
                                            />
                                        ) : (
                                            <FaHeart
                                                size={20}
                                                onClick={() => handleUnlike(blog._id)}
                                                className="text-red-500"
                                            />
                                        )}
                                        <span>
                                            {blog.likes.length === 0 ? "" : blog.likes.length}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-2">
                                        <FaRegComment size={20} />
                                        <span>
                                            {blog.comments.length === 0 ? "" : blog.comments.length}
                                        </span>
                                    </span>
                                    {/* <span className="flex items-center space-x-2">
                                        <IoEyeOutline size={25} />
                                        <span>
                                            {blog.views.length === 0 ? "" : blog.views.length}
                                        </span>
                                    </span> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayBlog;
