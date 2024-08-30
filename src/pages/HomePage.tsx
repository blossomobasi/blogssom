import HomeBlog from "../components/HomeBlog";
import HomeMain from "../components/HomeMain";
import ScrollToTop from "../ui/ScrollToTop";

const HomePage = () => {
    return (
        <ScrollToTop>
            <HomeMain />
            <HomeBlog />
        </ScrollToTop>
    );
};

export default HomePage;
