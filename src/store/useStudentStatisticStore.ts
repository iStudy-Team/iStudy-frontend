import { create } from 'zustand';
import { toast } from 'sonner';
import {
    StudentStatistic,
    CreateStudentStatisticDto,
    UpdateStudentStatisticDto,
    StatisticQuery,
    createStudentStatisticApi,
    updateStudentStatisticApi,
    getStudentStatisticByIdApi,
    getAllStudentStatisticsApi,
    getStudentStatisticsByDateRangeApi,
    deleteStudentStatisticApi,
} from '@/api/studentStatistic';

interface StudentStatisticState {
    statistics: StudentStatistic[];
    currentStatistic: StudentStatistic | null;
    loading: boolean;
    error: string | null;

    // Actions
    setStatistics: (statistics: StudentStatistic[]) => void;
    setCurrentStatistic: (statistic: StudentStatistic | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // API Actions
    createStatistic: (dto: CreateStudentStatisticDto) => Promise<StudentStatistic | null>;
    updateStatistic: (
        id: string,
        dto: UpdateStudentStatisticDto
    ) => Promise<StudentStatistic | null>;
    getStatisticById: (id: string) => Promise<StudentStatistic | null>;
    getAllStatistics: (query?: StatisticQuery) => Promise<void>;
    getStatisticsByDateRange: (
        startYear: number,
        endYear: number,
        startMonth?: number,
        endMonth?: number
    ) => Promise<void>;
    deleteStatistic: (id: string) => Promise<boolean>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    statistics: [],
    currentStatistic: null,
    loading: false,
    error: null,
};

export const useStudentStatisticStore = create<StudentStatisticState>((set, get) => ({
    ...initialState,

    // Basic setters
    setStatistics: (statistics) => set({ statistics }),
    setCurrentStatistic: (currentStatistic) => set({ currentStatistic }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // API Actions
    createStatistic: async (dto: CreateStudentStatisticDto) => {
        try {
            set({ loading: true, error: null });
            const statistic = await createStudentStatisticApi(dto);

            // Add to existing statistics
            const { statistics } = get();
            set({
                statistics: [statistic, ...statistics],
                currentStatistic: statistic
            });

            toast.success('Tạo thống kê học sinh thành công');
            return statistic;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo thống kê';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return null;
        } finally {
            set({ loading: false });
        }
    },

    updateStatistic: async (id: string, dto: UpdateStudentStatisticDto) => {
        try {
            set({ loading: true, error: null });
            const updatedStatistic = await updateStudentStatisticApi(id, dto);

            // Update in existing statistics
            const { statistics } = get();
            const updatedStatistics = statistics.map(stat =>
                stat.id === id ? updatedStatistic : stat
            );

            set({
                statistics: updatedStatistics,
                currentStatistic: updatedStatistic
            });

            toast.success('Cập nhật thống kê học sinh thành công');
            return updatedStatistic;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật thống kê';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return null;
        } finally {
            set({ loading: false });
        }
    },

    getStatisticById: async (id: string) => {
        try {
            set({ loading: true, error: null });
            const statistic = await getStudentStatisticByIdApi(id);
            set({ currentStatistic: statistic });
            return statistic;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải thống kê';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return null;
        } finally {
            set({ loading: false });
        }
    },

    getAllStatistics: async (query?: StatisticQuery) => {
        try {
            set({ loading: true, error: null });
            const statistics = await getAllStudentStatisticsApi(query);
            set({ statistics });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải danh sách thống kê';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ loading: false });
        }
    },

    getStatisticsByDateRange: async (
        startYear: number,
        endYear: number,
        startMonth?: number,
        endMonth?: number
    ) => {
        try {
            set({ loading: true, error: null });
            const statistics = await getStudentStatisticsByDateRangeApi(
                startYear,
                endYear,
                startMonth,
                endMonth
            );
            set({ statistics });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải thống kê theo khoảng thời gian';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ loading: false });
        }
    },

    deleteStatistic: async (id: string) => {
        try {
            set({ loading: true, error: null });
            await deleteStudentStatisticApi(id);

            // Remove from existing statistics
            const { statistics } = get();
            const filteredStatistics = statistics.filter(stat => stat.id !== id);
            set({ statistics: filteredStatistics });

            // Clear current statistic if it was deleted
            if (get().currentStatistic?.id === id) {
                set({ currentStatistic: null });
            }

            toast.success('Xóa thống kê học sinh thành công');
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi xóa thống kê';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
    reset: () => set(initialState),
}));
