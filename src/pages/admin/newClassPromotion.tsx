import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useClassPromotionStore } from '@/store/useClassPromotionStore';
import { useGradeStore } from '@/store/useGradeStore';
import { ClassPromotionStatus, ClassPromotion } from '@/api/classPromotion';
import { DialogCreateClassPromotion } from '@/components/dialogCreateClassPromotion';

const NewClassPromotionAdmin = () => {
    const [editingPromotion, setEditingPromotion] =
        useState<ClassPromotion | null>(null);

    const {
        classPromotions,
        loading,
        deleteClassPromotion,
        getAllClassPromotions,
    } = useClassPromotionStore();

    const { grades, fetchGrades } = useGradeStore();

    // Fetch data on component mount
    useEffect(() => {
        getAllClassPromotions();
        fetchGrades();
    }, [getAllClassPromotions, fetchGrades]);

    const handleEdit = (promotion: ClassPromotion) => {
        setEditingPromotion(promotion);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa quảng cáo này?')) {
            await deleteClassPromotion(id);
            getAllClassPromotions(); // Refresh the list
        }
    };

    const handleDialogClose = () => {
        setEditingPromotion(null);
        getAllClassPromotions(); // Refresh the list
    };

    const getStatusText = (status: ClassPromotionStatus) => {
        switch (status) {
            case ClassPromotionStatus.PLANNED:
                return 'Đang lên kế hoạch';
            case ClassPromotionStatus.ACTIVE:
                return 'Đang hoạt động';
            case ClassPromotionStatus.COMPLETED:
                return 'Đã hoàn thành';
            case ClassPromotionStatus.CANCELED:
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getStatusVariant = (status: ClassPromotionStatus) => {
        switch (status) {
            case ClassPromotionStatus.PLANNED:
                return 'secondary';
            case ClassPromotionStatus.ACTIVE:
                return 'default';
            case ClassPromotionStatus.COMPLETED:
                return 'outline';
            case ClassPromotionStatus.CANCELED:
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const formatDate = (dateString: string | Date | null | undefined) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const getGradeName = (gradeId: string) => {
        const grade = grades.find((g) => g.id === gradeId);
        return grade?.name || 'Không xác định';
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center">
                <div className="text-lg">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Quản lý quảng cáo lớp mới
                </h1>
                <DialogCreateClassPromotion
                    editingPromotion={null}
                    onClose={handleDialogClose}
                >
                    <Button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                        <Plus className="w-5 h-5 mr-2" />
                        Thêm quảng cáo mới
                    </Button>
                </DialogCreateClassPromotion>
            </div>

            {/* Danh sách quảng cáo hiện có */}
            {classPromotions.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">
                        Chưa có quảng cáo nào
                    </div>
                    <DialogCreateClassPromotion
                        editingPromotion={null}
                        onClose={handleDialogClose}
                    >
                        <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Tạo quảng cáo đầu tiên
                        </Button>
                    </DialogCreateClassPromotion>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classPromotions.map((promotion) => (
                        <div
                            key={promotion.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg line-clamp-2">
                                        {promotion.title}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleEdit(promotion)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(promotion.id)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {promotion.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {promotion.description}
                                    </p>
                                )}

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Khối lớp:
                                        </span>
                                        <span className="font-medium">
                                            {getGradeName(
                                                promotion.grade_level_id
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Học phí:
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(
                                                promotion.tuition_fee
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Sĩ số:
                                        </span>
                                        <span className="font-medium">
                                            {promotion.max_students ||
                                                'Không giới hạn'}
                                        </span>
                                    </div>
                                    {promotion.discount_offered &&
                                        promotion.discount_offered > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">
                                                    Giảm giá:
                                                </span>
                                                <span className="font-medium text-red-500">
                                                    {promotion.discount_offered}
                                                    %
                                                </span>
                                            </div>
                                        )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Khai giảng:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(
                                                promotion.planned_start_date
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Badge
                                        variant={
                                            getStatusVariant(
                                                promotion.status
                                            ) as
                                                | 'default'
                                                | 'secondary'
                                                | 'destructive'
                                                | 'outline'
                                        }
                                    >
                                        {getStatusText(promotion.status)}
                                    </Badge>
                                    {promotion.promotion_start &&
                                        promotion.promotion_end && (
                                            <div className="text-xs text-gray-500">
                                                {formatDate(
                                                    promotion.promotion_start
                                                )}{' '}
                                                -{' '}
                                                {formatDate(
                                                    promotion.promotion_end
                                                )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Dialog for editing */}
            {editingPromotion && (
                <DialogCreateClassPromotion
                    editingPromotion={editingPromotion}
                    onClose={handleDialogClose}
                >
                    <div></div>
                </DialogCreateClassPromotion>
            )}
        </div>
    );
};

export default NewClassPromotionAdmin;
