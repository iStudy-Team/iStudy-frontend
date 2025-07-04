import { create } from 'zustand';
import { toast } from 'sonner';
import {
    ClassSession,
    CreateClassSessionDto,
    UpdateClassSessionDto,
    GetClassSessionDto,
    createClassSessionApi,
    updateClassSessionApi,
    getClassSessionByIdApi,
    getAllClassSessionsApi,
    getClassSessionsByClassApi,
    getClassSessionsByDateRangeApi,
    deleteClassSessionApi,
    getTodaySessionsForTeacherApi,
    getUpcomingSessionsForClassApi,
    getTotalClassSessionsCountApi
} from '@/api/classSession';

interface ClassSessionState {
    classSessions: ClassSession[];
    currentClassSession: ClassSession | null;
    todaySessions: ClassSession[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    totalSessionsCount: number; // Total count of class sessions

    // Actions
    setClassSessions: (classSessions: ClassSession[]) => void;
    setCurrentClassSession: (classSession: ClassSession | null) => void;
    setTodaySessions: (sessions: ClassSession[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<ClassSessionState['pagination']>) => void;

    // API Actions
    createClassSession: (dto: CreateClassSessionDto) => Promise<ClassSession | null>;
    updateClassSession: (id: string, dto: UpdateClassSessionDto) => Promise<ClassSession | null>;
    getClassSessionById: (id: string) => Promise<ClassSession | null>;
    getAllClassSessions: (dto?: GetClassSessionDto) => Promise<void>;
    getClassSessionsByClass: (classId: string, dto?: Omit<GetClassSessionDto, 'classId'>) => Promise<void>;
    getClassSessionsByDateRange: (dateFrom: string, dateTo: string, classId?: string) => Promise<void>;
    deleteClassSession: (id: string) => Promise<boolean>;
    getTodaySessionsForTeacher: () => Promise<void>;
    getUpcomingSessionsForClass: (classId: string, limit?: number) => Promise<ClassSession[]>;
    getTotalClassSessionsCount: () => Promise<number>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    classSessions: [],
    currentClassSession: null,
    todaySessions: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
    totalSessionsCount: 0, // Initialize total sessions count
};

export const useClassSessionStore = create<ClassSessionState>((set, get) => ({
    ...initialState,

    // State setters
    setClassSessions: (classSessions) => set({ classSessions }),
    setCurrentClassSession: (classSession) => set({ currentClassSession: classSession }),
    setTodaySessions: (sessions) => set({ todaySessions: sessions }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createClassSession: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newClassSession = await createClassSessionApi(dto);
            const { classSessions } = get();
            const currentClassSessions = Array.isArray(classSessions) ? classSessions : [];
            set({
                classSessions: [newClassSession, ...currentClassSessions],
                loading: false,
            });
            toast.success('Class session created successfully');
            return newClassSession;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create class session';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateClassSession: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedClassSession = await updateClassSessionApi(id, dto);
            const { classSessions, todaySessions } = get();
            const currentClassSessions = Array.isArray(classSessions) ? classSessions : [];
            const updatedClassSessions = currentClassSessions.map((session) =>
                session.id === id ? updatedClassSession : session
            );

            // Also update today's sessions if the updated session is in there
            const updatedTodaySessions = todaySessions.map((session) =>
                session.id === id ? updatedClassSession : session
            );

            set({
                classSessions: updatedClassSessions,
                todaySessions: updatedTodaySessions,
                currentClassSession: updatedClassSession,
                loading: false,
            });
            toast.success('Class session updated successfully');
            return updatedClassSession;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update class session';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getClassSessionById: async (id) => {
        set({ loading: true, error: null });
        try {
            const classSession = await getClassSessionByIdApi(id);
            set({
                currentClassSession: classSession,
                loading: false,
            });
            return classSession;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class session';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllClassSessions: async (dto) => {
        set({ loading: true, error: null });
        try {
            const response = await getAllClassSessionsApi(dto);
            console.log('Fetched class sessions:', response);
            const classSessions = Array.isArray(response) ? response : [];

            set({
                classSessions,
                pagination: {
                    page: response.page || dto?.page || 1,
                    limit: response.limit || dto?.limit || 10,
                    total: response.total || 0,
                    totalPages: response.totalPages || 0,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class sessions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getClassSessionsByClass: async (classId, dto) => {
        set({ loading: true, error: null });
        try {
            const classSessions = await getClassSessionsByClassApi(classId, dto);
            const sessionsList = Array.isArray(classSessions) ? classSessions : [];
            set({
                classSessions: sessionsList,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class sessions for class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getClassSessionsByDateRange: async (dateFrom, dateTo, classId) => {
        set({ loading: true, error: null });
        try {
            const classSessions = await getClassSessionsByDateRangeApi(dateFrom, dateTo, classId);
            const sessionsList = Array.isArray(classSessions) ? classSessions : [];
            set({
                classSessions: sessionsList,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class sessions by date range';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    deleteClassSession: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteClassSessionApi(id);
            const { classSessions, todaySessions } = get();
            const filteredClassSessions = classSessions.filter(
                (session) => session.id !== id
            );
            const filteredTodaySessions = todaySessions.filter(
                (session) => session.id !== id
            );
            set({
                classSessions: filteredClassSessions,
                todaySessions: filteredTodaySessions,
                loading: false,
            });
            toast.success('Class session deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete class session';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    getTodaySessionsForTeacher: async () => {
        set({ loading: true, error: null });
        try {
            const sessions = await getTodaySessionsForTeacherApi();
            const sessionsList = Array.isArray(sessions) ? sessions : [];
            set({
                todaySessions: sessionsList,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch today\'s sessions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getUpcomingSessionsForClass: async (classId, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const sessions = await getUpcomingSessionsForClassApi(classId, limit);
            const sessionsList = Array.isArray(sessions) ? sessions : [];
            set({ loading: false });
            return sessionsList;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch upcoming sessions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return [];
        }
    },

    getTotalClassSessionsCount: async () => {
        set({ loading: true, error: null });
        try {
            const totalCount = await getTotalClassSessionsCountApi();
            console.log('Total class sessions count:', totalCount);
            set({
                totalSessionsCount: totalCount,
                loading: false,
            });
            return totalCount;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch total class sessions count';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return 0;
        }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
}));
