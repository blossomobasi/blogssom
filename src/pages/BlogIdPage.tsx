import { useParams } from "react-router-dom";

const BlogIdPage = () => {
    const { blogId } = useParams();
    return <div>Blog ID: {blogId}</div>;
};

export default BlogIdPage;
