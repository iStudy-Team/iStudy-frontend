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
