import { Link, useLocation, useNavigate } from "react-router-dom";
import { Blog } from "../types/blog";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { formatDate, truncateText } from "../utils";
import { IoMdArrowForward } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeBlogApi, UnlikeBlogApi } from "../services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import ShowComment from "../components/ShowComment";

import { HiDotsVertical } from "react-icons/hi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useBlog } from "../hooks/useBlog";

type DisplayBlogProps = {
    data: Blog[];
};

const DisplayBlog = ({ data }: DisplayBlogProps) => {
    const [showCommentModal, setShowCommentModal] = useState("");
    const [immediateLikeChange, setImmediateLikeChange] = useState<{ [key: string]: boolean }>({});
    const [showOption, setShowOption] = useState(false);
    const { user } = useUser();
    const { deleteBlog, isDeletingBlog } = useBlog();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const queryClient = useQueryClient();

    const { mutate: LikeBlog } = useMutation({
        mutationFn: LikeBlogApi,
        onMutate: async (blogId: string) => {
            // Optimistic UI update
            setImmediateLikeChange((prevState) => ({
                ...prevState,
                [blogId]: true,
            }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (err: AxiosError) => {
            // Revert the optimistic update
            setImmediateLikeChange((prevState) => ({
                ...prevState,
                [err.request.responseURL.split("/").pop()!]: false,
            }));
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const { mutate: UnlikeBlog } = useMutation({
        mutationFn: UnlikeBlogApi,
        onMutate: async (blogId: string) => {
            // Optimistic UI update
            setImmediateLikeChange((prevState) => ({
                ...prevState,
                [blogId]: false,
            }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (err: AxiosError) => {
            // Revert the optimistic update
            setImmediateLikeChange((prevState) => ({
                ...prevState,
                [err.request.responseURL.split("/").pop()!]: true,
            }));
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
        } else {
            LikeBlog(blogId);
        }
    }

    function handleUnlike(blogId: string) {
        UnlikeBlog(blogId);
    }

    function handleShowComment(blogId: string) {
        if (!user) {
            toast.error("Login to get access!");
            navigate("/login");
        } else {
            setShowCommentModal(blogId);
        }
    }
    function handleBlogDelete(blogId: string) {
        if (isDeletingBlog) return;

        deleteBlog(blogId);
    }

    useEffect(() => {
        if (pathname === "/my-blogs") {
            setShowOption(true);
        }
    }, [showOption, pathname]);

    return (
        <div className="flex justify-center relative">
            <div className="py-10 grid lg:grid-cols-3 sm:grid-cols-2 gap-5 max-w-[110rem] w-full">
                {data.map((blog) => {
                    const isLiked = immediateLikeChange[blog._id] ?? hasAlreadyLikedBlog(blog._id);

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
                            <div className="text-gray-600 text-sm pb-2">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: truncateText(blog.content, 20),
                                    }}
                                />
                            </div>

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
                                        {!isLiked ? (
                                            <FaRegHeart
                                                size={20}
                                                onClick={() => handleLike(blog._id)}
                                                className="cursor-pointer"
                                            />
                                        ) : (
                                            <FaHeart
                                                size={20}
                                                onClick={() => handleUnlike(blog._id)}
                                                className="text-red-500 cursor-pointer"
                                            />
                                        )}
                                        <span>
                                            {blog.likes.length === 0 ? "" : blog.likes.length}
                                        </span>
                                    </span>
                                    <span
                                        className="flex items-center space-x-2"
                                        onClick={() => handleShowComment(blog._id)}
                                    >
                                        <FaRegComment size={20} className="cursor-pointer" />
                                        <span>
                                            {blog.comments.length === 0 ? "" : blog.comments.length}
                                        </span>
                                    </span>
                                    {showOption && (
                                        <div className="text-right">
                                            <Menu>
                                                <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 text-sm/6 font-semibold focus:outline-none text-gray-800">
                                                    <HiDotsVertical className="size-5" />
                                                </MenuButton>

                                                <MenuItems
                                                    transition
                                                    anchor="bottom end"
                                                    className="w-52 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                                >
                                                    <MenuItem>
                                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                                                            <PencilIcon className="size-4 fill-black/70" />
                                                            Edit
                                                            {/* <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                                                            ⌘E
                                                        </kbd> */}
                                                        </button>
                                                    </MenuItem>
                                                    <div className="my-1 h-px bg-black/5" />
                                                    <MenuItem>
                                                        <button
                                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                            onClick={() =>
                                                                handleBlogDelete(blog._id)
                                                            }
                                                        >
                                                            <TrashIcon className="size-4 fill-black/70" />
                                                            Delete
                                                            {/* <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                                                            ⌘D
                                                        </kbd> */}
                                                        </button>
                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {showCommentModal === blog._id && (
                                <ShowComment onShowModal={setShowCommentModal} blog={blog} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayBlog;
