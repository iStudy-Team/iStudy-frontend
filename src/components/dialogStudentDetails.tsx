import { Student, StudentStatus, StudentGender } from '@/api/student';
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
    Mail,
    BookOpen,
    Percent,
} from 'lucide-react';

interface DialogStudentDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

export const DialogStudentDetails = ({
    isOpen,
    onClose,
    student,
}: DialogStudentDetailsProps) => {
    if (!student) return null;

    const formatDate = (dateString: Date | string | null) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getGenderColor = (gender: StudentGender) => {
        switch (gender) {
            case StudentGender.MALE:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case StudentGender.FEMALE:
                return 'bg-pink-100 text-pink-700 border-pink-200';
            case StudentGender.OTHER:
                return 'bg-purple-100 text-purple-700 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getGenderText = (gender: StudentGender) => {
        switch (gender) {
            case StudentGender.MALE:
                return 'Nam';
            case StudentGender.FEMALE:
                return 'Nữ';
            case StudentGender.OTHER:
                return 'Khác';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: StudentStatus) => {
        switch (status) {
            case StudentStatus.ACTIVE:
                return 'bg-green-100 text-green-700 border-green-200';
            case StudentStatus.INACTIVE:
                return 'bg-red-100 text-red-700 border-red-200';
            case StudentStatus.GRADUATED:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case StudentStatus.SUSPENDED:
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: StudentStatus) => {
        switch (status) {
            case StudentStatus.ACTIVE:
                return 'Đang học';
            case StudentStatus.INACTIVE:
                return 'Nghỉ học';
            case StudentStatus.GRADUATED:
                return 'Đã tốt nghiệp';
            case StudentStatus.SUSPENDED:
                return 'Tạm ngưng';
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

    const calculateStudyTime = (enrollmentDate: Date | string | null) => {
        if (!enrollmentDate) return null;
        const today = new Date();
        const startDate = new Date(enrollmentDate);
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const diffMonths = Math.floor((diffDays % 365) / 30);

        if (diffYears > 0) {
            return `${diffYears} năm ${diffMonths > 0 ? diffMonths + ' tháng' : ''}`;
        }
        return `${diffMonths} tháng`;
    };

    const age = calculateAge(student.date_of_birth || null);
    const studyTime = calculateStudyTime(student.enrollment_date || null);

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
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                        </div>
                        Chi tiết học sinh: {student.full_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pr-2">
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
                                            {student.full_name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Giới tính
                                        </label>
                                        <Badge
                                            className={getGenderColor(
                                                student.gender
                                            )}
                                        >
                                            {getGenderText(student.gender)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Trạng thái
                                        </label>
                                        <Badge
                                            className={getStatusColor(
                                                student.status
                                            )}
                                        >
                                            {getStatusText(student.status)}
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
                                                    student.date_of_birth ||
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
                                                {student.address ||
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
                                                {student.user_id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Thông tin học tập
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Ngày nhập học
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {formatDate(
                                                    student.enrollment_date ||
                                                        null
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {studyTime && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Thời gian học
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <p className="text-gray-900 font-medium">
                                                    {studyTime}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Giảm giá học phí
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Percent className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {student.discount_percentage ||
                                                    0}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                    {student.discount_reason && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 mb-1 block">
                                                Lý do giảm giá
                                            </label>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <p className="text-gray-900">
                                                    {student.discount_reason}
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
                            {student.user ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Email
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {student.user.email ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Số điện thoại
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {student.user.phone ||
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
                                <Hash className="w-5 h-5" />
                                Thông tin hệ thống
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã học sinh
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {student.id}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Số lớp đang tham gia
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <p className="text-gray-900">
                                            {student.class_enrollments
                                                ?.length || 0}
                                        </p>
                                    </div>
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
