import { Academic } from '@/api/academic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAcademicStore } from '@/store/useAcademicStore';
import { useState } from 'react';

// Form Schemas
const courseFormSchema = z.object({
    school_year: z
        .string()
        .min(1, 'Tên khóa học là bắt buộc')
        .max(20, 'Tên khóa học không quá 20 ký tự'),
    start_date: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
    end_date: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
    status: z.number().min(0).max(2),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

export const AcademicForm = ({
    initialData,
    onCancel,
    currentCourse,
    closeModal,
}: {
    initialData?: Academic;
    onCancel: () => void;
    currentCourse?: Academic | null;
    closeModal: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: initialData || {
            school_year: '',
            start_date: '',
            end_date: '',
            status: 1,
        },
    });

    const { updateAcademicYear, createAcademicYear } = useAcademicStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitCourse = async (data: CourseFormValues) => {
        setIsLoading(true);

        if (currentCourse) {
            // Update existing course
            await updateAcademicYear(currentCourse.id, {
                ...data,
                start_date: data.start_date
                    ? new Date(data.start_date).toISOString()
                    : undefined,
                end_date: data.end_date
                    ? new Date(data.end_date).toISOString()
                    : undefined,
            });
            setIsLoading(false);
            closeModal();
        } else {
            await createAcademicYear({
                ...data,
                start_date: data.start_date
                    ? new Date(data.start_date).toISOString()
                    : undefined,
                end_date: data.end_date
                    ? new Date(data.end_date).toISOString()
                    : undefined,
            });
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitCourse)} className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Tên khóa học *
                </label>
                <input
                    {...register('school_year')}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.school_year ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Ví dụ: 2024-2025"
                />
                {errors.school_year && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.school_year.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày bắt đầu *
                    </label>
                    <input
                        {...register('start_date')}
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg ${errors.start_date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.start_date && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.start_date.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày kết thúc *
                    </label>
                    <input
                        {...register('end_date')}
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg ${errors.end_date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.end_date && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.end_date.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái *
                </label>
                <select
                    {...register('status', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                    <option value={1}>Hoạt động</option>
                    <option value={0}>Không hoạt động</option>
                    <option value={2}>Đã hoàn thành</option>
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading
                        ? 'Đang lưu...'
                        : currentCourse
                          ? 'Cập nhật khóa học'
                          : 'Tạo khóa học'}
                </button>
            </div>
        </form>
    );
};
