import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Attendance,
    CreateAttendanceDto,
    UpdateAttendanceDto,
    GetAttendanceDto,
    BulkAttendanceDto,
    createAttendanceApi,
    updateAttendanceApi,
    getAttendanceByIdApi,
    getAllAttendanceApi,
    getAttendanceByClassSessionApi,
    getAttendanceByStudentApi,
    createBulkAttendanceApi,
    updateBulkAttendanceApi,
    deleteAttendanceApi,
    getAttendanceStatsApi,
} from '@/api/attendance';

interface AttendanceState {
    attendances: Attendance[];
    currentAttendance: Attendance | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    stats: {
        totalSessions: number;
        present: number;
        absent: number;
        late: number;
        excused: number;
        attendanceRate: number;
    } | null;

    // Actions
    setAttendances: (attendances: Attendance[]) => void;
    setCurrentAttendance: (attendance: Attendance | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<AttendanceState['pagination']>) => void;
    setStats: (stats: AttendanceState['stats']) => void;

    // API Actions
    createAttendance: (dto: CreateAttendanceDto) => Promise<Attendance | null>;
    updateAttendance: (id: string, dto: UpdateAttendanceDto) => Promise<Attendance | null>;
    getAttendanceById: (id: string) => Promise<Attendance | null>;
    getAllAttendance: (dto?: GetAttendanceDto) => Promise<void>;
    getAttendanceByClassSession: (classSessionId: string) => Promise<void>;
    getAttendanceByStudent: (studentId: string, dto?: Omit<GetAttendanceDto, 'studentId'>) => Promise<void>;
    createBulkAttendance: (dto: BulkAttendanceDto) => Promise<Attendance[] | null>;
    updateBulkAttendance: (dto: BulkAttendanceDto) => Promise<Attendance[] | null>;
    deleteAttendance: (id: string) => Promise<boolean>;
    getAttendanceStats: (filters?: {
        classId?: string;
        studentId?: string;
        dateFrom?: string;
        dateTo?: string;
    }) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    attendances: [],
    currentAttendance: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
    stats: null,
};

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
    ...initialState,

    // State setters
    setAttendances: (attendances) => set({ attendances }),
    setCurrentAttendance: (attendance) => set({ currentAttendance: attendance }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),
    setStats: (stats) => set({ stats }),

    // API Actions
    createAttendance: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newAttendance = await createAttendanceApi(dto);
            const { attendances } = get();
            const currentAttendances = Array.isArray(attendances) ? attendances : [];
            set({
                attendances: [newAttendance, ...currentAttendances],
                loading: false,
            });
            toast.success('Attendance record created successfully');
            return newAttendance;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create attendance record';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateAttendance: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedAttendance = await updateAttendanceApi(id, dto);
            const { attendances } = get();
            const currentAttendances = Array.isArray(attendances) ? attendances : [];
            const updatedAttendances = currentAttendances.map((attendance) =>
                attendance.id === id ? updatedAttendance : attendance
            );
            set({
                attendances: updatedAttendances,
                currentAttendance: updatedAttendance,
                loading: false,
            });
            toast.success('Attendance record updated successfully');
            return updatedAttendance;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update attendance record';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getAttendanceById: async (id) => {
        set({ loading: true, error: null });
        try {
            const attendance = await getAttendanceByIdApi(id);
            set({
                currentAttendance: attendance,
                loading: false,
            });
            return attendance;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch attendance record';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllAttendance: async (dto) => {
        set({ loading: true, error: null });
        try {
            const response = await getAllAttendanceApi(dto);
            const attendances = Array.isArray(response.data) ? response.data : [];
            set({
                attendances,
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
                (error as Error).message || 'Failed to fetch attendance records';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAttendanceByClassSession: async (classSessionId) => {
        set({ loading: true, error: null });
        try {
            const attendances = await getAttendanceByClassSessionApi(classSessionId);
            const attendancesList = Array.isArray(attendances) ? attendances : [];
            set({
                attendances: attendancesList,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class session attendance';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAttendanceByStudent: async (studentId, dto) => {
        set({ loading: true, error: null });
        try {
            const attendances = await getAttendanceByStudentApi(studentId, dto);
            const attendancesList = Array.isArray(attendances) ? attendances : [];
            set({
                attendances: attendancesList,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch student attendance';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    createBulkAttendance: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newAttendances = await createBulkAttendanceApi(dto);
            const { attendances } = get();
            const currentAttendances = Array.isArray(attendances) ? attendances : [];
            set({
                attendances: [...newAttendances, ...currentAttendances],
                loading: false,
            });
            toast.success(`${newAttendances.length} attendance records created successfully`);
            return newAttendances;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create bulk attendance records';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateBulkAttendance: async (dto) => {
        set({ loading: true, error: null });
        try {
            const updatedAttendances = await updateBulkAttendanceApi(dto);
            const { attendances } = get();
            const currentAttendances = Array.isArray(attendances) ? attendances : [];

            // Update attendances in the store
            const attendanceMap = new Map(updatedAttendances.map(att => [att.id, att]));
            const newAttendances = currentAttendances.map(att =>
                attendanceMap.has(att.id) ? attendanceMap.get(att.id)! : att
            );

            set({
                attendances: newAttendances,
                loading: false,
            });
            toast.success(`${updatedAttendances.length} attendance records updated successfully`);
            return updatedAttendances;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update bulk attendance records';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteAttendance: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteAttendanceApi(id);
            const { attendances } = get();
            const filteredAttendances = attendances.filter(
                (attendance) => attendance.id !== id
            );
            set({
                attendances: filteredAttendances,
                loading: false,
            });
            toast.success('Attendance record deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete attendance record';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    getAttendanceStats: async (filters) => {
        set({ loading: true, error: null });
        try {
            const stats = await getAttendanceStatsApi(filters);
            set({
                stats,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch attendance statistics';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
}));
