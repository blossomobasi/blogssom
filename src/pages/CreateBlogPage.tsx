import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ScrollToTop from "../ui/ScrollToTop";
import { useForm } from "react-hook-form";
import { CreateBlog } from "../types/blog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateBlogApi } from "../services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import MiniSpinner from "../ui/MiniSpinner";
import clsx from "clsx";

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
};

const CreateBlogPage = () => {
    const [content, setContent] = useState("");

    const { mutate: CreateBlog, isPending: isCreatingBlog } = useMutation({
        mutationFn: CreateBlogApi,
        onSuccess: () => {
            toast.success("Blog created successfully");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const { register, handleSubmit, formState } = useForm<CreateBlog>();
    const { errors } = formState;

    const onSubmit = (data: CreateBlog) => {
        if (!content) return;

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", content);
        formData.append("imageCover", data.imageCover[0]);

        CreateBlog(formData);
    };

    return (
        <ScrollToTop>
            <div className="md:px-20 px-5">
                <h2 className="text-3xl font-semibold text-center pt-28">Create Blog</h2>
                <form className="flex flex-col space-y-3 py-10" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        id="title"
                        className="border border-gray-300 focus-within:border-gray-500 px-4 py-2 focus-within:outline-none"
                        {...register("title", { required: "Title is required" })}
                    />
                    <span className="text-red-500 text-sm">{errors.title?.message}</span>
                    <input
                        type="text"
                        placeholder="Blog Category"
                        className="border border-gray-300 focus-within:border-gray-500 px-4 py-2 focus-within:outline-none"
                        {...register("category", { required: "Category is required" })}
                    />
                    <span className="text-red-500 text-sm">{errors.category?.message}</span>

                    <ReactQuill
                        modules={modules}
                        placeholder="Write something amazing..."
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e)}
                    />
                    <span className="text-red-500 text-sm">{errors.content?.message}</span>
                    <input
                        type="file"
                        className="file:py-3 file:px-4 file:border-none border rounded-md border-gray-300 w-fit file:font-semibold file:font-serif"
                        id="imageCover"
                        {...register("imageCover", { required: "Cover image is required" })}
                    />
                    <span className="text-red-500 text-sm">{errors.imageCover?.message}</span>

                    <button
                        className={clsx(
                            "bg-black text-white px-5 py-2 rounded mt-5 self-start flex items-center gap-x-2",
                            {
                                "opacity-70 cursor-not-allowed": isCreatingBlog,
                            }
                        )}
                        disabled={isCreatingBlog}
                    >
                        Create Blog {isCreatingBlog && <MiniSpinner />}
                    </button>
                </form>
            </div>
        </ScrollToTop>
    );
};

export default CreateBlogPage;
