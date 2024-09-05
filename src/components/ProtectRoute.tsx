import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading, error } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) navigate("/login");
    }, [user, isLoading, navigate]);

    if (isLoading) return <Spinner />;

    if (error) {
        const err = error as AxiosError;
        const errorMessage = (err.response?.data as { message: string }).message;

        toast.error(errorMessage);
    }

    return <div>{children}</div>;
};

export default ProtectRoute;
