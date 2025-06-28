import {
    type AcademicYearCredentials,
    type Academic,
    type AcademicYearCredentialsUpdateStatus,
    type AcademicYearResponse,
    createAcademicYearApi,
    getAllAcademicYearsApi,
    updateAcademicYearApi,
    getAcademicYearByIdApi,
    updateStatusAcademicYearApi,
} from '@/api/academic';
import { toast } from 'sonner';
import { create } from 'zustand';

interface StudyState {
    academicYears: Academic[];
    limit: number;
    page: number;
    totalCount: number;
    createAcademicYear: (
        credentials: AcademicYearCredentials
    ) => Promise<Academic>;
    getAllAcademicYears: (
        page?: number,
        limit?: number
    ) => Promise<AcademicYearResponse>;
    updateAcademicYear: (
        id: string,
        credentials: AcademicYearCredentials
    ) => Promise<Academic>;
    getAcademicYearById: (id: string) => Promise<Academic>;
    updateAcademicYearStatus: (
        id: string,
        credentials: { status: number }
    ) => Promise<Academic>;
    updateStatusAcademicYear: (
        id: string,
        credentials: AcademicYearCredentialsUpdateStatus
    ) => Promise<Academic>;
}

export const useAcademicStore = create<StudyState>((set) => ({
    academicYears: [],
    limit: 10,
    page: 1,
    totalCount: 0,
    createAcademicYear: async (credentials) => {
        try {
            const response = await createAcademicYearApi(credentials);
            console.log('Created Academic Year:', response);
            set((state) => ({
                academicYears: [...state.academicYears, response!],
            }));
            toast.success('Academic year created successfully');
            return response;
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to create academic year'
            );
            throw error;
        }
    },
    getAllAcademicYears: async (page?: number, limit?:number) => {
        try {
            const response = await getAllAcademicYearsApi(page, limit);
            set({
                academicYears: response.data,
                totalCount: response.totalCount,
                page: response.page,
                limit: response.limit,
            });
            return response;
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to fetch academic years'
            );
            throw error;
        }
    },
    updateAcademicYear: async (id, credentials) => {
        try {
            const response = await updateAcademicYearApi(id, credentials);
            set((state) => ({
                academicYears: state.academicYears.map((year) =>
                    year.id === id ? response! : year
                ),
            }));
            toast.success('Academic year updated successfully');
            return response;
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to update academic year'
            );
            throw error;
        }
    },
    getAcademicYearById: async (id) =>
        getAcademicYearByIdApi(id).catch((error) => {
            toast.error(
                (error as Error).message ||
                    'Failed to fetch academic year by ID'
            );
            throw error;
        }),
    updateAcademicYearStatus: async (id, credentials) => {
        try {
            const response = await updateStatusAcademicYearApi(id, credentials);
            set((state) => ({
                academicYears: state.academicYears.map((year) =>
                    year.id === id ? response! : year
                ),
            }));
            toast.success('Academic year status updated successfully');
            return response;
        } catch (error) {
            toast.error(
                (error as Error).message ||
                    'Failed to update academic year status'
            );
            throw error;
        }
    },
    updateStatusAcademicYear: async (id, credentials) => {
        try {
            const response = await updateStatusAcademicYearApi(id, credentials);
            set((state) => ({
                academicYears: state.academicYears.map((year) =>
                    year.id === id ? response! : year
                ),
            }));
            toast.success('Academic year status updated successfully');
            return response;
        } catch (error) {
            toast.error(
                (error as Error).message ||
                    'Failed to update academic year status'
            );
            throw error;
        }
    },
}));
