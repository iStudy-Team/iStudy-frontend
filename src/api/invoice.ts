import { api } from './api';
import { Student } from './student';

export enum InvoiceStatusEnum {
    UNPAID = 0,
    PAID = 1,
    OVERDUE = 2,
    CANCELLED = 3,
}

export interface Invoice {
    id: string;
    student_id: string;
    class_id: string;
    invoice_number: string;
    month: number;
    year: number;
    amount: number;
    discount_amount?: number;
    final_amount?: number;
    issue_date?: Date;
    due_date?: Date;
    status: InvoiceStatusEnum;
    description?: string;
    created_at: Date;
    updated_at: Date;
    student?: Student; // Optional, for populating student details
}

export type CreateInvoiceCredentials = Pick<
    Invoice,
    | 'student_id'
    | 'class_id'
    | 'invoice_number'
    | 'month'
    | 'year'
    | 'amount'
    | 'discount_amount'
    | 'issue_date'
    | 'due_date'
    | 'status'
    | 'description'
>;

export type CreateMultipleInvoiceCredentials = Pick<
    Invoice,
    | 'class_id'
    | 'invoice_number'
    | 'month'
    | 'year'
    | 'amount'
    | 'discount_amount'
    | 'issue_date'
    | 'due_date'
    | 'status'
    | 'description'
>;

export type UpdateInvoiceCredentials = Partial<CreateInvoiceCredentials>;

export interface SearchInvoicesDto {
    page?: number;
    limit?: number;
}

// Create single invoice
export async function createInvoiceApi(
    dto: CreateInvoiceCredentials
): Promise<Invoice> {
    const payload = {
        ...dto,
        issue_date: dto.issue_date?.toISOString(),
        due_date: dto.due_date?.toISOString(),
    };
    const response = await api.post('api/v1/invoice', payload);
    return response.data;
}

// Create multiple invoices for a class
export async function createMultipleInvoicesApi(
    dto: CreateMultipleInvoiceCredentials
): Promise<Invoice[]> {
    const payload = {
        ...dto,
        issue_date: dto.issue_date?.toISOString(),
        due_date: dto.due_date?.toISOString(),
    };
    const response = await api.post('api/v1/invoice/multiple', payload);
    return response.data;
}

// Get all invoices for a student
export async function getInvoicesByStudentApi(
    studentId: string,
    searchParams?: SearchInvoicesDto
): Promise<{
    invoices: Invoice[];
    total: number;
    page: number;
    limit: number;
}> {
    const response = await api.get(
        `api/v1/invoice/get-by-student/${studentId}`,
        {
            params: searchParams,
        }
    );
    return response.data;
}

// Update invoice
export async function updateInvoiceApi(
    id: string,
    dto: UpdateInvoiceCredentials
): Promise<Invoice> {
    const payload = {
        ...dto,
        issue_date: dto.issue_date?.toISOString(),
        due_date: dto.due_date?.toISOString(),
    };
    const response = await api.put(`api/v1/invoice/${id}`, payload);
    return response.data;
}

// Get invoice by ID
export async function getInvoiceByIdApi(
    id: string,
    studentId: string
): Promise<Invoice> {
    const response = await api.get(
        `api/v1/invoice/get-by-id/${id}/${studentId}`
    );
    return response.data;
}

// Get all invoices (for admin)
export async function getAllInvoicesApi(
    searchParams?: SearchInvoicesDto
): Promise<{
    invoices: Invoice[];
    total: number;
    page: number;
    limit: number;
}> {
    const response = await api.get('api/v1/invoice/all', {
        params: searchParams,
    });
    return response.data;
}
