import { api } from './api.ts';
import { ACADEMIC_YEAR_STATUS } from '@/types/study.ts';
import { Grade } from './grade.ts';
import { Class } from './class.ts';

export type Academic = {
    id: string;
    school_year: string;
    start_date?: string;
    end_date?: string;
    status: ACADEMIC_YEAR_STATUS;
    created_at: string;
    updated_at: string;
    grade_levels?: Grade[];
    classes?: Class[];
};

export type AcademicYearCredentials = Pick<
    Academic,
    'school_year' | 'start_date' | 'end_date' | 'status'
>;

export type AcademicYearCredentialsUpdateStatus = Pick<Academic, 'status'>;

export type AcademicYearResponse = {
    data: Academic[];
    limit: number;
    page: number;
    totalCount: number;
};

export const createAcademicYearApi = async (
    credentials: AcademicYearCredentials
): Promise<Academic> => {
    const response = await api.post('api/v1/academic-year', credentials);
    return response.data;
};

export const getAllAcademicYearsApi = async (
    page?: number,
    limit?: number
): Promise<AcademicYearResponse> => {
    const response = await api.get('api/v1/academic-year', {
        params: {
            page: page,
            limit: limit,
        },
    });
    return response.data;
};

export const updateAcademicYearApi = async (
    id: string,
    credentials: AcademicYearCredentials
): Promise<Academic> => {
    const response = await api.put(`api/v1/academic-year/${id}`, credentials);
    return response.data;
};

export const getAcademicYearByIdApi = async (id: string): Promise<Academic> => {
    const response = await api.get(`api/v1/academic-year/${id}`);
    return response.data;
};

export const updateStatusAcademicYearApi = async (
    id: string,
    credentials: AcademicYearCredentialsUpdateStatus
): Promise<Academic> => {
    const response = await api.put(`api/v1/academic-year/${id}`, credentials);
    return response.data;
};
