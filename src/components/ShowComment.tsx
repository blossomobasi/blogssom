import { useNavigate } from "react-router-dom";
import { Blog } from "../types/blog";
import { useUser } from "../hooks/useUser";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { useComment } from "../hooks/useComment";
import MiniSpinner from "../ui/MiniSpinner";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

type ShowCommentProps = {
    onShowModal: (id: string) => void;
    blog: Blog;
};

const ShowComment = ({ onShowModal, blog }: ShowCommentProps) => {
    const { user } = useUser();
    const {
        isCommentsLoading,
        isCreatingComment,
        comments,
        createComment,
        likeComment,
        unlikeComment,
    } = useComment(blog._id);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const hasAlreadyLikedComment = (commentId: string) => {
        const comment = comments?.data.comments.find((comment) => comment._id === commentId);
        if (!comment || !user) return false;

        return comment?.likes.includes(user?.data.user._id);
    };

    function handleLike(commentId: string) {
        if (!user) {
            navigate("/login");
        }
        likeComment(commentId);
    }

    function handleUnlike(commentId: string) {
        unlikeComment(commentId);
    }

    function handleAddComment(e: React.FormEvent) {
        e.preventDefault();
        if (!comment) return;

        createComment(comment);
        setComment("");
    }

    return (
        <div className="flex justify-center">
            <div
                className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-40"
                onClick={() => onShowModal("")}
            />

            <div
                className={clsx(
                    "bg-white max-w-[110rem] p-5 mt-5 rounded-lg border shadow-xl absolute left-1/2 -translate-x-1/2 w-full overflow-y-auto z-50",
                    {
                        "h-[40rem]": comments?.results,
                        "h-fit": !comments?.results,
                    }
                )}
            >
                <div className="flex justify-between md:flex-row flex-col items-start gap-x-5 pt-6">
                    <button
                        onClick={() => onShowModal("")}
                        className="text-white absolute top-0 right-0 bg-red-500 p-1"
                    >
                        <IoMdClose size={25} />
                    </button>

                    <h1 className="text-lg font-semibold">Comments</h1>

                    {user && (
                        <form
                            className="flex md:flex-row flex-col items-start gap-3"
                            onSubmit={(e) => handleAddComment(e)}
                        >
                            <textarea
                                cols={30}
                                rows={3}
                                placeholder="Write a comment"
                                autoFocus
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border border-gray-500 p-1 rounded-md focus-within:outline-none w-full"
                            />

                            <button
                                className={clsx(
                                    "bg-black text-white py-2 px-3 rounded-md flex items-center gap-x-3 whitespace-nowrap",
                                    {
                                        "cursor-not-allowed opacity-60": isCreatingComment,
                                    }
                                )}
                            >
                                Add Comment {isCreatingComment && <MiniSpinner />}
                            </button>
                        </form>
                    )}
                </div>
                {isCommentsLoading ? (
                    <div className="flex justify-center py-10">
                        <MiniSpinner color="black" />
                    </div>
                ) : !comments?.results ? (
                    <div className="py-5 text-center text-gray-500">No Comment Found</div>
                ) : (
                    <div className="mt-5 flex md:flex-row flex-col gap-5">
                        <div className="w-full">
                            <img src={blog.imageCover} alt={blog.title} />
                        </div>
                        <div className="w-full">
                            {comments?.data?.comments.map((comment) => (
                                <div key={comment._id} className="py-3">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={comment.user.avatar}
                                            alt={comment.user.firstName}
                                            className="w-10 h-10 rounded-full self-start"
                                        />
                                        <div>
                                            <p className="text-gray-600 font-medium text-lg">
                                                {comment.user.firstName} {comment.user.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {comment.content}
                                            </p>

                                            <span className="text-gray-500 mt-2 flex items-center gap-2 font-medium text-lg">
                                                {!hasAlreadyLikedComment(comment._id) ? (
                                                    <FaRegHeart
                                                        size={20}
                                                        onClick={() => handleLike(comment._id)}
                                                        className="cursor-pointer"
                                                    />
                                                ) : (
                                                    <FaHeart
                                                        size={20}
                                                        onClick={() => handleUnlike(comment._id)}
                                                        className="text-red-500 cursor-pointer"
                                                    />
                                                )}
                                                {comment.likes.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowComment;
