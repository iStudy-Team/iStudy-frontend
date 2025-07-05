import { api } from './api';

// Common User Profile Interface
export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string | null;
    role: number;
    created_at: string | Date;
    updated_at: string | Date;
    status: boolean;
}

// Gender Enum
export enum GenderEnum {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2,
}

// Status Enum
export enum StatusEnum {
    INACTIVE = 0,
    ACTIVE = 1,
}

// Teacher Profile
export interface Teacher {
    id: string;
    user_id: string;
    full_name: string;
    gender?: GenderEnum;
    date_of_birth?: string | Date | null;
    address?: string;
    qualification?: string;
    hire_date?: string | Date | null;
    zalo_id?: string;
    facebook_id?: string;
    status: StatusEnum;
    created_at: string | Date;
    updated_at: string | Date;
    user?: User;
}

// Student Profile
export interface Student {
    id: string;
    user_id: string;
    full_name: string;
    gender?: GenderEnum;
    date_of_birth?: string | Date | null;
    address?: string;
    enrollment_date?: string | Date | null;
    status: StatusEnum;
    discount_percentage?: number;
    discount_reason?: string;
    created_at: string | Date;
    updated_at: string | Date;
    user?: User;
}

// Parent Profile
export interface Parent {
    id: string;
    user_id: string;
    full_name: string;
    phone?: string;
    email?: string;
    status: number;
    address?: string;
    relationship: string;
    zalo_id?: string;
    facebook_id?: string;
    created_at: string | Date;
    updated_at: string | Date;
    user?: User;
}

// Student-Parent Relation
export interface StudentParentRelation {
    id: string;
    student_id: string;
    parent_id: string;
    is_primary: boolean;
    created_at: string | Date;
    updated_at: string | Date;
    student?: Student;
    parent?: Parent;
}

// Update DTOs
export interface UpdateTeacherDto {
    full_name?: string;
    gender?: GenderEnum;
    date_of_birth?: string;
    address?: string;
    qualification?: string;
    hire_date?: string;
    zalo_id?: string;
    facebook_id?: string;
    status?: StatusEnum;
}

export interface UpdateStudentDto {
    full_name: string;
    gender?: GenderEnum;
    date_of_birth?: string;
    address?: string;
    enrollment_date?: string;
    status?: StatusEnum;
    discount_percentage?: number;
    discount_reason?: string;
}

export interface UpdateParentDto {
    full_name?: string;
    phone?: string;
    email?: string;
    status?: number;
    address?: string;
    relationship?: string;
    zalo_id?: string;
    facebook_id?: string;
}

export interface CreateRelationDto {
    student_id: string;
    parent_id: string;
    is_primary?: boolean;
}

export interface UpdateRelationDto {
    is_primary?: boolean;
}

// API Functions for Teacher
export async function updateTeacherApi(id: string, dto: UpdateTeacherDto): Promise<Teacher> {
    const payload = {
        ...dto,
        date_of_birth: dto.date_of_birth,
        hire_date: dto.hire_date,
    };
    const response = await api.put(`api/v1/teachers/${id}`, payload);
    return response.data;
}

export async function getTeacherByIdApi(id: string): Promise<Teacher> {
    const response = await api.get(`api/v1/teachers/${id}`);
    return response.data;
}

export async function getAllTeachersApi(): Promise<Teacher[]> {
    const response = await api.get('api/v1/teachers');
    return response.data;
}

export async function deleteTeacherApi(id: string): Promise<void> {
    await api.delete(`api/v1/teachers/${id}`);
}

// API Functions for Student
export async function updateStudentApi(id: string, dto: UpdateStudentDto): Promise<Student> {
    const payload = {
        ...dto,
        date_of_birth: dto.date_of_birth,
        enrollment_date: dto.enrollment_date,
    };
    const response = await api.put(`api/v1/students/${id}`, payload);
    return response.data;
}

export async function getStudentByIdApi(id: string): Promise<Student> {
    const response = await api.get(`api/v1/students/${id}`);
    return response.data;
}

export async function getAllStudentsApi(): Promise<Student[]> {
    const response = await api.get('api/v1/students');
    return response.data;
}

export async function deleteStudentApi(id: string): Promise<void> {
    await api.delete(`api/v1/students/${id}`);
}

// API Functions for Parent
export async function updateParentApi(id: string, dto: UpdateParentDto): Promise<Parent> {
    const response = await api.put(`api/v1/parents/${id}`, dto);
    return response.data;
}

export async function getParentByIdApi(id: string): Promise<Parent> {
    const response = await api.get(`api/v1/parents/${id}`);
    return response.data;
}

export async function getAllParentsApi(): Promise<Parent[]> {
    const response = await api.get('api/v1/parents');
    return response.data;
}

export async function deleteParentApi(id: string): Promise<void> {
    await api.delete(`api/v1/parents/${id}`);
}

// API Functions for Student-Parent Relations
export async function createRelationApi(dto: CreateRelationDto): Promise<StudentParentRelation> {
    const response = await api.post('api/v1/relations', dto);
    return response.data;
}

export async function updateRelationApi(id: string, dto: UpdateRelationDto): Promise<StudentParentRelation> {
    const response = await api.put(`api/v1/relations/${id}`, dto);
    return response.data;
}

export async function getRelationByIdApi(id: string): Promise<StudentParentRelation> {
    const response = await api.get(`api/v1/relations/${id}`);
    return response.data;
}

export async function deleteRelationApi(id: string): Promise<void> {
    await api.delete(`api/v1/relations/${id}`);
}

export async function getAllRelationsApi(): Promise<StudentParentRelation[]> {
    const response = await api.get('api/v1/relations');
    return response.data;
}

export async function getRelationsByStudentIdApi(studentId: string): Promise<StudentParentRelation[]> {
    const response = await api.get(`api/v1/relations/student/${studentId}`);
    return response.data;
}

export async function getRelationsByParentIdApi(parentId: string): Promise<StudentParentRelation[]> {
    const response = await api.get(`api/v1/relations/parent/${parentId}`);
    return response.data;
}
