import { api } from './api';

export interface ClassSession {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    classId: string;
    scheduleId: string;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
    createdAt: string;
    updatedAt: string;
    // Relations
    class?: {
        id: string;
        name: string;
        subject: string;
        description?: string;
    };
    schedule?: {
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    };
    attendances?: Array<{
        id: string;
        studentId: string;
        status: 'present' | 'absent' | 'late' | 'excused';
        note?: string;
        student?: {
            id: string;
            name: string;
            email: string;
            phone?: string;
            avatar?: string;
        };
    }>;
}

export interface CreateClassSessionDto {
    date: string;
    startTime: string;
    endTime: string;
    classId: string;
    scheduleId: string;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
}

export interface UpdateClassSessionDto {
    date?: string;
    startTime?: string;
    endTime?: string;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    note?: string;
}

export interface GetClassSessionDto {
    page?: number;
    limit?: number;
    classId?: string;
    scheduleId?: string;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    dateFrom?: string;
    dateTo?: string;
}

// Create class session
export const createClassSessionApi = async (dto: CreateClassSessionDto): Promise<ClassSession> => {
    const response = await api.post('/class-session', dto);
    return response.data;
};

// Update class session
export const updateClassSessionApi = async (
    id: string,
    dto: UpdateClassSessionDto
): Promise<ClassSession> => {
    const response = await api.put(`/class-session/${id}`, dto);
    return response.data;
};

// Get class session by ID
export const getClassSessionByIdApi = async (id: string): Promise<ClassSession> => {
    const response = await api.get(`/class-session/${id}`);
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
    if (dto?.scheduleId) params.append('scheduleId', dto.scheduleId);
    if (dto?.status) params.append('status', dto.status);
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/class-session?${params.toString()}`);
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
    if (dto?.scheduleId) params.append('scheduleId', dto.scheduleId);
    if (dto?.status) params.append('status', dto.status);
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/class-session?${params.toString()}`);
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

    const response = await api.get(`/class-session?${params.toString()}`);
    return response.data.data || response.data;
};

// Delete class session
export const deleteClassSessionApi = async (id: string): Promise<void> => {
    await api.delete(`/class-session/${id}`);
};

// Get today's sessions for a teacher
export const getTodaySessionsForTeacherApi = async (): Promise<ClassSession[]> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await api.get(`/class-session?dateFrom=${today}&dateTo=${today}`);
    return response.data.data || response.data;
};

// Get upcoming sessions for a class
export const getUpcomingSessionsForClassApi = async (
    classId: string,
    limit: number = 10
): Promise<ClassSession[]> => {
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams();
    params.append('classId', classId);
    params.append('dateFrom', today);
    params.append('limit', limit.toString());
    params.append('status', 'scheduled');

    const response = await api.get(`/class-session?${params.toString()}`);
    return response.data.data || response.data;
};
