import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";
import { useAuth } from "../hooks/useAuth";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, formState } = useForm<{ password: string }>();
    const { errors } = formState;
    const { resetPassword, isReseting } = useAuth();
    const [showPassword, setShowPassword] = useState(true);

    const resetToken = searchParams.get("resetToken");

    const onSubmit = (data: { password: string }) => {
        if (isReseting) return;

        resetPassword({ password: data.password, resetToken: resetToken || "" });
    };

    return (
        <AuthLayout>
            <div className="w-[30rem]">
                <div>
                    <h1 className="text-4xl mb-5 font-bold">Reset Password</h1>
                    <p className="mb-8 text-gray-600">Update your password</p>
                </div>

                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="border flex items-center focus-within:border-black">
                        <input
                            type={showPassword ? "password" : "text"}
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                            className="px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                            placeholder="Password"
                        />
                        <span
                            onClick={() => setShowPassword((show) => !show)}
                            className="px-3 cursor-pointer"
                        >
                            {showPassword ? (
                                <FaRegEyeSlash size={25} />
                            ) : (
                                <MdOutlineRemoveRedEye size={25} />
                            )}
                        </span>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                    <button
                        className={clsx(
                            "bg-black text-white py-3 font-semibold flex items-center justify-center",
                            {
                                "cursor-not-allowed opacity-60": isReseting,
                            }
                        )}
                    >
                        {isReseting ? <MiniSpinner /> : "Submit"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
