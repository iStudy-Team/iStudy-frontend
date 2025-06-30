import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Class,
    ClassCredentials,
    UpdateClassCredentials,
    SearchClassDto,
    createClassApi,
    updateClassApi,
    getClassByIdApi,
    deleteClassApi,
    searchClassesApi,
    getAllClassesApi,
    getPaginationClassesApi,
} from '@/api/class';

interface ClassState {
    classes: Class[];
    currentClass: Class | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setClasses: (classes: Class[]) => void;
    setCurrentClass: (classItem: Class | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<ClassState['pagination']>) => void;

    // API Actions
    createClass: (dto: ClassCredentials) => Promise<Class | null>;
    updateClass: (
        id: string,
        dto: UpdateClassCredentials
    ) => Promise<Class | null>;
    getClassById: (id: string) => Promise<Class | null>;
    deleteClass: (id: string) => Promise<boolean>;
    searchClasses: (searchTerm: string, dto?: SearchClassDto) => Promise<void>;
    getAllClasses: () => Promise<void>;
    getClasses: (page?: number, limit?: number) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    classes: [],
    currentClass: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useClassStore = create<ClassState>((set, get) => ({
    ...initialState,

    // State setters
    setClasses: (classes) => set({ classes }),
    setCurrentClass: (classItem) => set({ currentClass: classItem }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createClass: async (dto) => {
        console.log('Creating class with data:', dto);
        set({ loading: true, error: null });
        try {
            const newClass = await createClassApi(dto);
            const { classes } = get();
            set({
                classes: [newClass, ...classes],
                loading: false,
            });
            toast.success('Class created successfully');
            return newClass;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateClass: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedClass = await updateClassApi(id, dto);
            const { classes } = get();
            const updatedClasses = classes.map((classItem) =>
                classItem.id === id ? updatedClass : classItem
            );
            set({
                classes: updatedClasses,
                currentClass: updatedClass,
                loading: false,
            });
            toast.success('Class updated successfully');
            return updatedClass;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getClassById: async (id) => {
        set({ loading: true, error: null });
        try {
            const classItem = await getClassByIdApi(id);
            set({
                currentClass: classItem,
                loading: false,
            });
            return classItem;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteClass: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteClassApi(id);
            const { classes } = get();
            const filteredClasses = classes.filter(
                (classItem) => classItem.id !== id
            );
            set({
                classes: filteredClasses,
                loading: false,
            });
            toast.success('Class deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete class';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    searchClasses: async (searchTerm, dto) => {
        set({ loading: true, error: null });
        try {
            const response = await searchClassesApi(searchTerm, dto);
            set({
                classes: response.data || response || [],
                pagination: {
                    page: dto?.page || 1,
                    limit: dto?.limit || 10,
                    total: response.total || 0,
                    totalPages: response.totalPages || 0,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to search classes';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAllClasses: async () => {
        set({ loading: true, error: null });
        try {
            const classes = await getAllClassesApi();
            set({
                classes,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch all classes';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getClasses: async (page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const response = await getPaginationClassesApi({
                page,
                limit,
            });

            set({
                classes: response.classes || [],
                pagination: {
                    page,
                    limit,
                    total: response.total || 0,
                    totalPages: response.totalPages || 0,
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch classes';
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
