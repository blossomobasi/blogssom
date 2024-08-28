import { LoginData, AuthResponse, RegisterData } from "../types/auth";
import $http from "./axiosConfig"

export const LoginApi = async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/login`, loginData);

    return response.data;
}
export const RegisterApi = async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await $http.post(`/api/v1/users/signup`, registerData);

    return response.data;
}
