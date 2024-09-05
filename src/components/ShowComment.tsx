import { useNavigate } from "react-router-dom";
import { Blog } from "../types/blog";
import { useUser } from "../hooks/useUser";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { useComment } from "../hooks/useComment";
import MiniSpinner from "../ui/MiniSpinner";
import { FaRegHeart } from "react-icons/fa";

type ShowCommentProps = {
    onShowModal: (id: string) => void;
    blog: Blog;
};

const ShowComment = ({ onShowModal, blog }: ShowCommentProps) => {
    const { user } = useUser();
    const { isCommentsLoading, comments } = useComment(blog._id);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div
                className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-40"
                onClick={() => onShowModal("")}
            />

            <div
                className={clsx(
                    "bg-white p-5 mt-5 rounded-lg border shadow-xl absolute left-1/2 -translate-x-1/2 w-full overflow-y-auto z-50",
                    {
                        "h-[40rem]": comments?.results,
                        "h-fit": !comments?.results,
                    }
                )}
            >
                <div className="flex justify-between items-center space-x-5 pt-6">
                    <button
                        onClick={() => onShowModal("")}
                        className="text-white absolute top-0 right-0 bg-red-500 p-1"
                    >
                        <IoMdClose size={25} />
                    </button>

                    <h1 className="text-lg font-semibold">Comments</h1>

                    {user && (
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                            onClick={() => navigate(`/blogs/${blog._id}/comment`)}
                        >
                            Add Comment
                        </button>
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
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-gray-600 font-medium text-lg">
                                                {comment.user.firstName} {comment.user.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {comment.content}
                                            </p>

                                            <span className="text-gray-500 mt-5">
                                                <FaRegHeart />
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
