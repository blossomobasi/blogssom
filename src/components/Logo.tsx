import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ size = "lg" }: { size?: "lg" | "sm" }) => {
    return (
        <Link
            to="/"
            className={clsx("xl font-semibold", {
                "text-2xl": size === "lg",
                "text-xl": size === "sm",
            })}
        >
            <span>✈</span>Blogssom <span>🧳</span>
        </Link>
    );
};

export default Logo;
