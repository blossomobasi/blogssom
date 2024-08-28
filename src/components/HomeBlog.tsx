import { useQuery } from "@tanstack/react-query";
import { GetCategoriesApi } from "../services";
import { useState } from "react";
import clsx from "clsx";

const HomeBlog = () => {
    const [categories, setCategories] = useState("All");
    const { data, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: GetCategoriesApi,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="md:px-20 px-5 py-10">
            <h2 className="font-semibold text-3xl pb-2">Blog</h2>
            <p className="pb-5">
                Here, we share travel tips, destination guides and stories that inspire your next
                adventure.
            </p>

            <div className="flex space-x-10">
                {data?.data.categories
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
                        <span
                            key={category._id}
                            className={clsx(
                                "hover:bg-gray-200 py-2 px-4 rounded-md cursor-pointer",
                                {
                                    "bg-gray-200": categories === category.name,
                                }
                            )}
                            onClick={() => setCategories(category.name)}
                        >
                            {category.name}
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default HomeBlog;
