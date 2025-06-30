import { api } from './api';

export enum TeacherGender {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2,
}

export enum TeacherStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}

export interface Teacher {
    id: string;
    user_id: string;
    full_name: string;
    gender: TeacherGender;
    date_of_birth?: Date;
    address?: string;
    qualification?: string;
    hire_date?: Date;
    status: TeacherStatus;
    zalo_id?: string;
    facebook_id?: string;
}

export type TeacherCredentials = Pick<
    Teacher,
    | 'user_id'
    | 'full_name'
    | 'gender'
    | 'date_of_birth'
    | 'address'
    | 'qualification'
    | 'hire_date'
    | 'status'
    | 'zalo_id'
    | 'facebook_id'
>;

export type UpdateTeacherCredentials = Partial<TeacherCredentials>;

export interface SearchTeacherDto {
    page?: number;
    limit?: number;
    searchTerm?: string;
}

// Create teacher
export async function createTeacherApi(dto: TeacherCredentials): Promise<Teacher> {
    const response = await api.post('api/v1/teachers', dto);
    return response.data;
}

// Update teacher
export async function updateTeacherApi(id: string, dto: UpdateTeacherCredentials): Promise<Teacher> {
    const response = await api.put(`api/v1/teachers/${id}`, dto);
    return response.data;
}

// Get teacher by ID
export async function getTeacherByIdApi(id: string): Promise<Teacher> {
    const response = await api.get(`api/v1/teachers/${id}`);
    return response.data;
}

// Delete teacher
export async function deleteTeacherApi(id: string): Promise<void> {
    await api.delete(`api/v1/teachers/${id}`);
}

// Get all teachers
export async function getAllTeachersApi(): Promise<Teacher[]> {
    const response = await api.get('api/v1/teachers');
    return response.data;
}
