import { useQuery } from "@tanstack/react-query"
import { GetBlogsApi } from "../services"

export const useBlog = (categoryId?: string) => {
    const { data: blogs, isLoading: isFetchingBlogs, error: blogError } = useQuery({
        queryKey: ["blogs", categoryId],
        queryFn: () => GetBlogsApi(categoryId),
    })

    return { blogs, isFetchingBlogs, blogError }
}