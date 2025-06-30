import { api } from './api';

export enum ClassStatus {
    OPEN = 0,
    CLOSE = 1,
    COMPLETED = 2,
}

export interface Class {
    id: string;
    academic_year_id: string;
    grade_level_id: string;
    name: string;
    capacity?: number;
    tuition_fee?: string;
    start_date?: Date;
    end_date?: Date;
    status: ClassStatus;
    created_at: Date;
    updated_at: Date;
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
        start_date: dto.start_date?.toISOString(),
        end_date: dto.end_date?.toISOString(),
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
        start_date: dto.start_date?.toISOString(),
        end_date: dto.end_date?.toISOString(),
    };
    const response = await api.put(`api/v1/class/${id}`, payload);
    return response.data;
}

// Get class by ID
export async function getClassByIdApi(id: string): Promise<Class> {
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
