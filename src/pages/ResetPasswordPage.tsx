import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";
import { useAuth } from "../hooks/useAuth";

const ResetPasswordPage = () => {
    const { register, handleSubmit, formState } = useForm<{ password: string }>();
    const { errors } = formState;
    const { resetPassword, isReseting } = useAuth();
    // Get resetToken from the url
    // http://localhost:5000/api/v1/users/resetPassword/46cdf4c665e8356b34eef831733b00f45d3358cbb8ea7a78436baabf8b24cf6a
    const resetToken = window.location.pathname.split("/")[3];
    console.log(resetToken);

    const onSubmit = (data: { password: string }) => {
        if (isReseting) return;

        resetPassword({ password: data.password, resetToken });
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
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: /^\S+@\S+$/i,
                        })}
                        className="border px-2 py-3 w-full placeholder:text-gray-600 focus-within:border-black focus-within:outline-none"
                        placeholder="Password"
                    />
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
