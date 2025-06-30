import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Student,
    StudentCredentials,
    UpdateStudentCredentials,
    SearchStudentDto,
    createStudentApi,
    updateStudentApi,
    getStudentByIdApi,
    deleteStudentApi,
    getAllStudentsApi,
    searchStudentsApi,
} from '@/api/student';

interface StudentState {
    students: Student[];
    currentStudent: Student | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setStudents: (students: Student[]) => void;
    setCurrentStudent: (student: Student | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<StudentState['pagination']>) => void;

    // API Actions
    createStudent: (dto: StudentCredentials) => Promise<Student | null>;
    updateStudent: (
        id: string,
        dto: UpdateStudentCredentials
    ) => Promise<Student | null>;
    getStudentById: (id: string) => Promise<Student | null>;
    deleteStudent: (id: string) => Promise<boolean>;
    searchStudents: (searchTerm: string, dto?: SearchStudentDto) => Promise<void>;
    getAllStudents: () => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    students: [],
    currentStudent: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useStudentStore = create<StudentState>((set, get) => ({
    ...initialState,

    // State setters
    setStudents: (students) => set({ students }),
    setCurrentStudent: (student) => set({ currentStudent: student }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createStudent: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newStudent = await createStudentApi(dto);
            const { students } = get();
            set({
                students: [newStudent, ...students],
                loading: false,
            });
            toast.success('Student created successfully');
            return newStudent;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create student';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateStudent: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedStudent = await updateStudentApi(id, dto);
            const { students } = get();
            const updatedStudents = students.map((student) =>
                student.id === id ? updatedStudent : student
            );
            set({
                students: updatedStudents,
                currentStudent: updatedStudent,
                loading: false,
            });
            toast.success('Student updated successfully');
            return updatedStudent;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update student';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getStudentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const student = await getStudentByIdApi(id);
            set({
                currentStudent: student,
                loading: false,
            });
            return student;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch student';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteStudent: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteStudentApi(id);
            const { students } = get();
            const filteredStudents = students.filter((student) => student.id !== id);
            set({
                students: filteredStudents,
                loading: false,
            });
            toast.success('Student deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete student';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    searchStudents: async (searchTerm, dto) => {
        set({ loading: true, error: null });
        try {
            const response = await searchStudentsApi(searchTerm, dto);
            set({
                students: response.data || response,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to search students';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAllStudents: async () => {
        set({ loading: true, error: null });
        try {
            const students = await getAllStudentsApi();
            set({
                students,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch students';
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
