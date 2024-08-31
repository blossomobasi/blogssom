import AvailableArticle from "../components/AvailableArticle";
import HomeBlog from "../components/HomeBlog";
import HomeMain from "../components/HomeMain";
import ScrollToTop from "../ui/ScrollToTop";

const HomePage = () => {
    return (
        <ScrollToTop>
            <HomeMain />
            <HomeBlog />
            <AvailableArticle />
        </ScrollToTop>
    );
};

export default HomePage;
