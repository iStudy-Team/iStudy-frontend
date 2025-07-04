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
} from '@/components/ui/select';
import { useClassPromotionStore } from '@/store/useClassPromotionStore';
import { useGradeStore } from '@/store/useGradeStore';
import { ClassPromotionStatus, ClassPromotion } from '@/api/classPromotion';
import { LOCALSTORAGE_KEY } from '@/types/localstorage';

interface CreateClassPromotionProps {
    children: ReactNode;
    editingPromotion?: ClassPromotion | null;
    onClose?: () => void;
}

export function DialogCreateClassPromotion({
    children,
    editingPromotion = null,
    onClose,
}: CreateClassPromotionProps) {
    const { createClassPromotion, updateClassPromotion } =
        useClassPromotionStore();
    const { grades, fetchGrades } = useGradeStore();
    const user = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY.USER) || 'null'
    );
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        grade_level_id: '',
        planned_start_date: '',
        tuition_fee: 0,
        max_students: 30,
        promotion_start: '',
        promotion_end: '',
        discount_offered: 0,
        status: ClassPromotionStatus.PLANNED,
    });

    const [open, setOpen] = useState(false);

    // Fetch data when component mounts
    useEffect(() => {
        fetchGrades();
    }, [fetchGrades]);

    // Set form data when editing promotion changes
    useEffect(() => {
        if (editingPromotion) {
            setFormData({
                title: editingPromotion.title,
                description: editingPromotion.description || '',
                grade_level_id: editingPromotion.grade_level_id,
                planned_start_date: editingPromotion.planned_start_date
                    ? new Date(editingPromotion.planned_start_date)
                          .toISOString()
                          .split('T')[0]
                    : '',
                tuition_fee: editingPromotion.tuition_fee,
                max_students: editingPromotion.max_students || 30,
                promotion_start: editingPromotion.promotion_start
                    ? new Date(editingPromotion.promotion_start)
                          .toISOString()
                          .split('T')[0]
                    : '',
                promotion_end: editingPromotion.promotion_end
                    ? new Date(editingPromotion.promotion_end)
                          .toISOString()
                          .split('T')[0]
                    : '',
                discount_offered: editingPromotion.discount_offered || 0,
                status: editingPromotion.status,
            });
            setOpen(true);
        }
    }, [editingPromotion]);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            grade_level_id: '',
            planned_start_date: '',
            tuition_fee: 0,
            max_students: 30,
            promotion_start: '',
            promotion_end: '',
            discount_offered: 0,
            status: ClassPromotionStatus.PLANNED,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) {
            alert('Bạn cần đăng nhập để thực hiện thao tác này');
            return;
        }

        if (
            !formData.title ||
            !formData.grade_level_id ||
            formData.tuition_fee <= 0
        ) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const promotionData = {
            ...formData,
            created_by: user.id.toString(),
            planned_start_date: formData.planned_start_date || undefined,
            promotion_start: formData.promotion_start || undefined,
            promotion_end: formData.promotion_end || undefined,
        };

        let result;
        if (editingPromotion) {
            result = await updateClassPromotion(
                editingPromotion.id,
                promotionData
            );
        } else {
            result = await createClassPromotion(promotionData);
        }

        if (result) {
            resetForm();
            setOpen(false);
            onClose?.();
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            resetForm();
            onClose?.();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {editingPromotion
                            ? 'Chỉnh sửa quảng cáo'
                            : 'Tạo quảng cáo lớp mới'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl px-1 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto mb-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiêu đề quảng cáo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="VD: Khai giảng lớp Toán 6 - Giáo viên kinh nghiệm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="Mô tả hấp dẫn về lớp học mới..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                ) as ClassPromotionStatus,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem
                                                    value={ClassPromotionStatus.PLANNED.toString()}
                                                >
                                                    Đang lên kế hoạch
                                                </SelectItem>
                                                <SelectItem
                                                    value={ClassPromotionStatus.ACTIVE.toString()}
                                                >
                                                    Đang hoạt động
                                                </SelectItem>
                                                <SelectItem
                                                    value={ClassPromotionStatus.COMPLETED.toString()}
                                                >
                                                    Đã hoàn thành
                                                </SelectItem>
                                                <SelectItem
                                                    value={ClassPromotionStatus.CANCELED.toString()}
                                                >
                                                    Đã hủy
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Học Phí (VNĐ) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.tuition_fee}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                tuition_fee:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="VD: 500000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sĩ số tối đa
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.max_students}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                max_students:
                                                    parseInt(e.target.value) ||
                                                    30,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="Số học sinh tối đa"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giảm giá (%){' '}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.discount_offered}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            discount_offered:
                                                parseInt(e.target.value) || 0,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="VD: 10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày dự kiến khai giảng
                                </label>
                                <input
                                    type="date"
                                    value={formData.planned_start_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            planned_start_date: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày bắt đầu quảng cáo
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.promotion_start}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                promotion_start: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày kết thúc quảng cáo
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.promotion_end}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                promotion_end: e.target.value,
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
                            {editingPromotion ? 'Cập nhật' : 'Tạo quảng cáo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
