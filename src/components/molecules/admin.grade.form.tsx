import { Grade } from '@/api/grade';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGradeStore } from '@/store/useGradeStore';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAcademicStore } from '@/store/useAcademicStore';

const gradeFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Tên khối là bắt buộc')
        .max(100, 'Tên khối không quá 100 ký tự'),
    description: z.string().optional(),
    academic_year_id: z
        .string()
        .min(1, 'Năm học là bắt buộc')
        .max(50, 'Năm học không quá 50 ký tự'),
});

type GradeFormValues = z.infer<typeof gradeFormSchema>;

export const GradeForm = ({
    initialData,
    currentGrade,
    onCancel,
    closeModal,
}: {
    initialData?: Grade;
    currentGrade?: Grade | null;
    onCancel: () => void;
    closeModal: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<GradeFormValues>({
        resolver: zodResolver(gradeFormSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            academic_year_id: '',
        },
    });

    const { createGrade, updateGrade } = useGradeStore();
    const { academicYears, getAllAcademicYears } = useAcademicStore();
    const [isLoading, setIsLoading] = useState(false);

    const itemsAcademic = academicYears.map((year) => {
        return {
            value: year.id,
            label: year.school_year,
        };
    });

    const handleSubmitGrade = async (data: GradeFormValues) => {
        try {
            setIsLoading(true);

            if (currentGrade) {
                await updateGrade(currentGrade.id, data);
            } else {
                await createGrade({
                    ...data,
                    academic_year_id:
                        data.academic_year_id || itemsAcademic[0].value,
                });
            }

            closeModal();
        } catch (error) {
            console.error('Error submitting grade:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllAcademicYears();
    }, []);

    return (
        <form onSubmit={handleSubmit(handleSubmitGrade)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khối *
                </label>
                <input
                    {...register('name')}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Ví dụ: Khối 1"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                </label>
                <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Mô tả về khối..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Năm học *
                </label>
                <Select
                    onValueChange={(value) =>
                        setValue('academic_year_id', value)
                    }
                    defaultValue={initialData?.academic_year_id || ''}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn năm học" />
                    </SelectTrigger>
                    <SelectContent>
                        {itemsAcademic.map((item) => (
                            <SelectItem value={item.value} key={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.academic_year_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.academic_year_id.message}
                    </p>
                )}
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang lưu...' : 'Lưu'}
                </button>
            </div>
        </form>
    );
};
