import { LoginData, AuthResponse, RegisterData } from "../types/auth";
import { BlogResponse } from "../types/blog";
import { CategoryResponse } from "../types/categories";
import $http from "./axiosConfig"

export const LoginApi = async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/login`, loginData);

    return response.data;
}
export const RegisterApi = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/signup`, registerData);

    return response.data;
}

// Categories
export const GetCategoriesApi = async (): Promise<CategoryResponse> => {
    const response = await $http.get(`/api/v1/categories`);

    return response.data;
}

// Blogs
export const GetBlogsApi = async (categoryId?: string): Promise<BlogResponse> => {
    const response = await $http.get(`/api/v1/blogs${categoryId ? `?category=${categoryId}` : ""}`);

    return response.data;
}