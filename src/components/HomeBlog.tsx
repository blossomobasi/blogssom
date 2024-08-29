import { useState } from "react";
import { useBlog } from "../hooks/useBlog";
import clsx from "clsx";

import DisplayBlog from "../ui/DisplayBlog";
import { useCategory } from "../hooks/useCategory";

const HomeBlog = () => {
    const [categories, setCategories] = useState("All");
    const { blogs, isFetchingBlogs, blogError } = useBlog(
        categories === "All" ? undefined : categories
    );
    const { data, error, isLoading } = useCategory();

    if (error) {
        return <div>{error.message}</div>;
    }
    if (blogError) {
        return <div>{blogError.message}</div>;
    }

    return (
        <div className="md:px-20 px-5 py-10 h-full">
            <h2 className="font-semibold text-3xl pb-2">Blog</h2>
            <p className="pb-5">
                Here, we share travel tips, destination guides and stories that inspire your next
                adventure.
            </p>

            {isLoading ? (
                <div className="pt-10 px-4">Loading...</div>
            ) : (
                <div className="flex space-x-10">
                    <span
                        className={clsx("hover:bg-gray-200 py-2 px-4 rounded-md cursor-pointer", {
                            "bg-gray-200": categories === "All",
                        })}
                        onClick={() => setCategories("All")}
                    >
                        All
                    </span>
                    {data?.data.categories
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((category) => (
                            <span
                                key={category._id}
                                className={clsx(
                                    "hover:bg-gray-200 py-2 px-4 rounded-md cursor-pointer",
                                    {
                                        "bg-gray-200": categories === category._id,
                                    }
                                )}
                                onClick={() => setCategories(category._id)}
                            >
                                {category.name}
                            </span>
                        ))}
                </div>
            )}

            {isFetchingBlogs ? (
                <div className="pt-10 px-4">Fetching Blogs...</div>
            ) : !blogs?.results ? (
                <div className="pt-10 px-4">No Blog found</div>
            ) : (
                <DisplayBlog data={blogs.data.blogs} />
            )}
        </div>
    );
};

export default HomeBlog;
