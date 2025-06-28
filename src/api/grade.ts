import { api } from './api.ts';
import { Academic } from './academic.ts';

export type Grade = {
    id: string;
    name: string;
    description?: string;
    academic_year_id: string;
    created_at: Date;
    updated_at: Date;
    academic_year?: Academic;
};

export type GradeCredentials = Pick<Grade, 'name' | 'description' | 'academic_year_id'>;

export type UpdateGradeCredentials = Pick<Grade, 'name' | 'description'>;

export type GradeResponse = {
    data: Grade[];
    limit: number;
    page: number;
    totalCount: number;
};

export const createGradeApi = async (credentials: GradeCredentials): Promise<Grade> => {
    const response = await api.post('api/v1/grade-level', credentials);
    return response.data;
};

export const getAllGradesApi = async (page?: number, limit?: number): Promise<GradeResponse> => {
    const response = await api.get('api/v1/grade-level', {
        params: {
            page: page || 1,
            limit: limit || 10,
        },
    });
    return response.data;
};

export const updateGradeApi = async (id: string, credentials: UpdateGradeCredentials): Promise<Grade> => {
    const response = await api.put(`api/v1/grade-level/${id}`, credentials);
    return response.data;
};

export const getGradeByIdApi = async (id: string): Promise<Grade> => {
    const response = await api.get(`api/v1/grade-level/${id}`);
    return response.data;
};

export const deleteGradeApi = async (id: string): Promise<void> => {
    await api.delete(`api/v1/grade-level/${id}`);
};
