import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";
import { useAuth } from "../hooks/useAuth";

const ForgotPasswordPage = () => {
    const { register, handleSubmit, formState } = useForm<{ email: string }>();
    const { errors } = formState;
    const { forgotPassword, isPending } = useAuth();

    const onSubmit = (data: { email: string }) => {
        if (isPending) return;

        forgotPassword(data.email);
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
                    <button
                        className={clsx(
                            "bg-black text-white py-3 font-semibold flex items-center justify-center",
                            {
                                "cursor-not-allowed opacity-60": isPending,
                            }
                        )}
                    >
                        {isPending ? <MiniSpinner /> : "Submit"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
