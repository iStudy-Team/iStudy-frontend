import { Teacher, TeacherGender, TeacherStatus } from '@/api/teacher';
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
    User,
    Calendar,
    MapPin,
    Award,
    Phone,
    Users,
    Hash,
    GraduationCap,
    UserCheck,
    Building,
    MessageCircle,
} from 'lucide-react';

interface DialogTeacherDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher | null;
}

export const DialogTeacherDetails = ({
    isOpen,
    onClose,
    teacher,
}: DialogTeacherDetailsProps) => {
    if (!teacher) return null;

    const formatDate = (dateString: Date | string | null) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getGenderColor = (gender: TeacherGender) => {
        switch (gender) {
            case TeacherGender.MALE:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case TeacherGender.FEMALE:
                return 'bg-pink-100 text-pink-700 border-pink-200';
            case TeacherGender.OTHER:
                return 'bg-purple-100 text-purple-700 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getGenderText = (gender: TeacherGender) => {
        switch (gender) {
            case TeacherGender.MALE:
                return 'Nam';
            case TeacherGender.FEMALE:
                return 'Nữ';
            case TeacherGender.OTHER:
                return 'Khác';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: TeacherStatus) => {
        switch (status) {
            case TeacherStatus.ACTIVE:
                return 'bg-green-100 text-green-700 border-green-200';
            case TeacherStatus.INACTIVE:
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: TeacherStatus) => {
        switch (status) {
            case TeacherStatus.ACTIVE:
                return 'Đang làm việc';
            case TeacherStatus.INACTIVE:
                return 'Nghỉ việc';
            default:
                return 'Không xác định';
        }
    };

    const calculateAge = (dateOfBirth: Date | string | null) => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const calculateWorkingTime = (hireDate: Date | string | null) => {
        if (!hireDate) return null;
        const today = new Date();
        const startDate = new Date(hireDate);
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const diffMonths = Math.floor((diffDays % 365) / 30);

        if (diffYears > 0) {
            return `${diffYears} năm ${diffMonths > 0 ? diffMonths + ' tháng' : ''}`;
        }
        return `${diffMonths} tháng`;
    };

    const age = calculateAge(teacher.date_of_birth || null);
    const workingTime = calculateWorkingTime(teacher.hire_date || null);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        Chi tiết giáo viên: {teacher.full_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Thông tin cơ bản
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Họ và tên
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {teacher.full_name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Giới tính
                                        </label>
                                        <Badge
                                            className={getGenderColor(
                                                teacher.gender
                                            )}
                                        >
                                            {getGenderText(teacher.gender)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Trạng thái
                                        </label>
                                        <Badge
                                            className={getStatusColor(
                                                teacher.status
                                            )}
                                        >
                                            {getStatusText(teacher.status)}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày sinh
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {formatDate(
                                                    teacher.date_of_birth ||
                                                        null
                                                )}
                                                {age && (
                                                    <span className="text-gray-500 ml-2">
                                                        ({age} tuổi)
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Địa chỉ
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {teacher.address ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Mã ID người dùng
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900 font-mono text-sm">
                                                {teacher.user_id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Thông tin nghề nghiệp
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Bằng cấp/Chứng chỉ
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-3 min-h-[80px]">
                                            <p className="text-gray-900">
                                                {teacher.qualification ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày vào làm
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <UserCheck className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {formatDate(
                                                    teacher.hire_date || null
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {workingTime && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Thời gian làm việc
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <p className="text-gray-900 font-medium">
                                                    {workingTime}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Thông tin liên hệ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {teacher.zalo_id || teacher.facebook_id ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Zalo ID
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {teacher.zalo_id ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Facebook ID
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {teacher.facebook_id ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Phone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có thông tin liên hệ
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

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
                                        Mã giáo viên
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {teacher.id}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã người dùng liên kết
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {teacher.user_id}
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
