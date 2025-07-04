import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Schedule,
    ScheduleCredentials,
    UpdateScheduleCredentials,
    GetScheduleDto,
    GetScheduleByMultipleClassDto,
    createScheduleApi,
    updateScheduleApi,
    getScheduleByIdApi,
    getSchedulesByClassOrDayApi,
    getSchedulesByMultipleClassesApi,
    getSchedulesByStudentApi,
    getSchedulesByTeacherApi,
    deleteScheduleApi,
    deleteScheduleWithSessionsApi,
    deleteMultipleSchedulesApi,
    createMultipleSchedulesApi,
} from '@/api/schedule';

interface ScheduleState {
    schedules: Schedule[];
    currentSchedule: Schedule | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setSchedules: (schedules: Schedule[]) => void;
    setCurrentSchedule: (schedule: Schedule | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<ScheduleState['pagination']>) => void;

    // API Actions
    createSchedule: (dto: ScheduleCredentials) => Promise<Schedule | null>;
    updateSchedule: (id: string, dto: UpdateScheduleCredentials) => Promise<Schedule | null>;
    getScheduleById: (id: string) => Promise<Schedule | null>;
    getSchedulesByClassOrDay: (dto: GetScheduleDto) => Promise<void>;
    getSchedulesByMultipleClasses: (dto: GetScheduleByMultipleClassDto) => Promise<void>;
    getSchedulesByStudent: () => Promise<void>;
    getSchedulesByTeacher: () => Promise<void>;
    deleteSchedule: (id: string) => Promise<boolean>;
    deleteScheduleWithSessions: (id: string) => Promise<boolean>;
    deleteMultipleSchedules: (scheduleIds: string[]) => Promise<boolean>;
    createMultipleSchedules: (schedules: ScheduleCredentials[]) => Promise<Schedule[] | null>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    schedules: [],
    currentSchedule: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useScheduleStore = create<ScheduleState>((set, get) => ({
    ...initialState,

    // State setters
    setSchedules: (schedules) => set({ schedules }),
    setCurrentSchedule: (schedule) => set({ currentSchedule: schedule }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createSchedule: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newSchedule = await createScheduleApi(dto);
            const { schedules } = get();
            const currentSchedules = Array.isArray(schedules) ? schedules : [];
            set({
                schedules: [newSchedule, ...currentSchedules],
                loading: false,
            });
            toast.success('Schedule created successfully');
            return newSchedule;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create schedule';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateSchedule: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedSchedule = await updateScheduleApi(id, dto);
            const { schedules } = get();
            const currentSchedules = Array.isArray(schedules) ? schedules : [];
            const updatedSchedules = currentSchedules.map((schedule) =>
                schedule.id === id ? updatedSchedule : schedule
            );
            set({
                schedules: updatedSchedules,
                currentSchedule: updatedSchedule,
                loading: false,
            });
            toast.success('Schedule updated successfully');
            return updatedSchedule;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update schedule';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getScheduleById: async (id) => {
        set({ loading: true, error: null });
        try {
            const schedule = await getScheduleByIdApi(id);
            set({
                currentSchedule: schedule,
                loading: false,
            });
            return schedule;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch schedule';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getSchedulesByClassOrDay: async (dto) => {
        set({ loading: true, error: null });
        try {
            const response = await getSchedulesByClassOrDayApi(dto);
            const schedules = Array.isArray(response) ? response : [];
            set({
                schedules,
                pagination: {
                    page: dto.page || 1,
                    limit: dto.limit || 10,
                    total: schedules.length,
                    totalPages: Math.ceil(schedules.length / (dto.limit || 10)),
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getSchedulesByMultipleClasses: async (dto) => {
        set({ loading: true, error: null });
        try {
            const response = await getSchedulesByMultipleClassesApi(dto);
            const schedules = Array.isArray(response) ? response : [];
            set({
                schedules,
                pagination: {
                    page: dto.page || 1,
                    limit: dto.limit || 10,
                    total: schedules.length,
                    totalPages: Math.ceil(schedules.length / (dto.limit || 10)),
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getSchedulesByStudent: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getSchedulesByStudentApi();
            const schedules = Array.isArray(response) ? response : [];
            set({
                schedules,
                pagination: {
                    page: 1,
                    limit: schedules.length,
                    total: schedules.length,
                    totalPages: 1,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch student schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getSchedulesByTeacher: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getSchedulesByTeacherApi();
            const schedules = Array.isArray(response) ? response : [];
            set({
                schedules,
                pagination: {
                    page: 1,
                    limit: schedules.length,
                    total: schedules.length,
                    totalPages: 1,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch teacher schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    deleteSchedule: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteScheduleApi(id);
            const { schedules } = get();
            const filteredSchedules = schedules.filter(
                (schedule) => schedule.id !== id
            );
            set({
                schedules: filteredSchedules,
                loading: false,
            });
            toast.success('Schedule deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete schedule';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    deleteScheduleWithSessions: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await deleteScheduleWithSessionsApi(id);
            const { schedules } = get();
            const filteredSchedules = schedules.filter(
                (schedule) => schedule.id !== id
            );
            set({
                schedules: filteredSchedules,
                loading: false,
            });
            toast.success(`Schedule and ${response.deletedSessionsCount} sessions deleted successfully`);
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete schedule with sessions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    deleteMultipleSchedules: async (scheduleIds) => {
        set({ loading: true, error: null });
        try {
            const response = await deleteMultipleSchedulesApi({ scheduleIds });
            const { schedules } = get();
            const filteredSchedules = schedules.filter(
                (schedule) => !scheduleIds.includes(schedule.id)
            );
            set({
                schedules: filteredSchedules,
                loading: false,
            });
            toast.success(`${response.deletedCount} schedules deleted successfully`);
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete multiple schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    createMultipleSchedules: async (schedules) => {
        set({ loading: true, error: null });
        try {
            const newSchedules = await createMultipleSchedulesApi({ schedules });
            const { schedules: currentSchedules } = get();
            const currentSchedulesList = Array.isArray(currentSchedules) ? currentSchedules : [];
            set({
                schedules: [...newSchedules, ...currentSchedulesList],
                loading: false,
            });
            toast.success(`${newSchedules.length} schedules created successfully`);
            return newSchedules;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create multiple schedules';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
}));
