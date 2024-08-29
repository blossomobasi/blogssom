import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { RegisterData } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { RegisterApi } from "../services";
import { toast } from "react-toastify";
import clsx from "clsx";
import { AxiosError } from "axios";
import MiniSpinner from "../ui/MiniSpinner";

const RegisterPage = () => {
    const { register, handleSubmit, formState } = useForm<RegisterData>();
    const { errors } = formState;
    const navigate = useNavigate();

    const { mutate: registerUser, isPending: isRegistering } = useMutation({
        mutationFn: RegisterApi,
        onSuccess: () => {
            toast.success("Registeration successful");
            navigate("/");
        },
        onError: (err: AxiosError) => {
            const errorMessage = (err.response?.data as { message: string }).message;
            toast.error(errorMessage);
        },
    });

    const onSubmit = (data: RegisterData) => {
        registerUser(data);
    };
    return (
        <AuthLayout>
            <div className="w-[30rem]">
                <div>
                    <h1 className="text-4xl mb-5 font-bold">Register</h1>
                    <p className="mb-8 text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-black hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </div>

                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", { required: "First Name is required" })}
                        className="border px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                        placeholder="First Name"
                    />
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                    )}
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName", { required: "Last Name is required" })}
                        className="border px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                        placeholder="Last Name"
                    />
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                    )}
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

                    <div className="flex space-x-3 py-2">
                        <input type="checkbox" id="agree" />
                        <label htmlFor="agree" className="text-gray-600">
                            I agree with
                            <span className="font-semibold"> Privacy Policy </span>
                            and
                            <span className="font-semibold"> Terms of Use</span>
                        </label>
                    </div>
                    <button
                        className={clsx(
                            "bg-black text-white py-3 font-semibold flex items-center justify-center",
                            {
                                "cursor-not-allowed opacity-60": isRegistering,
                            }
                        )}
                    >
                        {isRegistering ? <MiniSpinner /> : "Register"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
