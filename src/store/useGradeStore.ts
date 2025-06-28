import { create } from 'zustand';
import {
    getAllGradesApi,
    createGradeApi,
    updateGradeApi,
    deleteGradeApi,
    getGradeByIdApi,
} from '@/api/grade';
import { Grade, GradeCredentials, GradeResponse, UpdateGradeCredentials } from '@/api/grade';
import { toast } from 'sonner';

interface GradeState {
    grades: Grade[];
    totalCount: number;
    page: number;
    limit: number;
    loading: boolean;

    fetchGrades: (page?: number, limit?: number) => Promise<GradeResponse>;
    createGrade: (credentials: GradeCredentials) => Promise<Grade>;
    updateGrade: (id: string, credentials: UpdateGradeCredentials) => Promise<Grade>;
    deleteGrade: (id: string) => Promise<void>;
    getGradeById: (id: string) => Promise<Grade>;
}

export const useGradeStore = create<GradeState>((set) => ({
    grades: [],
    totalCount: 0,
    page: 1,
    limit: 10,
    loading: false,

    fetchGrades: async (page = 1, limit = 10) => {
        set({ loading: true });
        try {
            const response = await getAllGradesApi(page, limit);
            set({
                grades: response.data,
                totalCount: response.totalCount,
                page: response.page,
                limit: response.limit,
                loading: false,
            });
            return response;
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    createGrade: async (credentials) => {
        set({ loading: true });
        try {
            const grade = await createGradeApi(credentials);
            set((state) => ({
                grades: [...state.grades, grade],
                loading: false,
            }));
            toast.success('Grade created successfully');
            return grade;
        } catch (error) {
            set({ loading: false });
            toast.error((error as Error).message || 'Failed to create grade');
            throw error;
        }
    },

    updateGrade: async (id, credentials) => {
        set({ loading: true });
        try {
            const grade = await updateGradeApi(id, credentials);
            set((state) => ({
                grades: state.grades.map((g) => (g.id === id ? grade : g)),
                loading: false,
            }));
            toast.success('Grade updated successfully');
            return grade;
        } catch (error) {
            set({ loading: false });
            toast.error((error as Error).message || 'Failed to update grade');
            throw error;
        }
    },

    deleteGrade: async (id) => {
        set({ loading: true });
        try {
            await deleteGradeApi(id);
            set((state) => ({
                grades: state.grades.filter((g) => g.id !== id),
                loading: false,
            }));
            toast.success('Grade deleted successfully');
        } catch (error) {
            set({ loading: false });
            toast.error((error as Error).message || 'Failed to delete grade');
            throw error;
        }
    },

    getGradeById: async (id) => {
        set({ loading: true });
        try {
            const grade = await getGradeByIdApi(id);
            set({ loading: false });
            return grade;
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },
}));
