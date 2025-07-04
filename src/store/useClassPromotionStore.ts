import { create } from 'zustand';
import { toast } from 'sonner';
import {
    ClassPromotion,
    CreateClassPromotionDto,
    UpdateClassPromotionDto,
    ClassPromotionStatus,
    createClassPromotionApi,
    updateClassPromotionApi,
    getClassPromotionByIdApi,
    deleteClassPromotionApi,
    getAllClassPromotionsApi,
    getActiveClassPromotionsApi,
    getClassPromotionsByGradeLevelApi,
    getClassPromotionsByStatusApi,
} from '@/api/classPromotion';

interface ClassPromotionState {
    classPromotions: ClassPromotion[];
    currentClassPromotion: ClassPromotion | null;
    loading: boolean;
    error: string | null;

    // Actions
    setClassPromotions: (classPromotions: ClassPromotion[]) => void;
    setCurrentClassPromotion: (classPromotion: ClassPromotion | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // API Actions
    createClassPromotion: (dto: CreateClassPromotionDto) => Promise<ClassPromotion | null>;
    updateClassPromotion: (
        id: string,
        dto: UpdateClassPromotionDto
    ) => Promise<ClassPromotion | null>;
    getClassPromotionById: (id: string) => Promise<ClassPromotion | null>;
    deleteClassPromotion: (id: string) => Promise<boolean>;
    getAllClassPromotions: () => Promise<void>;
    getActiveClassPromotions: () => Promise<void>;
    getClassPromotionsByGradeLevel: (gradeLevelId: string) => Promise<void>;
    getClassPromotionsByStatus: (status: ClassPromotionStatus) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    classPromotions: [],
    currentClassPromotion: null,
    loading: false,
    error: null,
};

export const useClassPromotionStore = create<ClassPromotionState>((set, get) => ({
    ...initialState,

    // State setters
    setClassPromotions: (classPromotions) => set({ classPromotions }),
    setCurrentClassPromotion: (classPromotion) => set({ currentClassPromotion: classPromotion }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // API Actions
    createClassPromotion: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newClassPromotion = await createClassPromotionApi(dto);
            const { classPromotions } = get();
            set({
                classPromotions: [newClassPromotion, ...classPromotions],
                loading: false,
            });
            toast.success('Class promotion created successfully');
            return newClassPromotion;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create class promotion';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateClassPromotion: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedClassPromotion = await updateClassPromotionApi(id, dto);
            const { classPromotions } = get();
            const updatedClassPromotions = classPromotions.map((promotion) =>
                promotion.id === id ? updatedClassPromotion : promotion
            );
            set({
                classPromotions: updatedClassPromotions,
                currentClassPromotion: updatedClassPromotion,
                loading: false,
            });
            toast.success('Class promotion updated successfully');
            return updatedClassPromotion;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update class promotion';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getClassPromotionById: async (id) => {
        set({ loading: true, error: null });
        try {
            const classPromotion = await getClassPromotionByIdApi(id);
            set({
                currentClassPromotion: classPromotion,
                loading: false,
            });
            return classPromotion;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class promotion';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteClassPromotion: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteClassPromotionApi(id);
            const { classPromotions } = get();
            const filteredClassPromotions = classPromotions.filter(
                (promotion) => promotion.id !== id
            );
            set({
                classPromotions: filteredClassPromotions,
                loading: false,
            });
            toast.success('Class promotion deleted successfully');
            return true;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to delete class promotion';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return false;
        }
    },

    getAllClassPromotions: async () => {
        set({ loading: true, error: null });
        try {
            const classPromotions = await getAllClassPromotionsApi();
            set({
                classPromotions,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class promotions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getActiveClassPromotions: async () => {
        set({ loading: true, error: null });
        try {
            const classPromotions = await getActiveClassPromotionsApi();
            set({
                classPromotions,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch active class promotions';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getClassPromotionsByGradeLevel: async (gradeLevelId) => {
        set({ loading: true, error: null });
        try {
            const classPromotions = await getClassPromotionsByGradeLevelApi(gradeLevelId);
            set({
                classPromotions,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class promotions by grade level';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getClassPromotionsByStatus: async (status) => {
        set({ loading: true, error: null });
        try {
            const classPromotions = await getClassPromotionsByStatusApi(status);
            set({
                classPromotions,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch class promotions by status';
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
