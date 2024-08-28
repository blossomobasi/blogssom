import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 30000, // 30 seconds
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};

const $http: AxiosInstance = axios.create(config);

export default $http;
