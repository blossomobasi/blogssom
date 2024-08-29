import { LoginData, AuthResponse, RegisterData, UserResponse } from "../types/auth";
import { BlogResponse, SingleBlogResponse } from "../types/blog";
import { CategoryResponse } from "../types/categories";
import $http from "./axiosConfig"

export const LoginApi = async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/login`, loginData);

    return response.data;
}
export const LogoutApi = async (): Promise<void> => await $http.get(`/api/v1/users/logout`);


export const RegisterApi = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/signup`, registerData);

    return response.data;
}

// Get User
export const GetUserApi = async (): Promise<UserResponse> => {
    const response = await $http.get(`/api/v1/users/me`);

    return response.data
}

// Categories
export const GetCategoriesApi = async (): Promise<CategoryResponse> => {
    const response = await $http.get(`/api/v1/categories`);

    return response.data;
}
export const GetCategoryApi = async (categoryId: string): Promise<CategoryResponse> => {
    const response = await $http.get(`/api/v1/categories/${categoryId}`);

    return response.data;
}

// Blogs
export const GetBlogsApi = async (categoryId?: string): Promise<BlogResponse> => {
    const response = await $http.get(`/api/v1/blogs${categoryId ? `?category=${categoryId}` : ""}`);

    return response.data;
}
export const GetBlogApi = async (blogId: string): Promise<SingleBlogResponse> => {
    const response = await $http.get(`/api/v1/blogs/${blogId}`);

    return response.data;
}