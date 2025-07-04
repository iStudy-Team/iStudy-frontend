import { api } from './api';

export interface ClassSession {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    class_id: string;
    teacher_id?: string;
    topic?: string;
    note?: string;
    status?: number; // 0: Scheduled, 1: In Progress, 2: Completed, 3: Cancelled
    createdAt?: string;
    updatedAt?: string;
    // Relations
    class?: {
        id: string;
        name: string;
        status: number;
        class_enrollments?: Array<{
            student: {
                id: string;
                full_name: string;
                user_id: string;
                user?: {
                    email: string;
                    phone: string;
                    avatar?: string;
                };
            };
        }>;
    };
    teacher?: {
        id: string;
        full_name: string;
        user?: {
            email: string;
            phone: string;
        };
    };
    attendances?: Array<{
        id: string;
        student_id: string;
        status: number; // 0: Present, 1: Absent, 2: Late, 3: Excused
        comment?: string;
        recorded_at: string;
        student?: {
            id: string;
            full_name: string;
            user?: {
                email: string;
                phone: string;
                avatar?: string;
            };
        };
    }>;
}

export interface CreateClassSessionDto {
    date: string;
    start_time: string;
    end_time: string;
    class_id: string;
    teacher_id?: string;
    topic?: string;
    note?: string;
    status?: number;
}

export interface UpdateClassSessionDto {
    date?: string;
    start_time?: string;
    end_time?: string;
    class_id?: string;
    teacher_id?: string;
    topic?: string;
    note?: string;
    status?: number;
}

export interface GetClassSessionDto {
    page?: number;
    limit?: number;
    classId?: string;
    status?: number;
    dateFrom?: string;
    dateTo?: string;
}

// Create class session
export const createClassSessionApi = async (dto: CreateClassSessionDto): Promise<ClassSession> => {
    const response = await api.post('/api/v1/class-session', dto);
    return response.data;
};

// Update class session
export const updateClassSessionApi = async (
    id: string,
    dto: UpdateClassSessionDto
): Promise<ClassSession> => {
    const response = await api.put(`/api/v1/class-session/${id}`, dto);
    return response.data;
};

// Get class session by ID
export const getClassSessionByIdApi = async (id: string): Promise<ClassSession> => {
    const response = await api.get(`/api/v1/class-session/${id}`);
    return response.data;
};

// Get all class sessions with filters
export const getAllClassSessionsApi = async (dto?: GetClassSessionDto): Promise<{
    data: ClassSession[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}> => {
    const params = new URLSearchParams();
    if (dto?.page) params.append('page', dto.page.toString());
    if (dto?.limit) params.append('limit', dto.limit.toString());
    if (dto?.classId) params.append('classId', dto.classId);
    if (dto?.status !== undefined) params.append('status', dto.status.toString());
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/api/v1/class-session?${params.toString()}`);
    return response.data;
};

// Get class sessions by class
export const getClassSessionsByClassApi = async (
    classId: string,
    dto?: Omit<GetClassSessionDto, 'classId'>
): Promise<ClassSession[]> => {
    const params = new URLSearchParams();
    params.append('classId', classId);
    if (dto?.page) params.append('page', dto.page.toString());
    if (dto?.limit) params.append('limit', dto.limit.toString());
    if (dto?.status !== undefined) params.append('status', dto.status.toString());
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/api/v1/class-session?${params.toString()}`);
    return response.data.data || response.data;
};

// Get class sessions by date range
export const getClassSessionsByDateRangeApi = async (
    dateFrom: string,
    dateTo: string,
    classId?: string
): Promise<ClassSession[]> => {
    const params = new URLSearchParams();
    params.append('dateFrom', dateFrom);
    params.append('dateTo', dateTo);
    if (classId) params.append('classId', classId);

    const response = await api.get(`/api/v1/class-session?${params.toString()}`);
    return response.data.data || response.data;
};

// Delete class session
export const deleteClassSessionApi = async (id: string): Promise<void> => {
    await api.delete(`/api/v1/class-session/${id}`);
};

// Get today's sessions for a teacher
export const getTodaySessionsForTeacherApi = async (): Promise<ClassSession[]> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get(`/api/v1/class-session?dateFrom=${today}&dateTo=${today}`);
    return response.data.data || response.data;
};

// Get upcoming sessions for a class
export const getUpcomingSessionsForClassApi = async (
    classId: string,
    limit: number = 10
): Promise<ClassSession[]> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get(`/api/v1/class-session?classId=${classId}&dateFrom=${today}&limit=${limit}`);
    return response.data.data || response.data;
};

export const getTotalClassSessionsCountApi = async (): Promise<number> => {
    const response = await api.get(`/api/v1/class-session/get-total/count`);
    return response.data || 0;
}
