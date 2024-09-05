import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateCommentApi, GetCommentsApi } from "../services"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export const useComment = (blogId: string) => {
    const queryClient = useQueryClient()

    const { data: comments, isLoading: isCommentsLoading } = useQuery({
        queryKey: ["comments", blogId],
        queryFn: () => GetCommentsApi(blogId)
    })

    const { mutate: createComment, isPending: isCreatingComment } = useMutation({
        mutationFn: (comment: string) => CreateCommentApi(blogId, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blog", blogId]
            })
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage)
        }

    })

    return { createComment, isCreatingComment, comments, isCommentsLoading }
}

