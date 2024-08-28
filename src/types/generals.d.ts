type ApiResponse<T> = {
    status: string;
    token?: string;
    results?: string;
    data: T;
}