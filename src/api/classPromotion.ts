import { api } from './api';

export enum ClassPromotionStatus {
    PLANNED = 0,
    ACTIVE = 1,
    COMPLETED = 2,
    CANCELED = 3,
}

export interface ClassPromotion {
    id: string;
    title: string;
    description?: string;
    grade_level_id: string;
    planned_start_date?: string | Date | null;
    tuition_fee: number;
    max_students?: number;
    promotion_start?: string | Date | null;
    promotion_end?: string | Date | null;
    discount_offered?: number;
    status: ClassPromotionStatus;
    converted_class_id?: string | null;
    created_by: string;
    created_at: string | Date;
    gradeLevel?: {
        id: string;
        name: string;
        description?: string;
    };
    convertedClass?: {
        id: string;
        name: string;
    } | null;
    createdBy?: {
        id: string;
        username: string;
        email: string;
    };
}

export interface CreateClassPromotionDto {
    title: string;
    description?: string;
    grade_level_id: string;
    planned_start_date?: string;
    tuition_fee: number;
    max_students?: number;
    promotion_start?: string;
    promotion_end?: string;
    discount_offered?: number;
    status?: ClassPromotionStatus;
    converted_class_id?: string;
    created_by: string;
}

export interface UpdateClassPromotionDto {
    title?: string;
    description?: string;
    planned_start_date?: string;
    tuition_fee?: number;
    max_students?: number;
    promotion_start?: string;
    promotion_end?: string;
    discount_offered?: number;
    status?: ClassPromotionStatus;
    converted_class_id?: string;
}

// Create class promotion
export async function createClassPromotionApi(dto: CreateClassPromotionDto): Promise<ClassPromotion> {
    const response = await api.post('api/v1/class-promotions', dto);
    return response.data;
}

// Update class promotion
export async function updateClassPromotionApi(
    id: string,
    dto: UpdateClassPromotionDto
): Promise<ClassPromotion> {
    const response = await api.put(`api/v1/class-promotions/${id}`, dto);
    return response.data;
}

// Get class promotion by ID
export async function getClassPromotionByIdApi(id: string): Promise<ClassPromotion> {
    const response = await api.get(`api/v1/class-promotions/${id}`);
    return response.data;
}

// Delete class promotion
export async function deleteClassPromotionApi(id: string): Promise<{ message: string }> {
    const response = await api.delete(`api/v1/class-promotions/${id}`);
    return response.data;
}

// Get all class promotions
export async function getAllClassPromotionsApi(): Promise<ClassPromotion[]> {
    const response = await api.get('api/v1/class-promotions');
    return response.data;
}

// Get active class promotions
export async function getActiveClassPromotionsApi(): Promise<ClassPromotion[]> {
    const response = await api.get('api/v1/class-promotions/active/list');
    return response.data;
}

// Get class promotions by grade level
export async function getClassPromotionsByGradeLevelApi(gradeLevelId: string): Promise<ClassPromotion[]> {
    const response = await api.get(`api/v1/class-promotions/grade-level/${gradeLevelId}`);
    return response.data;
}

// Get class promotions by status
export async function getClassPromotionsByStatusApi(status: ClassPromotionStatus): Promise<ClassPromotion[]> {
    const response = await api.get(`api/v1/class-promotions/status/filter?status=${status}`);
    return response.data;
}
