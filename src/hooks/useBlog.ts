import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteBlogApi, GetBlogApi, GetBlogsApi, GetMyBlogsApi } from "../services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useBlog = (categoryId?: string, blogId?: string) => {
    const queryClient = useQueryClient();
    const {
        data: blogs,
        isLoading: isFetchingBlogs,
        error: blogError,
    } = useQuery({
        queryKey: ["blogs", categoryId],
        queryFn: () => GetBlogsApi(categoryId),
    });

    const {
        data: blog,
        isLoading: isFetchingBlog,
        error,
    } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => GetBlogApi(blogId as string),
    });

    const {
        data: myBlogs,
        isLoading: isFetchingMyBlog,
        error: myBlogError,
    } = useQuery({
        queryKey: ["blog"],
        queryFn: GetMyBlogsApi,
    });

    const { mutate: deleteBlog, isPending: isDeletingBlog } = useMutation({
        mutationFn: DeleteBlogApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
            toast.success("Blog deleted successfully");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    return {
        blogs,
        myBlogs,
        blog,
        deleteBlog,
        isDeletingBlog,
        isFetchingBlog,
        isFetchingBlogs,
        isFetchingMyBlog,
        blogError,
        myBlogError,
        error,
    };
};
