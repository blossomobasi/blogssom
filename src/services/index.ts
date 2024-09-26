import { LoginData, AuthResponse, RegisterData, UserResponse } from "../types/auth";
import { BlogResponse, CreateBlogResponse, SingleBlogResponse } from "../types/blog";
import { CategoryResponse } from "../types/categories";
import { CommentResponse } from "../types/comment";
import $http from "./axiosConfig";

export const LoginApi = async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/login`, loginData);

    return response.data;
};
export const LogoutApi = async (): Promise<void> => await $http.get(`/api/v1/users/logout`);

export const RegisterApi = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/signup`, registerData);

    return response.data;
};

export const ForgotPasswordApi = async (
    email: string
): Promise<{ status: string; message: string }> => {
    const response = await $http.post(`/api/v1/users/forgotPassword`, { email });

    return response.data;
};

export const ResetPasswordApi = async (
    password: string,
    resetToken: string
): Promise<UserResponse> => {
    const response = await $http.patch(`/api/v1/users/resetPassword/${resetToken}`, { password });

    return response.data;
};

// Get User
export const GetUserApi = async (): Promise<UserResponse> => {
    const response = await $http.get(`/api/v1/users/me`);

    return response.data;
};

// Categories
export const GetCategoriesApi = async (): Promise<CategoryResponse> => {
    const response = await $http.get(`/api/v1/categories`);

    return response.data;
};
export const GetCategoryApi = async (categoryId: string): Promise<CategoryResponse> => {
    const response = await $http.get(`/api/v1/categories/${categoryId}`);

    return response.data;
};

// Blogs
export const GetBlogsApi = async (categoryId?: string): Promise<BlogResponse> => {
    const response = await $http.get(`/api/v1/blogs${categoryId ? `?category=${categoryId}` : ""}`);

    return response.data;
};
export const GetMyBlogsApi = async (): Promise<BlogResponse> => {
    const response = await $http.get(`api/v1/blogs/myBlogs`);

    return response.data;
};

export const GetBlogApi = async (blogId: string): Promise<SingleBlogResponse> => {
    const response = await $http.get(`/api/v1/blogs/${blogId}`);

    return response.data;
};
export const LikeBlogApi = async (blogId: string): Promise<SingleBlogResponse> => {
    const response = await $http.patch(`/api/v1/blogs/${blogId}/like`);

    return response.data;
};
export const UnlikeBlogApi = async (blogId: string): Promise<SingleBlogResponse> => {
    const response = await $http.patch(`/api/v1/blogs/${blogId}/unlike`);

    return response.data;
};
export const CreateBlogApi = async (formData: FormData): Promise<CreateBlogResponse> => {
    const response = await $http.post(`/api/v1/blogs`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
export const DeleteBlogApi = async (blogId: string): Promise<void> => {
    await $http.delete(`/api/v1/blogs/${blogId}`);
};

// Comments
export const GetCommentsApi = async (blogId: string): Promise<CommentResponse> => {
    const response = await $http.get(`/api/v1/blogs/${blogId}/comments`);

    return response.data;
};
export const CreateCommentApi = async (
    blogId: string,
    content: string
): Promise<CommentResponse> => {
    const response = await $http.post(`/api/v1/blogs/${blogId}/comments`, { content });

    return response.data;
};
export const LikeCommentApi = async (commentId: string): Promise<CommentResponse> => {
    const response = await $http.patch(`/api/v1/comments/${commentId}/like`);

    return response.data;
};
export const UnlikeCommentApi = async (commentId: string): Promise<CommentResponse> => {
    const response = await $http.patch(`/api/v1/comments/${commentId}/unlike`);

    return response.data;
};
