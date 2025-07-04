import { api } from './api';

export interface StudentStatistic {
    id: string;
    year: number;
    month: number;
    total_students: number;
    new_students: number;
    inactive_students: number;
    generated_at: string;
}

export interface CreateStudentStatisticDto {
    year: number;
    month: number;
    total_students?: number;
    new_students?: number;
    inactive_students?: number;
}

export type UpdateStudentStatisticDto = Partial<CreateStudentStatisticDto>;

export interface StatisticQuery {
    year?: number;
    month?: number;
    startYear?: number;
    endYear?: number;
    startMonth?: number;
    endMonth?: number;
}

// API functions
export const createStudentStatisticApi = async (
    dto: CreateStudentStatisticDto
): Promise<StudentStatistic> => {
    const response = await api.post('/student-statistics', dto);
    return response.data;
};

export const updateStudentStatisticApi = async (
    id: string,
    dto: UpdateStudentStatisticDto
): Promise<StudentStatistic> => {
    const response = await api.put(`/student-statistics/${id}`, dto);
    return response.data;
};

export const getStudentStatisticByIdApi = async (
    id: string
): Promise<StudentStatistic> => {
    const response = await api.get(`/student-statistics/${id}`);
    return response.data;
};

export const getAllStudentStatisticsApi = async (
    query?: StatisticQuery
): Promise<StudentStatistic[]> => {
    const params = new URLSearchParams();

    if (query?.year) params.append('year', query.year.toString());
    if (query?.month) params.append('month', query.month.toString());
    if (query?.startYear) params.append('startYear', query.startYear.toString());
    if (query?.endYear) params.append('endYear', query.endYear.toString());

    const response = await api.get(`/api/v1/student-statistics?${params.toString()}`);
    return response.data;
};

export const getStudentStatisticsByDateRangeApi = async (
    startYear: number,
    endYear: number,
    startMonth?: number,
    endMonth?: number
): Promise<StudentStatistic[]> => {
    const params = new URLSearchParams();
    params.append('startYear', startYear.toString());
    params.append('endYear', endYear.toString());

    if (startMonth) params.append('startMonth', startMonth.toString());
    if (endMonth) params.append('endMonth', endMonth.toString());

    const response = await api.get(`/student-statistics/range?${params.toString()}`);
    return response.data;
};

export const deleteStudentStatisticApi = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/student-statistics/${id}`);
    return response.data;
};
