import { Category } from "./categories";

export type Blog = {
    _id: string;
    title: string;
    content: string;
    imageCover: string;
    readingTime: number;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
    };
    category: Category;
    comments: string[];
    likes: string[];
    views: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type BlogResponse = ApiResponse<{ blogs: Blog[] }>;