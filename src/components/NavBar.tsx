import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useUser } from "../hooks/useUser";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "../hooks/useLogout";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";

const NavBar = () => {
    const { user } = useUser();
    const { logout, isLoggingout } = useLogout();

    const navData = [
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blogs" },
        { name: "Categories", link: "/category" }, // should have subcategories
        { name: "Gallery", link: "/gallery" },
    ];
    return (
        <header className="flex justify-between items-center md:px-20 px-5 py-5 fixed w-full text-white z-50 backdrop-blur-md bg-black/40">
            <Logo />

            <nav>
                <ul className="flex space-x-8 font-medium">
                    {navData.map((item) => (
                        <li key={item.name}>
                            <NavLink to={item.link}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {!user?.data.user ? (
                <div className="flex space-x-3">
                    <Link
                        to="/login"
                        className="text-white border hover:bg-white hover:font-medium hover:text-black px-5 py-2 transition-colors duration-300"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white border text-black hover:font-medium px-5 py-2"
                    >
                        Sign Up
                    </Link>
                </div>
            ) : (
                <div className="flex space-x-3">
                    <figure className="flex items-center space-x-2">
                        <img
                            src={user?.data.user.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <figcaption>
                            {user?.data.user.firstName} {user?.data.user.lastName}
                        </figcaption>
                    </figure>

                    <span
                        onClick={() => logout()}
                        className={clsx(
                            "bg-white border text-black hover:font-medium px-5 py-2 cursor-pointer",
                            {
                                "opacity-50 cursor-not-allowed": isLoggingout,
                            }
                        )}
                    >
                        {isLoggingout ? <MiniSpinner color="black" /> : <CiLogout size={23} />}
                    </span>
                </div>
            )}
        </header>
    );
};

export default NavBar;
