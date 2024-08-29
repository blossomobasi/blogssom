import { useQuery } from "@tanstack/react-query"
import { GetUserApi } from "../services"

export const useUser = () => {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: GetUserApi,
    })

    return { user, isLoading, error }
}