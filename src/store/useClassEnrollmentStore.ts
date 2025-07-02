import { create } from 'zustand';
import { toast } from 'sonner';
import {
    ClassEnrollment,
    CreateClassEnrollmentDto,
    UpdateClassEnrollmentDto,
    createClassEnrollmentApi,
    updateClassEnrollmentApi,
    deleteClassEnrollmentApi,
    getMyClassEnrollmentsApi,
    enrollInClassApi,
    unenrollFromClassApi,
    updateEnrollmentStatusApi,
    getClassEnrollmentByIdApi,
    getClassEnrollmentsByClassIdApi,
    checkEnrollmentStatusApi,
    ClassEnrollmentStatus,
} from '@/api/classEnrollment';

interface ClassEnrollmentState {
    enrollments: ClassEnrollment[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setEnrollments: (enrollments: ClassEnrollment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<ClassEnrollmentState['pagination']>) => void;

    // API Actions
    createEnrollment: (dto: CreateClassEnrollmentDto) => Promise<ClassEnrollment | null>;
    updateEnrollment: (id: string, dto: UpdateClassEnrollmentDto) => Promise<ClassEnrollment | null>;
    deleteEnrollment: (id: string) => Promise<boolean>;
    getMyEnrollments: (page?: number, limit?: number) => Promise<void>;
    enrollInClass: (classId: string) => Promise<ClassEnrollment | null>;
    unenrollFromClass: (enrollmentId: string) => Promise<boolean>;
    updateEnrollmentStatus: (enrollmentId: string, status: ClassEnrollmentStatus) => Promise<ClassEnrollment | null>;

    // Additional API actions
    getEnrollmentById: (id: string) => Promise<ClassEnrollment | null>;
    getClassEnrollments: (classId: string, page?: number, limit?: number) => Promise<void>;
    checkEnrollmentStatus: (classId: string) => Promise<{ isEnrolled: boolean; enrollment?: ClassEnrollment }>;

    // Helper functions
    isEnrolledInClass: (classId: string) => boolean;
    getEnrollmentByClassId: (classId: string) => ClassEnrollment | null;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    enrollments: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useClassEnrollmentStore = create<ClassEnrollmentState>((set, get) => ({
    ...initialState,

    // State setters
    setEnrollments: (enrollments) => set({ enrollments }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createEnrollment: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newEnrollment = await createClassEnrollmentApi(dto);
            const { enrollments } = get();
            set({
                enrollments: [newEnrollment, ...enrollments],
                loading: false,
            });
            toast.success('Đăng ký lớp học thành công');
            return newEnrollment;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to create enrollment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Đăng ký thất bại: ${errorMessage}`);
            return null;
        }
    },

    updateEnrollment: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedEnrollment = await updateClassEnrollmentApi(id, dto);
            const { enrollments } = get();
            const updatedEnrollments = enrollments.map((enrollment) =>
                enrollment.id === id ? updatedEnrollment : enrollment
            );
            set({
                enrollments: updatedEnrollments,
                loading: false,
            });
            toast.success('Cập nhật đăng ký thành công');
            return updatedEnrollment;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to update enrollment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Cập nhật thất bại: ${errorMessage}`);
            return null;
        }
    },

    deleteEnrollment: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteClassEnrollmentApi(id);
            const { enrollments } = get();
            const filteredEnrollments = enrollments.filter(
                (enrollment) => enrollment.id !== id
            );
            set({
                enrollments: filteredEnrollments,
                loading: false,
            });
            toast.success('Hủy đăng ký thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to delete enrollment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Hủy đăng ký thất bại: ${errorMessage}`);
            return false;
        }
    },

    getMyEnrollments: async (page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const response = await getMyClassEnrollmentsApi(page, limit);
            set({
                enrollments: response.data || [],
                pagination: {
                    page: response.page || page,
                    limit: response.limit || limit,
                    total: response.total || 0,
                    totalPages: response.totalPages || 0,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch enrollments';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Không thể tải danh sách đăng ký: ${errorMessage}`);
        }
    },

    enrollInClass: async (classId) => {
        set({ loading: true, error: null });
        try {
            const newEnrollment = await enrollInClassApi(classId);
            const { enrollments } = get();
            set({
                enrollments: [newEnrollment, ...enrollments],
                loading: false,
            });
            toast.success('Đăng ký lớp học thành công');
            return newEnrollment;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to enroll in class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Đăng ký thất bại: ${errorMessage}`);
            return null;
        }
    },

    unenrollFromClass: async (enrollmentId) => {
        set({ loading: true, error: null });
        try {
            await unenrollFromClassApi(enrollmentId);
            const { enrollments } = get();
            const filteredEnrollments = enrollments.filter(
                (enrollment) => enrollment.id !== enrollmentId
            );
            set({
                enrollments: filteredEnrollments,
                loading: false,
            });
            toast.success('Hủy đăng ký thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to unenroll from class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Hủy đăng ký thất bại: ${errorMessage}`);
            return false;
        }
    },

    updateEnrollmentStatus: async (enrollmentId, status) => {
        set({ loading: true, error: null });
        try {
            const updatedEnrollment = await updateEnrollmentStatusApi(enrollmentId, status);
            const { enrollments } = get();
            const updatedEnrollments = enrollments.map((enrollment) =>
                enrollment.id === enrollmentId ? updatedEnrollment : enrollment
            );
            set({
                enrollments: updatedEnrollments,
                loading: false,
            });
            toast.success('Cập nhật trạng thái thành công');
            return updatedEnrollment;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to update enrollment status';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Cập nhật trạng thái thất bại: ${errorMessage}`);
            return null;
        }
    },

    // Additional API actions
    getEnrollmentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const enrollment = await getClassEnrollmentByIdApi(id);
            set({
                loading: false,
            });
            return enrollment;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch enrollment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Không thể tải thông tin đăng ký: ${errorMessage}`);
            return null;
        }
    },

    getClassEnrollments: async (classId, page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const response = await getClassEnrollmentsByClassIdApi(classId, page, limit);
            set({
                enrollments: response.data || [],
                pagination: {
                    page: response.page || page,
                    limit: response.limit || limit,
                    total: response.total || 0,
                    totalPages: response.totalPages || 0,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch class enrollments';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(`Không thể tải danh sách đăng ký lớp học: ${errorMessage}`);
        }
    },

    checkEnrollmentStatus: async (classId) => {
        try {
            const result = await checkEnrollmentStatusApi(classId);
            return result;
        } catch (error) {
            console.error('Error checking enrollment status:', error);
            return { isEnrolled: false };
        }
    },

    // Helper functions
    isEnrolledInClass: (classId) => {
        console.log('Checking enrollment status for classId:', classId);
        const { enrollments } = get();
        console.log('Current enrollments:', enrollments);
        return enrollments.some(
            (enrollment) =>
                enrollment.class_id === classId &&
                enrollment.status === ClassEnrollmentStatus.ACTIVE
        );
    },

    getEnrollmentByClassId: (classId) => {
        const { enrollments } = get();
        return enrollments.find(
            (enrollment) =>
                enrollment.class_id === classId &&
                enrollment.status === ClassEnrollmentStatus.ACTIVE
        ) || null;
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
}));
