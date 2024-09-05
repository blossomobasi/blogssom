import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateCommentApi, GetCommentsApi, LikeCommentApi, UnlikeCommentApi } from "../services"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export const useComment = (blogId: string) => {
    const queryClient = useQueryClient()

    const { data: comments, isLoading: isCommentsLoading } = useQuery({
        queryKey: ["comments", blogId],
        queryFn: () => GetCommentsApi(blogId)
    })

    const { mutate: createComment, isPending: isCreatingComment } = useMutation({
        mutationFn: (content: string) => CreateCommentApi(blogId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", blogId]
            })
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage)
        }

    })

    const { mutate: likeComment } = useMutation({
        mutationFn: (commentId: string) => LikeCommentApi(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", blogId]
            })
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage)
        }
    })
    const { mutate: unlikeComment } = useMutation({
        mutationFn: (commentId: string) => UnlikeCommentApi(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", blogId]
            })
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage)
        }
    })

    return { createComment, isCreatingComment, comments, isCommentsLoading, likeComment, unlikeComment }
}

