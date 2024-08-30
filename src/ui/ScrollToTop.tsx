import { useEffect } from "react";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // return <>{children}</>;
    return children;
};

export default ScrollToTop;
