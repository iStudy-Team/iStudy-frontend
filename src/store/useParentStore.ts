import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Parent,
    ParentCredentials,
    UpdateParentCredentials,
    SearchParentDto,
    createParentApi,
    updateParentApi,
    getParentByIdApi,
    deleteParentApi,
    getAllParentsApi,
    searchParentsApi,
} from '@/api/parent';

interface ParentState {
    parents: Parent[];
    currentParent: Parent | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setParents: (parents: Parent[]) => void;
    setCurrentParent: (parent: Parent | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<ParentState['pagination']>) => void;

    // API Actions
    createParent: (dto: ParentCredentials) => Promise<Parent | null>;
    updateParent: (
        id: string,
        dto: UpdateParentCredentials
    ) => Promise<Parent | null>;
    getParentById: (id: string) => Promise<Parent | null>;
    deleteParent: (id: string) => Promise<boolean>;
    searchParents: (searchTerm: string, dto?: SearchParentDto) => Promise<void>;
    getAllParents: () => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    parents: [],
    currentParent: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useParentStore = create<ParentState>((set, get) => ({
    ...initialState,

    // State setters
    setParents: (parents) => set({ parents }),
    setCurrentParent: (parent) => set({ currentParent: parent }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createParent: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newParent = await createParentApi(dto);
            const { parents } = get();
            set({
                parents: [newParent, ...parents],
                loading: false,
            });
            toast.success('Parent created successfully');
            return newParent;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create parent';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateParent: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedParent = await updateParentApi(id, dto);
            const { parents } = get();
            const updatedParents = parents.map((parent) =>
                parent.id === id ? updatedParent : parent
            );
            set({
                parents: updatedParents,
                currentParent: updatedParent,
                loading: false,
            });
            toast.success('Parent updated successfully');
            return updatedParent;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update parent';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getParentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const parent = await getParentByIdApi(id);
            set({
                currentParent: parent,
                loading: false,
            });
            return parent;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch parent';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteParent: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteParentApi(id);
            const { parents } = get();
            const filteredParents = parents.filter((parent) => parent.id !== id);
            set({
                parents: filteredParents,
                loading: false,
            });
            toast.success('Parent deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete parent';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    searchParents: async (searchTerm, dto) => {
        set({ loading: true, error: null });
        try {
            const response = await searchParentsApi(searchTerm, dto);
            set({
                parents: response.data || response,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to search parents';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAllParents: async () => {
        set({ loading: true, error: null });
        try {
            const parents = await getAllParentsApi();
            set({
                parents,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch parents';
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
