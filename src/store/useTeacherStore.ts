import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Teacher,
    TeacherCredentials,
    UpdateTeacherCredentials,
    createTeacherApi,
    updateTeacherApi,
    getTeacherByIdApi,
    deleteTeacherApi,
    getAllTeachersApi,
} from '@/api/teacher';

interface TeacherState {
    teachers: Teacher[];
    currentTeacher: Teacher | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setTeachers: (teachers: Teacher[]) => void;
    setCurrentTeacher: (teacher: Teacher | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<TeacherState['pagination']>) => void;

    // API Actions
    createTeacher: (dto: TeacherCredentials) => Promise<Teacher | null>;
    updateTeacher: (id: string, dto: UpdateTeacherCredentials) => Promise<Teacher | null>;
    getTeacherById: (id: string) => Promise<Teacher | null>;
    deleteTeacher: (id: string) => Promise<boolean>;
    getAllTeachers: () => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    teachers: [],
    currentTeacher: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useTeacherStore = create<TeacherState>((set, get) => ({
    ...initialState,

    // State setters
    setTeachers: (teachers) => set({ teachers }),
    setCurrentTeacher: (teacher) => set({ currentTeacher: teacher }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createTeacher: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newTeacher = await createTeacherApi(dto);
            const { teachers } = get();
            set({
                teachers: [newTeacher, ...teachers],
                loading: false,
            });
            toast.success('Teacher created successfully');
            return newTeacher;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create teacher';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateTeacher: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedTeacher = await updateTeacherApi(id, dto);
            const { teachers } = get();
            const updatedTeachers = teachers.map((teacher) =>
                teacher.id === id ? updatedTeacher : teacher
            );
            set({
                teachers: updatedTeachers,
                currentTeacher: updatedTeacher,
                loading: false,
            });
            toast.success('Teacher updated successfully');
            return updatedTeacher;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update teacher';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getTeacherById: async (id) => {
        set({ loading: true, error: null });
        try {
            const teacher = await getTeacherByIdApi(id);
            set({
                currentTeacher: teacher,
                loading: false,
            });
            return teacher;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch teacher';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteTeacher: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteTeacherApi(id);
            const { teachers } = get();
            const filteredTeachers = teachers.filter(
                (teacher) => teacher.id !== id
            );
            set({
                teachers: filteredTeachers,
                loading: false,
            });
            toast.success('Teacher deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete teacher';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    getAllTeachers: async () => {
        set({ loading: true, error: null });
        try {
            const teachers = await getAllTeachersApi();
            set({
                teachers,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch teachers';
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
