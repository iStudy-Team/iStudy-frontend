import { api } from './api';

export enum AttendanceStatus {
    PRESENT = 0,
    ABSENT = 1,
    LATE = 2,
    EXCUSED = 3,
}

export interface Attendance {
    id: string;
    student_id: string;
    class_session_id: string;
    status: number; // 0: Present, 1: Absent, 2: Late, 3: Excused
    comment?: string;
    recorded_by: string;
    recorded_at: string;
    student?: {
        id: string;
        full_name: string;
        user_id: string;
        user?: {
            email: string;
            phone: string;
            avatar?: string;
        };
    };
    class_session?: {
        id: string;
        date: string;
        start_time: string;
        end_time: string;
        class_id: string;
        class?: {
            id: string;
            name: string;
        };
    };
    teacher?: {
        id: string;
        full_name: string;
    };
}

export interface CreateAttendanceDto {
    student_id: string;
    class_session_id: string;
    status: number;
    comment?: string;
}

export interface UpdateAttendanceDto {
    status?: number;
    comment?: string;
}

export interface BulkAttendanceDto {
    class_session_id: string;
    attendances: {
        student_id: string;
        status: number;
        comment?: string;
    }[];
}

export interface GetAttendanceDto {
    page?: number;
    limit?: number;
    class_session_id?: string;
    student_id?: string;
    status?: number;
    dateFrom?: string;
    dateTo?: string;
}

// Create attendance record
export const createAttendanceApi = async (dto: CreateAttendanceDto): Promise<Attendance> => {
    const response = await api.post('/api/v1/attendance', dto);
    return response.data;
};

// Update attendance record
export const updateAttendanceApi = async (
    id: string,
    dto: UpdateAttendanceDto
): Promise<Attendance> => {
    const response = await api.put(`/api/v1/attendance/${id}`, dto);
    return response.data;
};

// Get attendance by ID
export const getAttendanceByIdApi = async (id: string): Promise<Attendance> => {
    const response = await api.get(`/api/v1/attendance/${id}`);
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
    if (dto?.class_session_id) params.append('classSessionId', dto.class_session_id);
    if (dto?.student_id) params.append('studentId', dto.student_id);
    if (dto?.status !== undefined) params.append('status', dto.status.toString());
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/api/v1/attendance?${params.toString()}`);
    return response.data;
};

// Get attendance by class session
export const getAttendanceByClassSessionApi = async (
    classSessionId: string
): Promise<Attendance[]> => {
    const response = await api.get(`/api/v1/attendance/class-session/${classSessionId}`);
    return response.data;
};

// Get attendance by student
export const getAttendanceByStudentApi = async (
    studentId: string,
    dto?: Omit<GetAttendanceDto, 'student_id'>
): Promise<Attendance[]> => {
    const params = new URLSearchParams();
    params.append('studentId', studentId);
    if (dto?.page) params.append('page', dto.page.toString());
    if (dto?.limit) params.append('limit', dto.limit.toString());
    if (dto?.class_session_id) params.append('classSessionId', dto.class_session_id);
    if (dto?.status !== undefined) params.append('status', dto.status.toString());
    if (dto?.dateFrom) params.append('dateFrom', dto.dateFrom);
    if (dto?.dateTo) params.append('dateTo', dto.dateTo);

    const response = await api.get(`/api/v1/attendance?${params.toString()}`);
    return response.data.data || response.data;
};

// Create bulk attendance records
export const createBulkAttendanceApi = async (
    classSessionId: string,
    attendances: Array<{
        student_id: string;
        status: number;
        comment?: string;
    }>
): Promise<{
    success: Attendance[];
    errors: Array<{ student_id: string; error: string }>;
}> => {
    const response = await api.post(`/api/v1/attendance/bulk/${classSessionId}`, attendances);
    return response.data;
};

// Update bulk attendance records
export const updateBulkAttendanceApi = async (dto: BulkAttendanceDto): Promise<Attendance[]> => {
    const response = await api.put('/api/v1/attendance/bulk', dto);
    return response.data;
};

// Delete attendance record
export const deleteAttendanceApi = async (id: string): Promise<void> => {
    await api.delete(`/api/v1/attendance/${id}`);
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

    const response = await api.get(`/api/v1/attendance/stats?${params.toString()}`);
    return response.data;
};
