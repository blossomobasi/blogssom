import { Blog } from "./blog";

export type Comment = {
    _id: string;
    content: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
    };
    blog: Blog;
    likes: string[];
    createdAt: string;
    updatedAt: string;
}

export type CommentResponse = ApiResponse<{ comments: Comment[] }>