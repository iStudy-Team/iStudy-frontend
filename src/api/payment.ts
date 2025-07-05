import { api } from './api';

export enum PaymentStatusEnum {
    UNPAID = 0,
    PAID = 1,
    OVERDUE = 2,
    CANCELLED = 3,
}

export interface QRData {
    QR?: string;
    bank?: {
        id: string;
        account_holder_name: string;
        account_number: string;
        accumulated: string;
        last_transaction: string;
        label: string;
        active: string;
        created_at: string;
        bank_short_name: string;
        bank_full_name: string;
        bank_bin: string;
        bank_code: string;
    };
    [key: string]: unknown;
}

export interface Payment {
    id: string;
    invoice_id: string;
    payment_date: Date | string;
    amount: number;
    reference_number?: string;
    received_by: string;
    status: PaymentStatusEnum;
    notes?: string;
    created_at: Date | string;

    // Relations
    invoice?: {
        id: string;
        student_id: string;
        status: number;
        final_amount: number;
    };
    receivedBy?: {
        id: string;
        username: string;
    };
    dataQR?: QRData; // QR code data from SePay service
}

export type CreatePaymentCredentials = Pick<
    Payment,
    | 'invoice_id'
    | 'payment_date'
    | 'amount'
    | 'reference_number'
    | 'received_by'
    | 'notes'
>;

export interface SearchPaymentsDto {
    page?: number;
    limit?: number;
    searchTerm?: string;
    status?: PaymentStatusEnum;
    startDate?: string;
    endDate?: string;
    invoiceId?: string;
}

export interface PaymentResponse {
    payments: Payment[];
    total: number;
    page: number;
    limit: number;
}

// Create payment
export async function createPaymentApi(dto: CreatePaymentCredentials): Promise<Payment> {
    const payload = {
        ...dto,
        payment_date: dto.payment_date instanceof Date ? dto.payment_date.toISOString() : dto.payment_date,
    };
    const response = await api.post('api/v1/payment', payload);
    return response.data;
}

// Get all payments
export async function getAllPaymentsApi(searchParams?: SearchPaymentsDto): Promise<PaymentResponse> {
    const response = await api.get('api/v1/payment', {
        params: searchParams,
    });
    return response.data;
}

// Get payment by ID
export async function getPaymentByIdApi(id: string): Promise<Payment> {
    const response = await api.get(`api/v1/payment/${id}`);
    return response.data;
}

// Update payment status to overdue
export async function updatePaymentStatusToOverdueApi(id: string): Promise<Payment> {
    const response = await api.put(`api/v1/payment/${id}`);
    return response.data;
}
