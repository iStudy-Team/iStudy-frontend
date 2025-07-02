import { Academic } from '@/api/academic';
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
    CalendarDays,
    GraduationCap,
    Clock,
    Users,
    BookOpen,
    School,
    Building,
} from 'lucide-react';
import { ACADEMIC_YEAR_STATUS } from '@/types/study';

interface DialogAcademicDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    academic: Academic | null;
}

export const DialogAcademicDetails = ({
    isOpen,
    onClose,
    academic,
}: DialogAcademicDetailsProps) => {
    if (!academic) return null;

    const getStatusColor = (status: number) => {
        switch (status) {
            case ACADEMIC_YEAR_STATUS.ACTIVE:
                return 'bg-green-100 text-green-700 border-green-200';
            case ACADEMIC_YEAR_STATUS.INACTIVE:
                return 'bg-gray-100 text-gray-600 border-gray-200';
            case ACADEMIC_YEAR_STATUS.COMPLETED:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case ACADEMIC_YEAR_STATUS.ACTIVE:
                return 'Đang diễn ra';
            case ACADEMIC_YEAR_STATUS.INACTIVE:
                return 'Không hoạt động';
            case ACADEMIC_YEAR_STATUS.COMPLETED:
                return 'Đã hoàn thành';
            default:
                return 'Không xác định';
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
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

    const calculateDuration = () => {
        if (!academic.start_date || !academic.end_date) return 'Chưa xác định';

        const start = new Date(academic.start_date);
        const end = new Date(academic.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);

        if (diffMonths > 0) {
            return `${diffMonths} tháng (${diffDays} ngày)`;
        }
        return `${diffDays} ngày`;
    };

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
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        Chi tiết khóa học: {academic.school_year}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status and Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Thông tin cơ bản
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Tên khóa học
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {academic.school_year}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Trạng thái
                                    </label>
                                    <Badge
                                        className={getStatusColor(
                                            academic.status
                                        )}
                                    >
                                        {getStatusText(academic.status)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Thông tin thời gian
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày bắt đầu
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {formatDate(
                                                academic.start_date || ''
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày kết thúc
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {formatDate(
                                                academic.end_date || ''
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Thời gian diễn ra
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900 font-medium">
                                                {calculateDuration()}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Mã khóa học
                                        </label>
                                        <p className="text-gray-900 font-mono text-sm">
                                            {academic.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Grade Levels Information */}
                    {academic.grade_levels &&
                    academic.grade_levels.length > 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <School className="w-5 h-5" />
                                    Các khối lớp ({academic.grade_levels.length}
                                    )
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    {/* Chia mảng thành các nhóm 2 phần tử */}
                                    {Array.from({
                                        length: Math.ceil(
                                            academic.grade_levels.length / 2
                                        ),
                                    }).map((_, rowIndex) => (
                                        <div
                                            key={rowIndex}
                                            className="flex flex-col sm:flex-row gap-4"
                                        >
                                            {academic.grade_levels
                                                .slice(
                                                    rowIndex * 2,
                                                    rowIndex * 2 + 2
                                                )
                                                .map((grade) => (
                                                    <div
                                                        key={grade.id}
                                                        className="border rounded-lg p-4 bg-gray-50 flex-1" // Thêm flex-1 để các phần tử co dãn đều
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-gray-900">
                                                                {grade.name}
                                                            </h4>
                                                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                                                Khối lớp
                                                            </Badge>
                                                        </div>
                                                        {grade.description && (
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {
                                                                    grade.description
                                                                }
                                                            </p>
                                                        )}
                                                        <div className="text-xs text-gray-500">
                                                            Mã: {grade.id}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <School className="w-5 h-5" />
                                    Các khối lớp
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <School className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có khối lớp nào
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Classes Information */}
                    {academic.classes && academic.classes.length > 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Các lớp học ({academic.classes.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {' '}
                                    {/* Thay grid bằng space-y-4 để tạo khoảng cách dọc */}
                                    {academic.classes.map((classItem) => (
                                        <div
                                            key={classItem.id}
                                            className="border rounded-lg p-4 bg-gray-50 w-full"
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
                                                {classItem.capacity && (
                                                    <p>
                                                        Sức chứa:{' '}
                                                        {classItem.capacity} học
                                                        sinh
                                                    </p>
                                                )}
                                                {classItem.tuition_fee && (
                                                    <p>
                                                        Học phí:{' '}
                                                        {classItem.tuition_fee}
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
                                        {formatDateTime(academic.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Cập nhật lần cuối
                                    </label>
                                    <p className="text-gray-900">
                                        {formatDateTime(academic.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Actions */}
                    <div className="flex justify-end ">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
