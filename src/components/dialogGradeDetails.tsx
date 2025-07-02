import { Grade } from '@/api/grade';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    School,
    BookOpen,
    Calendar,
    Users,
    Hash,
    Building,
} from 'lucide-react';

interface DialogGradeDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    grade: Grade | null;
}

export const DialogGradeDetails = ({
    isOpen,
    onClose,
    grade,
}: DialogGradeDetailsProps) => {
    if (!grade) return null;

    const formatDateTime = (dateString: Date | string) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getAcademicYearStatus = (status?: number) => {
        switch (status) {
            case 1:
                return {
                    text: 'Đang diễn ra',
                    color: 'bg-green-100 text-green-700 border-green-200',
                };
            case 0:
                return {
                    text: 'Không hoạt động',
                    color: 'bg-gray-100 text-gray-600 border-gray-200',
                };
            case 2:
                return {
                    text: 'Đã hoàn thành',
                    color: 'bg-blue-100 text-blue-700 border-blue-200',
                };
            default:
                return {
                    text: 'Không xác định',
                    color: 'bg-gray-100 text-gray-600 border-gray-200',
                };
        }
    };

    const academicYearStatus = getAcademicYearStatus(
        grade.academic_year?.status
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-4xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 p-4 pr-2"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <School className="w-5 h-5 text-purple-600" />
                        </div>
                        Chi tiết khối lớp: {grade.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Thông tin cơ bản
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Tên khối lớp
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {grade.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Mã khối lớp
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900 font-mono text-sm">
                                                {grade.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mô tả
                                    </label>
                                    <div className="bg-gray-50 rounded-lg p-3 min-h-[100px]">
                                        <p className="text-gray-900 text-sm leading-relaxed">
                                            {grade.description ||
                                                'Chưa có mô tả'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Year Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Thông tin khóa học
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {grade.academic_year ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Tên khóa học
                                            </label>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {
                                                    grade.academic_year
                                                        .school_year
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Trạng thái khóa học
                                            </label>
                                            <Badge
                                                className={
                                                    academicYearStatus.color
                                                }
                                            >
                                                {academicYearStatus.text}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Thời gian khóa học
                                            </label>
                                            <p className="text-gray-900">
                                                {grade.academic_year
                                                    .start_date &&
                                                grade.academic_year.end_date
                                                    ? `${new Date(grade.academic_year.start_date).toLocaleDateString('vi-VN')} - ${new Date(grade.academic_year.end_date).toLocaleDateString('vi-VN')}`
                                                    : 'Chưa xác định'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Mã khóa học
                                            </label>
                                            <p className="text-gray-900 font-mono text-sm">
                                                {grade.academic_year.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <School className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có thông tin khóa học
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Classes Information */}
                    {grade.classes && grade.classes.length > 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Các lớp học ({grade.classes.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {grade.classes.map((classItem) => (
                                        <div
                                            key={classItem.id}
                                            className="border rounded-lg p-4 bg-gray-50"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900">
                                                    {classItem.name}
                                                </h4>
                                                <Badge
                                                    className={
                                                        classItem.status === 0
                                                            ? 'bg-green-100 text-green-700 border-green-200'
                                                            : classItem.status ===
                                                                1
                                                              ? 'bg-red-100 text-red-700 border-red-200'
                                                              : 'bg-blue-100 text-blue-700 border-blue-200'
                                                    }
                                                >
                                                    {classItem.status === 0
                                                        ? 'Mở'
                                                        : classItem.status === 1
                                                          ? 'Đóng'
                                                          : 'Hoàn thành'}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                {classItem.capacity !==
                                                    undefined &&
                                                    classItem.capacity > 0 && (
                                                        <p>
                                                            Sức chứa:{' '}
                                                            {classItem.capacity}{' '}
                                                            học sinh
                                                        </p>
                                                    )}
                                                {classItem.tuition_fee && (
                                                    <p>
                                                        Học phí:{' '}
                                                        {classItem.tuition_fee}
                                                    </p>
                                                )}
                                                {classItem.start_date && (
                                                    <p>
                                                        Bắt đầu:{' '}
                                                        {new Date(
                                                            classItem.start_date
                                                        ).toLocaleDateString(
                                                            'vi-VN'
                                                        )}
                                                    </p>
                                                )}
                                                {classItem.end_date && (
                                                    <p>
                                                        Kết thúc:{' '}
                                                        {new Date(
                                                            classItem.end_date
                                                        ).toLocaleDateString(
                                                            'vi-VN'
                                                        )}
                                                    </p>
                                                )}
                                                <div className="text-xs text-gray-500 mt-2">
                                                    Mã: {classItem.id}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Các lớp học
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có lớp học nào
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Thông tin hệ thống
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Ngày tạo
                                    </label>
                                    <p className="text-gray-900">
                                        {formatDateTime(grade.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Cập nhật lần cuối
                                    </label>
                                    <p className="text-gray-900">
                                        {formatDateTime(grade.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Actions */}
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
