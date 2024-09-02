import { useQuery } from "@tanstack/react-query"
import { GetBlogApi, GetBlogsApi } from "../services"

export const useBlog = (categoryId?: string, blogId?: string) => {
    const { data: blogs, isLoading: isFetchingBlogs, error: blogError } = useQuery({
        queryKey: ["blogs", categoryId],
        queryFn: () => GetBlogsApi(categoryId),
    })

    const { data: blog, isLoading: isFetchingBlog, error } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => GetBlogApi(blogId as string),
    })

    return { blogs, blog, isFetchingBlog, isFetchingBlogs, blogError, error }
}