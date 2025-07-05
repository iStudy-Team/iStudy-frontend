import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Payment,
    PaymentStatusEnum,
    CreatePaymentCredentials,
    SearchPaymentsDto,
    createPaymentApi,
    getAllPaymentsApi,
    getPaymentByIdApi,
    updatePaymentStatusToOverdueApi,
} from '@/api/payment';

interface PaymentState {
    payments: Payment[];
    currentPayment: Payment | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setPayments: (payments: Payment[]) => void;
    setCurrentPayment: (payment: Payment | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<PaymentState['pagination']>) => void;

    // API Actions
    createPayment: (dto: CreatePaymentCredentials) => Promise<Payment | null>;
    getAllPayments: (searchParams?: SearchPaymentsDto) => Promise<void>;
    getPaymentById: (id: string) => Promise<Payment | null>;
    updatePaymentStatusToOverdue: (id: string) => Promise<Payment | null>;
    clearError: () => void;
    reset: () => void;

    // Computed properties
    getPaymentsByStatus: (status?: PaymentStatusEnum) => Payment[];
    getTotalPaymentAmount: () => number;
    getPaymentStatistics: () => {
        totalPayments: number;
        totalAmount: number;
        unpaidCount: number;
        paidCount: number;
        overdueCount: number;
        cancelledCount: number;
    };
}

const initialState = {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const usePaymentStore = create<PaymentState>((set, get) => ({
    ...initialState,

    // State setters
    setPayments: (payments) => set({ payments }),
    setCurrentPayment: (payment) => set({ currentPayment: payment }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createPayment: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newPayment = await createPaymentApi(dto);
            const { payments } = get();
            const currentPayments = Array.isArray(payments) ? payments : [];
            set({
                payments: [newPayment, ...currentPayments],
                loading: false,
            });
            toast.success('Payment created successfully');
            return newPayment;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create payment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllPayments: async (searchParams) => {
        set({ loading: true, error: null });
        try {
            const response = await getAllPaymentsApi(searchParams);
            set({
                payments: Array.isArray(response.payments) ? response.payments : [],
                pagination: {
                    page: response.page || searchParams?.page || 1,
                    limit: response.limit || searchParams?.limit || 10,
                    total: response.total || 0,
                    totalPages: Math.ceil(
                        (response.total || 0) / (response.limit || searchParams?.limit || 10)
                    ),
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch payments';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getPaymentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const payment = await getPaymentByIdApi(id);
            set({
                currentPayment: payment,
                loading: false,
            });
            return payment;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch payment';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updatePaymentStatusToOverdue: async (id) => {
        set({ loading: true, error: null });
        try {
            const updatedPayment = await updatePaymentStatusToOverdueApi(id);
            const { payments } = get();
            const currentPayments = Array.isArray(payments) ? payments : [];
            const updatedPayments = currentPayments.map((payment) =>
                payment.id === id ? updatedPayment : payment
            );
            set({
                payments: updatedPayments,
                currentPayment: updatedPayment,
                loading: false,
            });
            toast.success('Payment status updated to overdue');
            return updatedPayment;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update payment status';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),

    // Computed properties
    getPaymentsByStatus: (status) => {
        const { payments } = get();
        if (status === undefined) return payments || [];
        return (payments || []).filter((payment) => payment.status === status);
    },

    getTotalPaymentAmount: () => {
        const { payments } = get();
        return (payments || []).reduce(
            (sum, payment) => sum + Number(payment.amount || 0),
            0
        );
    },

    getPaymentStatistics: () => {
        const { payments } = get();
        const safePayments = payments || [];

        const totalPayments = safePayments.length;
        const totalAmount = safePayments.reduce(
            (sum, payment) => sum + Number(payment.amount || 0),
            0
        );

        const unpaidCount = safePayments.filter(
            (payment) => payment.status === PaymentStatusEnum.UNPAID
        ).length;
        const paidCount = safePayments.filter(
            (payment) => payment.status === PaymentStatusEnum.PAID
        ).length;
        const overdueCount = safePayments.filter(
            (payment) => payment.status === PaymentStatusEnum.OVERDUE
        ).length;
        const cancelledCount = safePayments.filter(
            (payment) => payment.status === PaymentStatusEnum.CANCELLED
        ).length;

        return {
            totalPayments,
            totalAmount,
            unpaidCount,
            paidCount,
            overdueCount,
            cancelledCount,
        };
    },
}));
