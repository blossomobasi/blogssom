import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="text-2xl font-semibold">
            <span>✈</span>Blogssom <span>🧳</span>
        </Link>
    );
};

export default Logo;
