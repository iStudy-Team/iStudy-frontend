export enum USER_ROLE {
    USER = 0,
    TEACHER = 1,
    STUDENT = 2,
    PARENT = 3,
    ADMIN = 4,
}

export enum USER_STATUS {
    ACTIVE = 1,
    INACTIVE = 0,
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: USER_ROLE;
    createdAt: string;
    updatedAt: string;
    status: USER_STATUS;
    avatar?: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
    status: USER_STATUS;
    avatar?: string; // Optional field for user avatar
}
