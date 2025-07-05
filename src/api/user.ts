import { api } from './api';
import { IUser } from '@/types/user';

export interface UpdateUserDto {
    username?: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

// Update user information including avatar
export async function updateUserApi(id: string, dto: UpdateUserDto): Promise<IUser> {
    const response = await api.put(`api/v1/users/${id}`, dto);
    return response.data;
}

// Get current user info
export async function getCurrentUserApi(): Promise<IUser> {
    const response = await api.get('api/v1/users/me');
    return response.data;
}
