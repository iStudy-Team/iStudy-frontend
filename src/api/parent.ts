import { api } from './api';

export enum ParentStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}

export interface Parent {
    id: string;
    user_id: string;
    full_name: string;
    phone?: string;
    email?: string;
    address?: string;
    status: ParentStatus;
    relationship?: string;
    zalo_id?: string;
    facebook_id?: string;
    created_at: Date;
    updated_at: Date;
}

export type ParentCredentials = Pick<
    Parent,
    | 'user_id'
    | 'full_name'
    | 'phone'
    | 'email'
    | 'address'
    | 'status'
    | 'relationship'
    | 'zalo_id'
    | 'facebook_id'
>;

export type UpdateParentCredentials = Partial<ParentCredentials>;

export interface SearchParentDto {
    page?: number;
    limit?: number;
    searchTerm?: string;
}

// Create parent
export async function createParentApi(dto: ParentCredentials): Promise<Parent> {
    const response = await api.post('api/v1/parents', dto);
    return response.data;
}

// Update parent
export async function updateParentApi(id: string, dto: UpdateParentCredentials): Promise<Parent> {
    const response = await api.put(`api/v1/parents/${id}`, dto);
    return response.data;
}

// Get parent by ID
export async function getParentByIdApi(id: string): Promise<Parent> {
    const response = await api.get(`api/v1/parents/${id}`);
    return response.data;
}

// Delete parent
export async function deleteParentApi(id: string): Promise<void> {
    await api.delete(`api/v1/parents/${id}`);
}

// Get all parents
export async function getAllParentsApi(): Promise<Parent[]> {
    const response = await api.get('api/v1/parents');
    return response.data;
}

// Search parents (if needed for pagination)
export async function searchParentsApi(searchTerm: string, dto?: SearchParentDto) {
    const response = await api.get(`api/v1/parents/search/${searchTerm}`, {
        params: dto
    });
    return response.data;
}
