import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Invoice,
    CreateInvoiceCredentials,
    CreateMultipleInvoiceCredentials,
    UpdateInvoiceCredentials,
    SearchInvoicesDto,
    createInvoiceApi,
    createMultipleInvoicesApi,
    getInvoicesByStudentApi,
    updateInvoiceApi,
    getInvoiceByIdApi,
} from '@/api/invoice';

interface InvoiceState {
    invoices: Invoice[];
    currentInvoice: Invoice | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // Actions
    setInvoices: (invoices: Invoice[]) => void;
    setCurrentInvoice: (invoice: Invoice | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPagination: (pagination: Partial<InvoiceState['pagination']>) => void;

    // API Actions
    createInvoice: (dto: CreateInvoiceCredentials) => Promise<Invoice | null>;
    createMultipleInvoices: (dto: CreateMultipleInvoiceCredentials) => Promise<Invoice[] | null>;
    updateInvoice: (id: string, dto: UpdateInvoiceCredentials) => Promise<Invoice | null>;
    getInvoiceById: (id: string, studentId: string) => Promise<Invoice | null>;
    getInvoicesByStudent: (studentId: string, searchParams?: SearchInvoicesDto) => Promise<void>;
    getAllInvoices: () => Promise<void>;
    clearError: () => void;
    reset: () => void;

    // Computed properties for fee management
    getTotalExpectedAmount: () => number;
    getTotalActualAmount: () => number;
    getTotalDiscountAmount: () => number;
    getOutstandingBalance: () => number;
    getInvoicesByStatus: (status?: string) => Invoice[];
    getFinancialSummary: () => {
        expectedIncome: number;
        actualIncome: number;
        totalDiscount: number;
        outstandingBalance: number;
        paidCount: number;
        pendingCount: number;
        overdueCount: number;
    };
}

const initialState = {
    invoices: [],
    currentInvoice: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
    ...initialState,

    // State setters
    setInvoices: (invoices) => set({ invoices }),
    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setPagination: (pagination) =>
        set((state) => ({
            pagination: { ...state.pagination, ...pagination },
        })),

    // API Actions
    createInvoice: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newInvoice = await createInvoiceApi(dto);
            const { invoices } = get();
            const currentInvoices = Array.isArray(invoices) ? invoices : [];
            set({
                invoices: [newInvoice, ...currentInvoices],
                loading: false,
            });
            toast.success('Invoice created successfully');
            return newInvoice;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create invoice';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    createMultipleInvoices: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newInvoices = await createMultipleInvoicesApi(dto);
            const { invoices } = get();
            const currentInvoices = Array.isArray(invoices) ? invoices : [];
            set({
                invoices: [...newInvoices, ...currentInvoices],
                loading: false,
            });
            toast.success(`${newInvoices.length} invoices created successfully`);
            return newInvoices;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to create multiple invoices';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    updateInvoice: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedInvoice = await updateInvoiceApi(id, dto);
            const { invoices } = get();
            const currentInvoices = Array.isArray(invoices) ? invoices : [];
            const updatedInvoices = currentInvoices.map((invoice) =>
                invoice.id === id ? updatedInvoice : invoice
            );
            set({
                invoices: updatedInvoices,
                currentInvoice: updatedInvoice,
                loading: false,
            });
            toast.success('Invoice updated successfully');
            return updatedInvoice;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to update invoice';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getInvoiceById: async (id, studentId) => {
        set({ loading: true, error: null });
        try {
            const invoice = await getInvoiceByIdApi(id, studentId);
            set({
                currentInvoice: invoice,
                loading: false,
            });
            return invoice;
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch invoice';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    getInvoicesByStudent: async (studentId, searchParams) => {
        set({ loading: true, error: null });
        try {
            const response = await getInvoicesByStudentApi(studentId, searchParams);
            const invoices = Array.isArray(response) ? response : [];
            set({
                invoices,
                pagination: {
                    page: searchParams?.page || 1,
                    limit: searchParams?.limit || 10,
                    total: invoices.length,
                    totalPages: Math.ceil(invoices.length / (searchParams?.limit || 10)),
                },
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch invoices';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    getAllInvoices: async () => {
        set({ loading: true, error: null });
        try {
            // This would need to be implemented on the backend - getting all invoices
            // For now, we'll use a placeholder implementation
            const invoices: Invoice[] = [];
            set({
                invoices,
                loading: false,
            });
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'Failed to fetch all invoices';
            set({
                error: errorMessage,
                loading: false,
            });
            toast.error(errorMessage);
        }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),

    // Computed properties for fee management
    getTotalExpectedAmount: () => {
        const { invoices } = get();
        return (invoices || []).reduce((sum, invoice) => sum + invoice.amount, 0);
    },

    getTotalActualAmount: () => {
        const { invoices } = get();
        return (invoices || []).reduce((sum, invoice) => sum + (invoice.final_amount || invoice.amount), 0);
    },

    getTotalDiscountAmount: () => {
        const { invoices } = get();
        return (invoices || []).reduce((sum, invoice) => sum + (invoice.discount_amount || 0), 0);
    },

    getOutstandingBalance: () => {
        const { invoices } = get();
        return (invoices || [])
            .filter(invoice => invoice.status !== 'PAID')
            .reduce((sum, invoice) => sum + (invoice.final_amount || invoice.amount), 0);
    },

    getInvoicesByStatus: (status) => {
        const { invoices } = get();
        if (!status) return invoices || [];
        return (invoices || []).filter(invoice => invoice.status === status);
    },

    getFinancialSummary: () => {
        const { invoices } = get();
        const safeInvoices = invoices || [];

        const expectedIncome = safeInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
        const actualIncome = safeInvoices.reduce((sum, invoice) => sum + (invoice.final_amount || invoice.amount), 0);
        const totalDiscount = safeInvoices.reduce((sum, invoice) => sum + (invoice.discount_amount || 0), 0);
        const outstandingBalance = safeInvoices
            .filter(invoice => invoice.status !== 'PAID')
            .reduce((sum, invoice) => sum + (invoice.final_amount || invoice.amount), 0);

        const paidCount = safeInvoices.filter(invoice => invoice.status === 'PAID').length;
        const pendingCount = safeInvoices.filter(invoice => invoice.status === 'PENDING').length;
        const overdueCount = safeInvoices.filter(invoice => invoice.status === 'OVERDUE').length;

        return {
            expectedIncome,
            actualIncome,
            totalDiscount,
            outstandingBalance,
            paidCount,
            pendingCount,
            overdueCount,
        };
    },
}));
