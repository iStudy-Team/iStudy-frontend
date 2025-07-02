import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    User,
    Calendar,
    Eye,
    AlertCircle,
    Users,
    Award,
    GraduationCap,
    MapPin,
    Loader2,
    Mail,
} from 'lucide-react';
import { useStudentStore } from '@/store/useStudentStore';
import { Student, StudentStatus } from '@/api/student';
import { DialogStudentDetails } from '@/components/dialogStudentDetails';

interface StudentCardProps {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (studentId: string) => void;
    onViewDetails: (student: Student) => void;
}

const StudentCard = ({
    student,
    onEdit,
    onDelete,
    onViewDetails,
}: StudentCardProps) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const getStatusColor = (status: StudentStatus) => {
        switch (status) {
            case StudentStatus.ACTIVE:
                return 'bg-green-100 text-green-700';
            case StudentStatus.INACTIVE:
                return 'bg-red-100 text-red-700';
            case StudentStatus.GRADUATED:
                return 'bg-blue-100 text-blue-700';
            case StudentStatus.SUSPENDED:
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
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

    const calculateAge = (dateOfBirth?: Date | string | null) => {
        if (!dateOfBirth) return 'N/A';

        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        // Check if date is valid
        if (isNaN(birthDate.getTime())) return 'N/A';

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

    const formatDate = (date?: Date | string | null) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('vi-VN');
    };

    const getGenderText = (gender?: number) => {
        switch (gender) {
            case 1:
                return 'Nam';
            case 2:
                return 'Nữ';
            case 3:
                return 'Khác';
            default:
                return 'N/A';
        }
    };

    const renderAvatar = () => {
        if (student.user?.avatar) {
            return (
                <img
                    src={student.user.avatar}
                    alt={student.full_name}
                    className="w-12 h-12 rounded-xl object-cover"
                />
            );
        }

        return (
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    student.status === StudentStatus.ACTIVE
                        ? 'bg-blue-100'
                        : student.status === StudentStatus.GRADUATED
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                }`}
            >
                <User
                    className={`w-6 h-6 ${
                        student.status === StudentStatus.ACTIVE
                            ? 'text-blue-600'
                            : student.status === StudentStatus.GRADUATED
                              ? 'text-green-600'
                              : 'text-gray-400'
                    }`}
                />
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4 max-w-full">
                <div className="flex items-center space-x-3">
                    {renderAvatar()}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                            {student.full_name || 'Không có tên'}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0">
                            {student.user?.phone && (
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded truncate">
                                    {student.user.phone}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}
                    >
                        {getStatusText(student.status)}
                    </span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                                <button
                                    onClick={() => {
                                        onViewDetails(student);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(student);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Chỉnh sửa</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(student.id);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Xóa</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="truncate">
                        Họ Tên: {student.full_name || 'N/A'}
                    </span>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                        {calculateAge(student.date_of_birth)} tuổi
                        {student.gender && (
                            <span className="ml-2">
                                ({getGenderText(student.gender)})
                            </span>
                        )}
                    </span>
                </div>

                {student.user?.email && (
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{student.user.email}</span>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="font-medium text-gray-900">
                            {student.discount_percentage || 0}%
                        </p>
                        <p className="text-xs text-gray-500">Giảm giá</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">
                            {formatDate(student.enrollment_date)}
                        </p>
                        <p className="text-xs text-gray-500">Ngày nhập học</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">
                            {student.class_enrollments?.length || 0}
                        </p>
                        <p className="text-xs text-gray-500">Lớp học</p>
                    </div>
                </div>
            </div>

            {student.discount_reason && (
                <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-blue-700 font-medium">
                            {student.discount_reason}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function StudentManagement() {
    const { students, loading, getAllStudents, deleteStudent } =
        useStudentStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
    const [showStudentDetailsDialog, setShowStudentDetailsDialog] =
        useState(false);

    // Fetch students when component mounts
    useEffect(() => {
        getAllStudents();
    }, [getAllStudents]);

    const handleEdit = (student: Student) => {
        console.log('Edit student:', student);
        // Note: Edit functionality disabled per requirements, but API/store still supports it
    };

    const handleDelete = (studentId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
            deleteStudent(studentId);
        }
    };

    const handleViewDetails = (student: Student) => {
        setViewingStudent(student);
        setShowStudentDetailsDialog(true);
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.full_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.user_id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'active' &&
                student.status === StudentStatus.ACTIVE) ||
            (filterStatus === 'inactive' &&
                student.status === StudentStatus.INACTIVE) ||
            (filterStatus === 'graduated' &&
                student.status === StudentStatus.GRADUATED) ||
            (filterStatus === 'suspended' &&
                student.status === StudentStatus.SUSPENDED);

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: students.length,
        active: students.filter((s) => s.status === StudentStatus.ACTIVE)
            .length,
        inactive: students.filter((s) => s.status === StudentStatus.INACTIVE)
            .length,
        graduated: students.filter((s) => s.status === StudentStatus.GRADUATED)
            .length,
        suspended: students.filter((s) => s.status === StudentStatus.SUSPENDED)
            .length,
        avgDiscount:
            students.length > 0
                ? students.reduce(
                      (sum, s) => sum + Number(s.discount_percentage),
                      0
                  ) / students.length
                : 0,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Học Sinh
                    </h1>
                    <p className="text-green-100">
                        Quản lý thông tin học sinh và theo dõi kết quả học tập
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-8 -mt-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng HS
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Đang học
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tốt nghiệp
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.graduated}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tạm ngưng
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {stats.suspended}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Giảm giá TB
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.avgDiscount.toFixed(1)}%
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng sinh viên
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 pb-12">
                {/* Filters and Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm học sinh..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-3">
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang học</option>
                                <option value="inactive">Nghỉ học</option>
                                <option value="graduated">Tốt nghiệp</option>
                                <option value="suspended">Tạm ngưng</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students Grid */}
                {loading ? (
                    <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                        <div className="flex justify-center items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                            <span className="ml-2 text-gray-600">
                                Đang tải dữ liệu...
                            </span>
                        </div>
                    </div>
                ) : filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStudents.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                        <div className="mx-auto max-w-md">
                            <User className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                Không tìm thấy học sinh
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thử thay đổi bộ lọc hoặc thêm học sinh mới
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() =>
                                        console.log(
                                            'Create student feature not implemented'
                                        )
                                    }
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                                    Thêm học sinh mới
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Student Details Dialog */}
            <DialogStudentDetails
                isOpen={showStudentDetailsDialog}
                onClose={() => {
                    setShowStudentDetailsDialog(false);
                    setViewingStudent(null);
                }}
                student={viewingStudent}
            />
        </div>
    );
}
