import { api } from './api';

export enum StudentGender {
    MALE = 0,
    FEMALE = 1,
    OTHER = 2,
}

export enum StudentStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    GRADUATED = 2,
    SUSPENDED = 3,
}

export interface Student {
    id: string;
    user_id: string;
    full_name: string;
    gender: StudentGender;
    date_of_birth?: Date;
    address?: string;
    enrollment_date?: Date;
    status: StudentStatus;
    discount_percentage: number;
    discount_reason?: string;
    created_at: Date;
    updated_at: Date;
}

export type StudentCredentials = Pick<
    Student,
    | 'user_id'
    | 'full_name'
    | 'gender'
    | 'date_of_birth'
    | 'address'
    | 'enrollment_date'
    | 'status'
    | 'discount_percentage'
    | 'discount_reason'
>;

export type UpdateStudentCredentials = Partial<StudentCredentials>;

export interface SearchStudentDto {
    page?: number;
    limit?: number;
    searchTerm?: string;
}

// Create student
export async function createStudentApi(dto: StudentCredentials): Promise<Student> {
    const payload = {
        ...dto,
        date_of_birth: dto.date_of_birth?.toISOString(),
        enrollment_date: dto.enrollment_date?.toISOString(),
    };
    const response = await api.post('api/v1/students', payload);
    return response.data;
}

// Update student
export async function updateStudentApi(id: string, dto: UpdateStudentCredentials): Promise<Student> {
    const payload = {
        ...dto,
        date_of_birth: dto.date_of_birth?.toISOString(),
        enrollment_date: dto.enrollment_date?.toISOString(),
    };
    const response = await api.put(`api/v1/students/${id}`, payload);
    return response.data;
}

// Get student by ID
export async function getStudentByIdApi(id: string): Promise<Student> {
    const response = await api.get(`api/v1/students/${id}`);
    return response.data;
}

// Delete student
export async function deleteStudentApi(id: string): Promise<void> {
    await api.delete(`api/v1/students/${id}`);
}

// Get all students
export async function getAllStudentsApi(): Promise<Student[]> {
    const response = await api.get('api/v1/students');
    return response.data;
}

// Search students (if needed for pagination)
export async function searchStudentsApi(searchTerm: string, dto?: SearchStudentDto) {
    const response = await api.get(`api/v1/students/search/${searchTerm}`, {
        params: dto
    });
    return response.data;
}
