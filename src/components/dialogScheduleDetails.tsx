import { Schedule } from '@/api/schedule';
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
    Calendar,
    Clock,
    School,
    Users,
    Hash,
    CalendarDays,
    Building,
    DollarSign,
} from 'lucide-react';
import { ClassStatus } from '@/api/class';

interface DialogScheduleDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: Schedule | null;
}

export const DialogScheduleDetails = ({
    isOpen,
    onClose,
    schedule,
}: DialogScheduleDetailsProps) => {
    if (!schedule) return null;

    const formatDate = (dateString: Date | string) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: Date | string) => {
        if (!timeString) return 'Chưa xác định';
        const time = new Date(timeString);
        return time.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

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

    const getClassStatusColor = (status: ClassStatus) => {
        switch (status) {
            case ClassStatus.OPEN:
                return 'bg-green-100 text-green-700 border-green-200';
            case ClassStatus.CLOSE:
                return 'bg-red-100 text-red-700 border-red-200';
            case ClassStatus.COMPLETED:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getClassStatusText = (status: ClassStatus) => {
        switch (status) {
            case ClassStatus.OPEN:
                return 'Mở';
            case ClassStatus.CLOSE:
                return 'Đóng';
            case ClassStatus.COMPLETED:
                return 'Hoàn thành';
            default:
                return 'Không xác định';
        }
    };

    const getScheduleStatus = () => {
        if (!schedule.day)
            return {
                text: 'Không xác định',
                color: 'bg-gray-100 text-gray-600 border-gray-200',
            };

        const today = new Date();
        const scheduleDate = new Date(schedule.day);

        if (scheduleDate.toDateString() === today.toDateString()) {
            return {
                text: 'Hôm nay',
                color: 'bg-orange-100 text-orange-700 border-orange-200',
            };
        } else if (scheduleDate > today) {
            return {
                text: 'Sắp tới',
                color: 'bg-green-100 text-green-700 border-green-200',
            };
        } else {
            return {
                text: 'Đã qua',
                color: 'bg-gray-100 text-gray-600 border-gray-200',
            };
        }
    };

    const scheduleStatus = getScheduleStatus();

    const calculateDuration = () => {
        if (!schedule.start_time || !schedule.end_time) return 'Chưa xác định';

        const start = new Date(schedule.start_time);
        const end = new Date(schedule.end_time);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        if (diffHours > 0) {
            return `${diffHours} giờ ${diffMinutes > 0 ? diffMinutes + ' phút' : ''}`;
        }
        return `${diffMinutes} phút`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-teal-600" />
                        </div>
                        Chi tiết lịch học: {schedule.class?.name || 'Lớp học'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Schedule Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Thông tin lịch học
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày học
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatDate(schedule.day || '')}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Trạng thái
                                        </label>
                                        <Badge className={scheduleStatus.color}>
                                            {scheduleStatus.text}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Thời gian
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900 font-medium">
                                                {formatTime(
                                                    schedule.start_time || ''
                                                )}{' '}
                                                -{' '}
                                                {formatTime(
                                                    schedule.end_time || ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Thời lượng
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {calculateDuration()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Class Information */}
                    {schedule.class && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <School className="w-5 h-5" />
                                    Thông tin lớp học
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Tên lớp
                                            </label>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {schedule.class.name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Trạng thái lớp
                                            </label>
                                            <Badge
                                                className={getClassStatusColor(
                                                    schedule.class.status
                                                )}
                                            >
                                                {getClassStatusText(
                                                    schedule.class.status
                                                )}
                                            </Badge>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Sức chứa
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <p className="text-gray-900">
                                                    {schedule.class.capacity ||
                                                        0}{' '}
                                                    học sinh
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Học phí
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-gray-500" />
                                                <p className="text-gray-900">
                                                    {schedule.class
                                                        .tuition_fee ||
                                                        'Chưa xác định'}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Thời gian lớp
                                            </label>
                                            <p className="text-gray-900 text-sm">
                                                {schedule.class.start_date &&
                                                schedule.class.end_date
                                                    ? `${new Date(schedule.class.start_date).toLocaleDateString('vi-VN')} - ${new Date(schedule.class.end_date).toLocaleDateString('vi-VN')}`
                                                    : 'Chưa xác định'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Mã lớp học
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Hash className="w-4 h-4 text-gray-500" />
                                                <p className="text-gray-900 font-mono text-sm">
                                                    {schedule.class.id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building className="w-5 h-5" />
                                Thông tin hệ thống
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã lịch học
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {schedule.id}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã ID lớp học
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {schedule.class_id}
                                    </p>
                                </div>
                            </div>
                            {schedule.class && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày tạo lớp
                                        </label>
                                        <p className="text-gray-900">
                                            {formatDateTime(
                                                schedule.class.created_at
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Cập nhật lần cuối
                                        </label>
                                        <p className="text-gray-900">
                                            {formatDateTime(
                                                schedule.class.updated_at
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
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
