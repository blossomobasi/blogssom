import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useUser } from "../hooks/useUser";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "../hooks/useLogout";
import clsx from "clsx";
import MiniSpinner from "../ui/MiniSpinner";
import { useEffect, useState } from "react";
import { TbMenu } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useCategory } from "../hooks/useCategory";
import { LiaAngleDownSolid } from "react-icons/lia";

const NavBar = () => {
    const { user } = useUser();
    const { data, isLoading } = useCategory();
    const { logout, isLoggingout } = useLogout();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const navData = [
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blogs" },
        { name: "Categories" }, // should have subcategories.
        { name: "Gallery", link: "/gallery" },
    ];

    const mobileScreen = window.innerWidth < 768;

    const mobileFirstName = user?.data.user.firstName
        .split(" ")
        .map((name) => name[0])
        .join("");
    const mobileLastName = user?.data.user.lastName
        .split(" ")
        .map((name) => name[0])
        .join("");

    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showMobileNav]);

    return (
        <header className="lg:px-20 px-5 py-5 fixed z-[100] backdrop-blur-md bg-black/40 w-full flex justify-center">
            <div className="flex justify-between items-center text-white w-full max-w-[110rem]">
                <Logo size={mobileScreen ? "sm" : "lg"} />

                {/* Desktop Navigation */}
                <nav className="md:flex hidden">
                    <ul className="flex space-x-8 font-medium">
                        {navData.map((item) =>
                            item.name === "Categories" ? (
                                <li key={item.name} className="relative">
                                    <NavLink
                                        to={item?.link || "#"}
                                        onMouseEnter={() => setShowCategories(true)}
                                        onMouseLeave={() => setShowCategories(false)}
                                        className="flex items-center gap-x-2 h-8"
                                    >
                                        {item.name}
                                        <LiaAngleDownSolid
                                            size={20}
                                            className={clsx("transition-transform duration-300", {
                                                "transform rotate-180": showCategories,
                                            })}
                                        />
                                    </NavLink>

                                    {isLoading && showCategories ? (
                                        <div
                                            className="absolute top-8 bg-white p-5 shadow-lg rounded-md flex flex-col space-y-3"
                                            onMouseEnter={() => setShowCategories(true)}
                                            onMouseLeave={() => setShowCategories(false)}
                                        >
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        data?.data.categories && (
                                            <ul
                                                className={clsx(
                                                    "absolute top-8 bg-white p-5 shadow-lg rounded-md flex flex-col space-y-3",
                                                    {
                                                        hidden: !showCategories,
                                                    }
                                                )}
                                                onMouseEnter={() => setShowCategories(true)}
                                                onMouseLeave={() => setShowCategories(false)}
                                            >
                                                {data?.data.categories.map((category) => (
                                                    <li
                                                        key={category._id}
                                                        className="text-black whitespace-nowrap hover:underline"
                                                    >
                                                        <NavLink to={`/category/${category.name}`}>
                                                            {category.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    )}
                                </li>
                            ) : (
                                <li key={item.name} className="flex items-center">
                                    <NavLink to={item?.link || "#"}>{item.name}</NavLink>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <nav
                    className={clsx(
                        "md:hidden flex flex-col items-center px-5 py-10 absolute top-0 right-0 h-screen bg-white z-50 text-black w-[20rem] transition-transform duration-300",
                        {
                            "transform translate-x-full": !showMobileNav,
                        }
                    )}
                >
                    <div className="mb-10">
                        <Logo />
                    </div>
                    <ul className="font-medium flex flex-col space-y-5 w-full">
                        {navData.map((item) =>
                            item.name === "Categories" ? (
                                <li key={item.name} className="relative border-b pb-4">
                                    <NavLink
                                        to={item?.link || "#"}
                                        className="flex items-center justify-between gap-x-2 h-8"
                                    >
                                        {item.name}
                                        <LiaAngleDownSolid
                                            size={20}
                                            className={clsx("transition-transform duration-300", {
                                                "transform rotate-180": showCategories,
                                            })}
                                            onClick={() => setShowCategories((prev) => !prev)}
                                        />
                                    </NavLink>
                                    {showCategories &&
                                        data?.data.categories.map((category) => (
                                            <li
                                                className="p-3 text-stone-600"
                                                onClick={() => setShowMobileNav(false)}
                                            >
                                                <NavLink to={`/category/${category.name}`}>
                                                    {category.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                </li>
                            ) : (
                                <li
                                    key={item.name}
                                    className="border-b pb-5 last:border-none"
                                    onClick={() => setShowMobileNav(false)}
                                >
                                    <NavLink to={item?.link || "#"}>{item.name}</NavLink>
                                </li>
                            )
                        )}

                        <span
                            onClick={() => logout()}
                            className={clsx(
                                "border bg-black text-white hover:font-medium px-5 py-2 cursor-pointer flex items-center justify-center",
                                {
                                    "opacity-50 cursor-not-allowed": isLoggingout,
                                }
                            )}
                        >
                            {isLoggingout ? (
                                <MiniSpinner color="black" />
                            ) : (
                                <>
                                    Logout
                                    <CiLogout size={23} />
                                </>
                            )}
                        </span>
                    </ul>

                    <span
                        className={clsx(
                            "bg-white rounded-full h-8 w-8 absolute top-5 -left-10 cursor-pointer flex items-center justify-center",
                            {
                                hidden: !showMobileNav,
                            }
                        )}
                        onClick={() => setShowMobileNav(false)}
                    >
                        <IoMdClose size={23} />
                    </span>
                </nav>

                {/* Overlay */}
                {showMobileNav && (
                    <div
                        className="fixed top-0 left-0 w-full h-screen bg-black/50 z-40 md:hidden"
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
                            <figcaption className="md:flex hidden">
                                {user?.data.user.firstName} {user?.data.user.lastName}
                            </figcaption>
                            <figcaption className="md:hidden">
                                {mobileFirstName}
                                {mobileLastName}
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
