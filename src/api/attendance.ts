import { api } from './api';

export interface Attendance {
    id: string;
    studentId: string;
    classSessionId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    note?: string;
    createdAt: string;
    updatedAt: string;
    student?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        avatar?: string;
    };
    classSession?: {
        id: string;
        date: string;
        startTime: string;
        endTime: string;
        classId: string;
        scheduleId: string;
    };
}

export interface CreateAttendanceDto {
    studentId: string;
    classSessionId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    note?: string;
}

export interface UpdateAttendanceDto {
    status?: 'present' | 'absent' | 'late' | 'excused';
    note?: string;
}

export interface BulkAttendanceDto {
    classSessionId: string;
    attendances: {
        studentId: string;
        status: 'present' | 'absent' | 'late' | 'excused';
        note?: string;
    }[];
}

export interface GetAttendanceDto {
    page?: number;
    limit?: number;
    classSessionId?: string;
    studentId?: string;
    status?: 'present' | 'absent' | 'late' | 'excused';
    dateFrom?: string;
    dateTo?: string;
}

// Create attendance record
export const createAttendanceApi = async (dto: CreateAttendanceDto): Promise<Attendance> => {
    const response = await api.post('/attendance', dto);
    return response.data;
};

// Update attendance record
export const updateAttendanceApi = async (
    id: string,
    dto: UpdateAttendanceDto
): Promise<Attendance> => {
    const response = await api.put(`/attendance/${id}`, dto);
    return response.data;
};

// Get attendance by ID
export const getAttendanceByIdApi = async (id: string): Promise<Attendance> => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
};

// Get all attendance records with filters
export const getAllAttendanceApi = async (dto?: GetAttendanceDto): Promise<{
    data: Attendance[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}> => {
    const params = new URLSearchParams();
    if (dto?.page) params.append('page', dto.page.toString());
    if (dto?.limit) params.append('limit', dto.limit.toString());
    if (dto?.classSessionId) params.append('classSessionId', dto.classSessionId);
    if (dto?.studentId) params.append('studentId', dto.studentId);
    if (dto?.status) params.append('status', dto.status);
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/attendance?${params.toString()}`);
    return response.data;
};

// Get attendance by class session
export const getAttendanceByClassSessionApi = async (
    classSessionId: string
): Promise<Attendance[]> => {
    const response = await api.get(`/attendance?classSessionId=${classSessionId}`);
    return response.data.data || response.data;
};

// Get attendance by student
export const getAttendanceByStudentApi = async (
    studentId: string,
    dto?: Omit<GetAttendanceDto, 'studentId'>
): Promise<Attendance[]> => {
    const params = new URLSearchParams();
    params.append('studentId', studentId);
    if (dto?.page) params.append('page', dto.page.toString());
    if (dto?.limit) params.append('limit', dto.limit.toString());
    if (dto?.classSessionId) params.append('classSessionId', dto.classSessionId);
    if (dto?.status) params.append('status', dto.status);
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/attendance?${params.toString()}`);
    return response.data.data || response.data;
};

// Create bulk attendance records
export const createBulkAttendanceApi = async (dto: BulkAttendanceDto): Promise<Attendance[]> => {
    const response = await api.post('/attendance/bulk', dto);
    return response.data;
};

// Update bulk attendance records
export const updateBulkAttendanceApi = async (dto: BulkAttendanceDto): Promise<Attendance[]> => {
    const response = await api.put('/attendance/bulk', dto);
    return response.data;
};

// Delete attendance record
export const deleteAttendanceApi = async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`);
};

// Get attendance statistics
export const getAttendanceStatsApi = async (filters?: {
    classId?: string;
    studentId?: string;
    dateFrom?: string;
    dateTo?: string;
}): Promise<{
    totalSessions: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    attendanceRate: number;
}> => {
    const params = new URLSearchParams();
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.studentId) params.append('studentId', filters.studentId);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);

    const response = await api.get(`/attendance/stats?${params.toString()}`);
    return response.data;
};
