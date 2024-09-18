import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordApi, ResetPasswordApi } from "../services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: ForgotPasswordApi,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/reset-password");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const { mutate: resetPassword, isPending: isReseting } = useMutation({
        mutationFn: ({ password, resetToken }: { password: string; resetToken: string }) =>
            ResetPasswordApi(password, resetToken),
        onSuccess: () => {
            toast.success("Password reset successfully");
            navigate("/login");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    return { forgotPassword, resetPassword, isPending, isReseting };
};
