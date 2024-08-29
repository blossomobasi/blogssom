import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../types/blog";

type DisplayBlogProps = {
    data: Blog[];
};

const DisplayBlog = ({ data }: DisplayBlogProps) => {
    const navigate = useNavigate();
    return (
        <div className="py-10 grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
            {data.map((blog) => (
                <div key={blog._id} className="py-5">
                    <div
                        className="h-[15rem] relative cursor-pointer"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                    >
                        <img
                            src={blog.imageCover}
                            alt={blog.title}
                            className="h-full w-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
                        />
                        <span className="absolute top-3 left-3 py-2 px-4 rounded-full bg-gray-500 text-white">
                            {blog.category.name}
                        </span>
                    </div>

                    <p className="py-3 text-gray-600 text-sm">
                        {blog.createdAt} &bull; {blog.readingTime} min read
                    </p>

                    <Link
                        to={`/blogs/${blog._id}`}
                        className="text-lg font-medium pb-2 hover:underline"
                    >
                        {blog.title}
                    </Link>
                    <p className="text-gray-600 text-sm pb-2">
                        {blog.content.substring(0, 100)}...
                    </p>

                    <figure className="flex items-center space-x-2 pt-2">
                        <img
                            src={blog.author.avatar}
                            alt={blog.author.firstName}
                            className="w-10 h-10 rounded-full"
                        />
                        <figcaption className="text-sm">
                            {blog.author.firstName} {blog.author.lastName}
                        </figcaption>
                    </figure>
                </div>
            ))}
        </div>
    );
};

export default DisplayBlog;
