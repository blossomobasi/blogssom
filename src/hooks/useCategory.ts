import { useQuery } from "@tanstack/react-query";
import { GetCategoriesApi } from "../services";

export const useCategory = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: GetCategoriesApi,
    });

    return { data, error, isLoading };
}