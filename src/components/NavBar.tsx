import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useUser } from "../hooks/useUser";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "../hooks/useLogout";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";
import { useEffect, useState } from "react";
import { TbMenu } from "react-icons/tb";

const NavBar = () => {
    const { user } = useUser();
    const { logout, isLoggingout } = useLogout();
    const [showMobileNav, setShowMobileNav] = useState(false);

    const navData = [
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blogs" },
        { name: "Categories", link: "/category" }, // should have subcategories.
        { name: "Gallery", link: "/gallery" },
    ];

    const mobileScreen = window.innerWidth < 768;

    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showMobileNav]);

    return (
        <header className="lg:px-20 px-5 py-5 fixed z-50 backdrop-blur-md bg-black/40 w-full flex justify-center">
            <div className="flex justify-between items-center text-white w-full max-w-[110rem]">
                <Logo size={mobileScreen ? "sm" : "lg"} />

                {/* Desktop Navigation */}
                <nav className="md:flex hidden">
                    <ul className="flex space-x-8 font-medium">
                        {navData.map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <nav
                    className={clsx(
                        "md:hidden flex flex-col items-center px-5 py-10 absolute top-0 left-0 h-screen bg-white z-50 text-black w-[20rem] transition-transform duration-300",
                        {
                            "transform -translate-x-full": !showMobileNav,
                        }
                    )}
                >
                    <div className="mb-10">
                        <Logo />
                    </div>
                    <ul className="font-medium flex flex-col space-y-5 w-full">
                        {navData.map((item) => (
                            <li key={item.name} className="border-b pb-5 last:border-none">
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Overlay */}
                {showMobileNav && (
                    <div
                        className="fixed top-0 left-0 w-full h-screen bg-black/50 z-40"
                        onClick={() => setShowMobileNav(false)}
                    />
                )}

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
                                "bg-white border text-black hover:font-medium px-5 py-2 cursor-pointer hidden md:flex",
                                {
                                    "opacity-50 cursor-not-allowed": isLoggingout,
                                }
                            )}
                        >
                            {isLoggingout ? <MiniSpinner color="black" /> : <CiLogout size={23} />}
                        </span>
                        <span
                            className="bg-white border text-black hover:font-medium px-2 py-1.5 cursor-pointer md:hidden"
                            onClick={() => setShowMobileNav((prev) => !prev)}
                        >
                            <TbMenu size={25} />
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default NavBar;
