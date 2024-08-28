export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type LoginData = {
    email: string;
    password: string;
}

export type AuthResponse = {
    status: string;
    token: string;
    data: User;
}

export type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
