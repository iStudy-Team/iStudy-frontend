import { api } from './api';

export interface Schedule {
    id: string;
    class_id: string;
    day?: Date;
    start_time?: Date,
    end_time?: Date,
    class_name?: string;
    teacher?: {
        id: string;
        full_name: string;
    }[]
}

export type ScheduleCredentials = Pick<
    Schedule,
    | 'class_id'
    | 'day'
    | 'start_time'
    | 'end_time'
>;

export type UpdateScheduleCredentials = Partial<ScheduleCredentials>;

export interface GetScheduleDto {
    class_id?: string;
    day?: Date;
    page?: number;
    limit?: number;
}

export interface GetScheduleByMultipleClassDto {
    class_ids: string[];
    start_date?: Date;
    end_date?: Date;
    page?: number;
    limit?: number;
}

export interface DeleteMultipleSchedulesDto {
    scheduleIds: string[];
}

export interface CreateMultipleSchedulesDto {
    schedules: ScheduleCredentials[];
}

export interface DeleteScheduleResponse {
    success: boolean;
    message: string;
    deletedSchedule: Schedule;
}

export interface DeletedSession {
    id: string;
    schedule_id: string;
    session_date: Date;
    status: number;
}

export interface DeleteScheduleWithSessionsResponse {
    success: boolean;
    message: string;
    deletedSchedule: Schedule;
    deletedSessionsCount: number;
    deletedSessions: DeletedSession[];
}

export interface DeleteMultipleSchedulesResponse {
    success: boolean;
    message: string;
    deletedCount: number;
    deletedSchedules: Schedule[];
    totalDeletedSessions: number;
}

// Create schedule
export async function createScheduleApi(dto: ScheduleCredentials): Promise<Schedule> {
    const payload = {
        ...dto,
        day: dto.day?.toISOString(),
    };
    const response = await api.post('api/v1/schedule', payload);
    return response.data;
}

// Update schedule
export async function updateScheduleApi(id: string, dto: UpdateScheduleCredentials): Promise<Schedule> {
    const payload = {
        ...dto,
        day: dto.day?.toISOString(),
    };
    const response = await api.put(`api/v1/schedule/${id}`, payload);
    return response.data;
}

// Get schedule by ID
export async function getScheduleByIdApi(id: string): Promise<Schedule> {
    const response = await api.get(`api/v1/schedule/get-by-id/${id}`);
    return response.data;
}

// Get schedules by class or day
export async function getSchedulesByClassOrDayApi(dto: GetScheduleDto): Promise<Schedule[]> {
    const payload = {
        ...dto,
        day: dto.day?.toISOString(),
    };
    const response = await api.post('api/v1/schedule/get-by-class-or-day', payload);
    return response.data;
}

// Get schedules by multiple classes
export async function getSchedulesByMultipleClassesApi(dto: GetScheduleByMultipleClassDto): Promise<Schedule[]> {
    const payload = {
        ...dto,
        start_date: dto.start_date?.toISOString(),
        end_date: dto.end_date?.toISOString(),
    };
    const response = await api.post('api/v1/schedule/get-by-multiple-classes', payload);
    return response.data;
}

// Get schedules by student (current authenticated user)
export async function getSchedulesByStudentApi(): Promise<Schedule[]> {
    const response = await api.get('api/v1/schedule/get-by-student');
    return response.data;
}

// Delete schedule (preserve related sessions)
export async function deleteScheduleApi(id: string): Promise<DeleteScheduleResponse> {
    const response = await api.delete(`api/v1/schedule/${id}`);
    return response.data;
}

// Delete schedule and all related class sessions
export async function deleteScheduleWithSessionsApi(id: string): Promise<DeleteScheduleWithSessionsResponse> {
    const response = await api.delete(`api/v1/schedule/${id}/with-sessions`);
    return response.data;
}

// Delete multiple schedules and their related sessions
export async function deleteMultipleSchedulesApi(dto: DeleteMultipleSchedulesDto): Promise<DeleteMultipleSchedulesResponse> {
    const response = await api.delete('api/v1/schedule/batch', { data: dto });
    return response.data;
}

// Create multiple schedules with overlap validation
export async function createMultipleSchedulesApi(dto: CreateMultipleSchedulesDto): Promise<Schedule[]> {
    const payload = {
        schedules: dto.schedules.map(schedule => ({
            ...schedule,
            day: schedule.day?.toISOString(),
        }))
    };
    const response = await api.post('api/v1/schedule/create-multiple', payload);
    return response.data;
}
