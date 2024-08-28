import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const NavBar = () => {
    const navData = [
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Categories", link: "/category" }, // should have subcategories
        { name: "Gallery", link: "/gallery" },
    ];
    return (
        <header className="flex justify-between items-center md:px-20 px-5 py-5 fixed w-full text-white z-50">
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
        </header>
    );
};

export default NavBar;
