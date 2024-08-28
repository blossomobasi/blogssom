import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "../services";
import { toast } from "react-toastify";
import { LoginData } from "../types/auth";
import clsx from "clsx";
import { AxiosError } from "axios";

const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm<LoginData>();
    const { errors } = formState;
    const navigate = useNavigate();

    const { mutate: Login, isPending: isLoggingIn } = useMutation({
        mutationFn: LoginApi,
        onSuccess: () => {
            toast.success("Login successful");
            navigate("/");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const onSubmit = (data: LoginData) => {
        Login(data);
    };

    return (
        <AuthLayout>
            <div className="w-[30rem]">
                <div>
                    <h1 className="text-4xl mb-5 font-bold">Login</h1>
                    <p className="mb-8 text-gray-600">
                        Don't have an account yet?{" "}
                        <Link to="/register" className="text-black hover:underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div>

                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: /^\S+@\S+$/i,
                        })}
                        className="border px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        className="border px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}

                    <div className="flex items-center justify-between py-3">
                        <div className="flex space-x-3">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe" className="text-gray=-600">
                                Remember me
                            </label>
                        </div>

                        <Link to="/forgot-password" className="font-semibold">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        className={clsx("bg-black text-white py-3 font-semibold", {
                            "cursor-not-allowed opacity-60": isLoggingIn,
                        })}
                    >
                        Login
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
