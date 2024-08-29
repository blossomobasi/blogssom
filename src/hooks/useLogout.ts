import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isPending: isLoggingout } = useMutation({
        mutationFn: LogoutApi,
        onSuccess: () => {
            toast.success("Logged out successfully!");
            navigate('/login');
            queryClient.clear();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return { logout, isLoggingout };
}