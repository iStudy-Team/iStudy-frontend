import { api } from './api';
import { Grade } from './grade';
import { Academic } from './academic';
import { Student } from './student';
import { Teacher } from './teacher';
import { Schedule } from './schedule';
import { ClassSession } from './classSession';

export enum ClassStatus {
    OPEN = 0,
    CLOSE = 1,
    COMPLETED = 2,
}

export enum ClassEnrollmentStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    COMPLETED = 2,
}

export enum ClassTeacherRole {
    MAIN_TEACHER = 0,
    ASSISTANT_TEACHER = 1,
}

export enum ClassTeacherStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}

// User interface for embedded user data (backend format)
export interface ClassUser {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar?: string | null;
    role: number;
    created_at: string | Date;
    updated_at: string | Date;
    status: boolean;
}

// Enhanced Teacher interface with user data
export interface TeacherWithUser extends Teacher {
    user: ClassUser;
}

// Class Teacher relationship
export interface ClassTeacher {
    id: string;
    class_id: string;
    teacher_id: string;
    role: ClassTeacherRole;
    start_date?: string | Date | null;
    end_date?: string | Date | null;
    status: ClassTeacherStatus;
    teacher: TeacherWithUser;
}

// Enhanced Student interface with user data
export interface StudentWithUser extends Omit<Student, 'user'> {
    user: ClassUser;
}

export interface ClassEnrollment {
    id: string;
    class_id: string;
    student_id: string;
    enrollment_date: string | Date;
    end_date?: string | Date | null;
    status: ClassEnrollmentStatus;
    tuition_fee?: string | null;
    original_fee?: string | null;
    discount_percentage: number;
    student: StudentWithUser;
}

export interface Class {
    id: string;
    academic_year_id: string;
    grade_level_id: string;
    name: string;
    capacity?: number;
    tuition_fee?: string;
    start_date?: string | Date | null;
    end_date?: string | Date | null;
    status: ClassStatus;
    created_at: string | Date;
    updated_at: string | Date;
    academic_year?: Academic;
    grade_level?: Grade;
    schedule?: Schedule[]; // Will be populated by getSchedulesByClassOrDay
    class_teachers?: ClassTeacher[];
    class_enrollments?: ClassEnrollment[];
    class_sessions?: ClassSession[];
}

export type ClassCredentials = Pick<
    Class,
    | 'academic_year_id'
    | 'grade_level_id'
    | 'name'
    | 'capacity'
    | 'tuition_fee'
    | 'start_date'
    | 'end_date'
    | 'status'
> & {
    teacher_id?: string; // Optional field for teacher ID
};

export type UpdateClassCredentials = Partial<ClassCredentials>;

export interface SearchClassDto {
    page?: number;
    limit?: number;
    searchTerm?: string;
}

// Create class
export async function createClassApi(dto: ClassCredentials): Promise<Class> {
    const payload = {
        ...dto,
        start_date: dto.start_date instanceof Date ? dto.start_date.toISOString() : dto.start_date,
        end_date: dto.end_date instanceof Date ? dto.end_date.toISOString() : dto.end_date,
        teacher_id: dto.teacher_id
    };
    const response = await api.post('api/v1/class', payload);
    return response.data;
}

// Update class
export async function updateClassApi(
    id: string,
    dto: UpdateClassCredentials
): Promise<Class> {
    const payload = {
        ...dto,
        start_date: dto.start_date instanceof Date ? dto.start_date.toISOString() : dto.start_date,
        end_date: dto.end_date instanceof Date ? dto.end_date.toISOString() : dto.end_date,
    };
    const response = await api.put(`api/v1/class/${id}`, payload);
    return response.data;
}

// Get class by ID
export async function getClassByIdApi(id: string): Promise<Class> {
    const response = await api.get(`api/v1/class/get-by-id/${id}`);
    return response.data;
}

// Get detailed class by ID (includes teachers, students, schedules)
export async function getDetailedClassByIdApi(id: string): Promise<Class> {
    const response = await api.get(`api/v1/class/get-by-id/${id}`);
    return response.data;
}

// Delete class
export async function deleteClassApi(id: string): Promise<void> {
    await api.delete(`api/v1/class/${id}`);
}

// Search classes by term
export async function searchClassesApi(
    searchTerm: string,
    dto?: SearchClassDto
) {
    const response = await api.get(`api/v1/class/search/${searchTerm}`, {
        params: dto,
    });
    return response.data;
}

// Get all classes
export async function getAllClassesApi(): Promise<Class[]> {
    const response = await api.get('api/v1/class/all');
    return response.data;
}

// Get classes with pagination
export async function getPaginationClassesApi(dto: {
    page: number;
    limit: number;
}) {
    const response = await api.post('api/v1/class/get-pagination', {
        body: {
            page: dto.page,
            limit: dto.limit,
        },
    });
    return response.data;
}
