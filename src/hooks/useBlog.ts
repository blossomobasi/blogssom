import { useQuery } from "@tanstack/react-query";
import { GetBlogApi, GetBlogsApi, GetMyBlogsApi } from "../services";

export const useBlog = (categoryId?: string, blogId?: string) => {
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

    return {
        blogs,
        myBlogs,
        blog,
        isFetchingBlog,
        isFetchingBlogs,
        isFetchingMyBlog,
        blogError,
        myBlogError,
        error,
    };
};
