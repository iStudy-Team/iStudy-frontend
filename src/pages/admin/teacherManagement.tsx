import { useState, useEffect } from 'react';
import {
    Search,
    MoreVertical,
    GraduationCap,
    Calendar,
    Eye,
    AlertCircle,
    Users,
    Award,
    Loader2,
    MapPin,
    UserCheck,
    BookOpen,
} from 'lucide-react';
import { useTeacherStore } from '@/store/useTeacherStore';
import { Teacher, TeacherGender, TeacherStatus } from '@/api/teacher';
import { DialogTeacherDetails } from '@/components/dialogTeacherDetails';

const TeacherCard = ({
    teacher,
    onViewDetails,
}: {
    teacher: Teacher;
    onEdit: (teacher: Teacher) => void;
    onDelete: (id: string) => void;
    onViewDetails: (teacher: Teacher) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

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

    const formatDate = (date?: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            teacher.status === TeacherStatus.ACTIVE
                                ? 'bg-blue-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <GraduationCap
                            className={`w-6 h-6 ${
                                teacher.status === TeacherStatus.ACTIVE
                                    ? 'text-blue-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {teacher.full_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {getGenderText(teacher.gender)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.status === TeacherStatus.ACTIVE
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {getStatusText(teacher.status)}
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
                                        onViewDetails(teacher);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <UserCheck className="w-4 h-4" />
                    <span>ID: {teacher.user_id}</span>
                </div>

                {teacher.date_of_birth && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Sinh: {formatDate(teacher.date_of_birth)}</span>
                    </div>
                )}

                {teacher.address && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{teacher.address}</span>
                    </div>
                )}

                {teacher.hire_date && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Vào làm: {formatDate(teacher.hire_date)}</span>
                    </div>
                )}

                {teacher.qualification && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        <span className="truncate">
                            {teacher.qualification}
                        </span>
                    </div>
                )}
            </div>

            {(teacher.zalo_id || teacher.facebook_id) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Liên hệ:</p>
                    <div className="flex flex-wrap gap-2">
                        {teacher.zalo_id && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                Zalo: {teacher.zalo_id}
                            </span>
                        )}
                        {teacher.facebook_id && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                FB: {teacher.facebook_id}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function TeacherManagement() {
    const { teachers, loading, error, getAllTeachers, deleteTeacher } =
        useTeacherStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
    const [showTeacherDetailsDialog, setShowTeacherDetailsDialog] =
        useState(false);

    // Fetch teachers on component mount
    useEffect(() => {
        getAllTeachers();
    }, [getAllTeachers]);

    const handleEdit = (teacher: Teacher) => {
        console.log('Edit teacher:', teacher);
    };

    const handleDelete = async (teacherId: string) => {
        await deleteTeacher(teacherId);
    };

    const handleViewDetails = (teacher: Teacher) => {
        setViewingTeacher(teacher);
        setShowTeacherDetailsDialog(true);
    };

    const filteredTeachers = teachers.filter((teacher) => {
        const matchesSearch =
            teacher.full_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            teacher.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (teacher.qualification &&
                teacher.qualification
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        const matchesGender =
            filterGender === 'all' ||
            (filterGender === 'male' &&
                teacher.gender === TeacherGender.MALE) ||
            (filterGender === 'female' &&
                teacher.gender === TeacherGender.FEMALE) ||
            (filterGender === 'other' &&
                teacher.gender === TeacherGender.OTHER);

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'active' &&
                teacher.status === TeacherStatus.ACTIVE) ||
            (filterStatus === 'inactive' &&
                teacher.status === TeacherStatus.INACTIVE);

        return matchesSearch && matchesGender && matchesStatus;
    });

    const stats = {
        total: teachers.length,
        active: teachers.filter((t) => t.status === TeacherStatus.ACTIVE)
            .length,
        inactive: teachers.filter((t) => t.status === TeacherStatus.INACTIVE)
            .length,
        male: teachers.filter((t) => t.gender === TeacherGender.MALE).length,
        female: teachers.filter((t) => t.gender === TeacherGender.FEMALE)
            .length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Giáo Viên
                    </h1>
                    <p className="text-blue-100">
                        Quản lý thông tin và phân công công việc cho giáo viên
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-8 -mt-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng GV
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
                                    Đang Làm
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Nghỉ Việc
                                </p>
                                <p className="text-2xl font-bold text-gray-600">
                                    {stats.inactive}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Nam
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.male}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Nữ
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.female}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Award className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto px-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm giáo viên..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                                />
                            </div>

                            <select
                                value={filterGender}
                                onChange={(e) =>
                                    setFilterGender(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="all">Tất cả giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang làm việc</option>
                                <option value="inactive">Nghỉ việc</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teachers Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                {loading ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Đang tải dữ liệu...
                        </h3>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Có lỗi xảy ra
                        </h3>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <button
                            onClick={() => getAllTeachers()}
                            className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                        >
                            Thử lại
                        </button>
                    </div>
                ) : filteredTeachers.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy giáo viên nào
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi bộ lọc hoặc thêm giáo viên mới
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (
                            <TeacherCard
                                key={teacher.id}
                                teacher={teacher}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Teacher Details Dialog */}
            <DialogTeacherDetails
                isOpen={showTeacherDetailsDialog}
                onClose={() => {
                    setShowTeacherDetailsDialog(false);
                    setViewingTeacher(null);
                }}
                teacher={viewingTeacher}
            />
        </div>
    );
}
