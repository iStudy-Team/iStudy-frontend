import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { ReactNode, useState, useEffect } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

import { useClassStore } from '@/store/useClassStore';
import { useGradeStore } from '@/store/useGradeStore';
import { useTeacherStore } from '@/store/useTeacherStore';
import { ClassStatus } from '@/api/class';
import { TeacherStatus } from '@/api/teacher';

interface CreateClassProps {
    children: ReactNode;
}

export function DialogCreateClass({ children }: CreateClassProps) {
    const { createClass } = useClassStore();
    const { grades, fetchGrades } = useGradeStore();
    const { teachers, getAllTeachers } = useTeacherStore();

    const [formData, setFormData] = useState({
        name: '',
        academic_year_id: '',
        grade_level_id: '',
        teacher_id: '',
        capacity: 0,
        tuition_fee: '',
        start_date: '',
        end_date: '',
        status: ClassStatus.OPEN,
    });

    const [open, setOpen] = useState(false);

    // Fetch data when component mounts
    useEffect(() => {
        fetchGrades();
        getAllTeachers();
    }, [fetchGrades, getAllTeachers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Get the academic_year_id from the selected grade
        const selectedGrade = grades.find(
            (grade) => grade.id === formData.grade_level_id
        );

        const classData = {
            ...formData,
            academic_year_id: selectedGrade?.academic_year_id || '',
            start_date: formData.start_date
                ? new Date(formData.start_date)
                : undefined,
            end_date: formData.end_date
                ? new Date(formData.end_date)
                : undefined,
        };

        const result = await createClass(classData);

        if (result) {
            // Reset form and close dialog on success
            setFormData({
                name: '',
                academic_year_id: '',
                grade_level_id: '',
                teacher_id: '',
                capacity: 0,
                tuition_fee: '',
                start_date: '',
                end_date: '',
                status: ClassStatus.OPEN,
            });
            setOpen(false);
        }
    };

    // Filter active teachers
    const activeTeachers = teachers.filter(
        (teacher) => teacher.status === TeacherStatus.ACTIVE
    );
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo Lớp Học</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl px-1 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto mb-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tên Lớp *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="VD: Lớp 3A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Khối Lớp *
                                    </label>
                                    <Select
                                        required
                                        value={formData.grade_level_id}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                grade_level_id: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                            <SelectValue placeholder="Chọn khối lớp" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {grades.map((grade) => (
                                                    <SelectItem
                                                        key={grade.id}
                                                        value={grade.id}
                                                    >
                                                        {grade.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giáo Viên *
                                    </label>
                                    <Select
                                        required
                                        value={formData.teacher_id}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                teacher_id: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                            <SelectValue placeholder="Chọn giáo viên" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {activeTeachers.map(
                                                    (teacher) => (
                                                        <SelectItem
                                                            key={teacher.id}
                                                            value={teacher.id}
                                                        >
                                                            {teacher.full_name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sức Chứa
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.capacity}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                capacity: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="Số học sinh tối đa"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Học Phí
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tuition_fee}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tuition_fee: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="VD: 5.000.000 VNĐ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Trạng Thái
                                    </label>
                                    <Select
                                        value={formData.status.toString()}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                status: parseInt(
                                                    value
                                                ) as ClassStatus,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem
                                                    value={ClassStatus.OPEN.toString()}
                                                >
                                                    Đang mở
                                                </SelectItem>
                                                <SelectItem
                                                    value={ClassStatus.CLOSE.toString()}
                                                >
                                                    Đã đóng
                                                </SelectItem>
                                                <SelectItem
                                                    value={ClassStatus.COMPLETED.toString()}
                                                >
                                                    Hoàn thành
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày Bắt Đầu
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                start_date: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày Kết Thúc
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                end_date: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#00c2ad] cursor-pointer"
                        >
                            Tạo Lớp Học
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
