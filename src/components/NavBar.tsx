import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const NavBar = () => {
    const navData = [
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Categories", link: "/category" }, // should have subcategories
        { name: "Gallery", link: "/gallery" },
    ];
    return (
        <header className="flex justify-between items-center md:px-20 px-5 py-5 fixed w-full text-white z-50 backdrop-blur-md">
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
        </header>
    );
};

export default NavBar;
