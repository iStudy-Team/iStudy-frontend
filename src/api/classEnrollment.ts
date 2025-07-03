import { api } from './api';

export enum ClassEnrollmentStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    COMPLETED = 2,
}

export interface ClassEnrollment {
    id: string;
    class_id: string;
    student_id: string;
    enrollment_date: string | Date;
    end_date?: string | Date | null;
    status: ClassEnrollmentStatus;
    tuition_fee?: string;
    original_fee?: string;
    discount_percentage: number;
}

export interface CreateClassEnrollmentDto {
    class_id: string;
    enrollment_date?: string;
    end_date?: string;
    status?: ClassEnrollmentStatus;
    tuition_fee?: string;
    original_fee?: string;
    discount_percentage?: number;
}

export interface UpdateClassEnrollmentDto {
    class_id?: string;
    student_id?: string;
    enrollment_date?: string;
    end_date?: string;
    status?: ClassEnrollmentStatus;
    tuition_fee?: string;
    original_fee?: string;
    discount_percentage?: number;
}

export interface ClassEnrollmentPaginationResponse {
    data: ClassEnrollment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Create a new class enrollment (student enrolls in a class)
export async function createClassEnrollmentApi(dto: CreateClassEnrollmentDto): Promise<ClassEnrollment> {
    const response = await api.post('api/v1/class-enrollment', dto);
    return response.data;
}

// Update an existing class enrollment
export async function updateClassEnrollmentApi(
    id: string,
    dto: UpdateClassEnrollmentDto
): Promise<ClassEnrollment> {
    const response = await api.put(`api/v1/class-enrollment/${id}`, dto);
    return response.data;
}

// Delete a class enrollment (student unenrolls from a class)
export async function deleteClassEnrollmentApi(id: string): Promise<void> {
    await api.delete(`api/v1/class-enrollment/${id}`);
}

// Get class enrollments for the current user (student)
export async function getMyClassEnrollmentsApi(
    page?: number,
    limit?: number
): Promise<ClassEnrollmentPaginationResponse> {
    const response = await api.get('api/v1/class-enrollment/get-by-req-user', {
        params: { page, limit },
    });
    return response.data;
}

// Enroll in a class (convenience function)
export async function enrollInClassApi(classId: string): Promise<ClassEnrollment> {
    const enrollmentData: CreateClassEnrollmentDto = {
        class_id: classId,
        enrollment_date: new Date().toISOString(),
        status: ClassEnrollmentStatus.ACTIVE,
    };
    return createClassEnrollmentApi(enrollmentData);
}

// Unenroll from a class (convenience function)
export async function unenrollFromClassApi(enrollmentId: string): Promise<void> {
    return deleteClassEnrollmentApi(enrollmentId);
}

// Update enrollment status (convenience function)
export async function updateEnrollmentStatusApi(
    enrollmentId: string,
    status: ClassEnrollmentStatus
): Promise<ClassEnrollment> {
    return updateClassEnrollmentApi(enrollmentId, { status });
}

// Get a specific class enrollment by ID
export async function getClassEnrollmentByIdApi(id: string): Promise<ClassEnrollment> {
    const response = await api.get(`api/v1/class-enrollment/${id}`);
    return response.data;
}

// Get all enrollments for a specific class (for admin/teacher use)
export async function getClassEnrollmentsByClassIdApi(
    classId: string,
    page?: number,
    limit?: number
): Promise<ClassEnrollmentPaginationResponse> {
    const response = await api.get(`api/v1/class-enrollment/class/${classId}`, {
        params: { page, limit },
    });
    return response.data;
}

// Batch enroll students in a class (for admin use)
export async function batchEnrollStudentsApi(
    classId: string,
    studentIds: string[]
): Promise<ClassEnrollment[]> {
    const response = await api.post(`api/v1/class-enrollment/batch-enroll`, {
        class_id: classId,
        student_ids: studentIds,
    });
    return response.data;
}

// Check if a student is enrolled in a specific class
export async function checkEnrollmentStatusApi(classId: string): Promise<{
    isEnrolled: boolean;
    enrollment?: ClassEnrollment
}> {
    try {
        const response = await api.get(`api/v1/class-enrollment/check/${classId}`);
        return { isEnrolled: true, enrollment: response.data };
    } catch {
        // If 404, student is not enrolled
        return { isEnrolled: false };
    }
}

// Get students enrolled in a specific class (returns student data with enrollment info)
export async function getStudentsByClassIdApi(
    classId: string,
    page?: number,
    limit?: number
): Promise<{
    data: Array<{
        id: string;
        enrollment: ClassEnrollment;
        student: {
            id: string;
            user_id: string;
            full_name: string;
            gender: number;
            date_of_birth?: Date;
            address?: string;
            enrollment_date?: Date;
            status: number;
            user?: {
                id: string;
                email: string;
                phone?: string;
                avatar?: string;
            };
        };
    }>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}> {
    const response = await api.get(`api/v1/class-enrollment/class/${classId}/students`, {
        params: { page, limit },
    });
    return response.data;
}
