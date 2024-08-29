export type Blog = {
    _id: string;
    title: string;
    content: string;
    imageCover: string;
    readingTime: number;
    author: string;
    category: string;
    comments: string[];
    likes: string[];
    views: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type BlogResponse = ApiResponse<{ blogs: Blog[] }>;