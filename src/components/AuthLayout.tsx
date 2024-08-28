import AuthImage from "/images/auth_image.jpg";
import Logo from "./Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-5 md:h-screen">
            <div className="md:w-1/2 md:h-full h-[20rem] relative">
                <img src={AuthImage} alt="Auth Image" className="h-full w-full object-cover" />
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-white">
                    <Logo />
                </div>
            </div>

            <div className="md:w-1/2 lg:p-10 p-5 h-full overflow-y-auto flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
