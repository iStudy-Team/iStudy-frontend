import React, { useState } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    GraduationCap,
    Mail,
    Phone,
    BookOpen,
    Calendar,
    Eye,
    X,
    AlertCircle,
    Users,
    Award,
    DollarSign,
} from 'lucide-react';
interface Teacher {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    experience: number;
    classes: string[];
    status: 'active' | 'inactive';
    joinDate: string;
    salary: number;
    education: string;
    certifications: string[];
}

const TeacherCard = ({
    teacher,
    onEdit,
    onDelete,
    onViewDetails,
    onAssignClasses,
}: any) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            teacher.status === 'active'
                                ? 'bg-blue-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <GraduationCap
                            className={`w-6 h-6 ${
                                teacher.status === 'active'
                                    ? 'text-blue-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {teacher.specialization}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {teacher.status === 'active'
                            ? 'Đang làm việc'
                            : 'Nghỉ việc'}
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
                                <button
                                    onClick={() => {
                                        onEdit(teacher);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Chỉnh sửa</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onAssignClasses(teacher);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Phân công lớp</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(teacher.id);
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
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{teacher.classes.length} lớp học</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{teacher.experience} năm kinh nghiệm</span>
                </div>
                {teacher.salary > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{teacher.salary} triệu/tháng</span>
                    </div>
                )}
                {teacher.education && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        <span>{teacher.education}</span>
                    </div>
                )}
            </div>

            {teacher.certifications && teacher.certifications.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Chứng chỉ:</p>
                    <div className="flex flex-wrap gap-1">
                        {teacher.certifications
                            .slice(0, 3)
                            .map((cert, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                >
                                    {cert}
                                </span>
                            ))}
                        {teacher.certifications.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                                +{teacher.certifications.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function TeacherManagement() {
    const [teachers, setTeachers] = useState<Teacher[]>([
        {
            id: '1',
            name: 'Nguyễn Thị Hoa',
            email: 'hoa.nguyen@school.edu.vn',
            phone: '0123456789',
            specialization: 'Tiếng Anh',
            experience: 8,
            classes: ['3A', '3B', '4A'],
            status: 'active',
            joinDate: '2018-09-01',
            salary: 18.5,
            education: 'Thạc sĩ',
            certifications: ['IELTS 8.0', 'TESOL', 'Cambridge TKT'],
        },
        {
            id: '2',
            name: 'Trần Văn Nam',
            email: 'nam.tran@school.edu.vn',
            phone: '0987654321',
            specialization: 'Toán học',
            experience: 12,
            classes: ['5A', '5B'],
            status: 'active',
            joinDate: '2015-08-15',
            salary: 22.0,
            education: 'Cử nhân',
            certifications: ['Giáo viên dạy giỏi cấp tỉnh'],
        },
        {
            id: '3',
            name: 'Lê Thị Mai',
            email: 'mai.le@school.edu.vn',
            phone: '0456789123',
            specialization: 'Văn học',
            experience: 15,
            classes: ['6A'],
            status: 'active',
            joinDate: '2012-09-01',
            salary: 25.0,
            education: 'Thạc sĩ',
            certifications: ['Nhà giáo ưu tú', 'Giáo viên dạy giỏi quốc gia'],
        },
        {
            id: '4',
            name: 'Phạm Thị Lan',
            email: 'lan.pham@school.edu.vn',
            phone: '0789123456',
            specialization: 'Tiếng Anh',
            experience: 5,
            classes: ['4B', '4C'],
            status: 'inactive',
            joinDate: '2020-09-01',
            salary: 15.0,
            education: 'Cử nhân',
            certifications: ['IELTS 7.5'],
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecialization, setFilterSpecialization] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterExperience, setFilterExperience] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleEdit = (teacher: Teacher) => {
        console.log('Edit teacher:', teacher);
    };

    const handleDelete = (teacherId: string) => {
        setTeachers(teachers.filter((t) => t.id !== teacherId));
    };

    const handleViewDetails = (teacher: Teacher) => {
        console.log('View teacher details:', teacher);
    };

    const handleAssignClasses = (teacher: Teacher) => {
        console.log('Assign classes to teacher:', teacher);
    };

    const filteredTeachers = teachers.filter((teacher) => {
        const matchesSearch =
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.phone.includes(searchTerm);
        const matchesSpecialization =
            filterSpecialization === 'all' ||
            teacher.specialization === filterSpecialization;
        const matchesStatus =
            filterStatus === 'all' || teacher.status === filterStatus;
        const matchesExperience =
            filterExperience === 'all' ||
            (filterExperience === '0-2' && teacher.experience <= 2) ||
            (filterExperience === '3-5' &&
                teacher.experience >= 3 &&
                teacher.experience <= 5) ||
            (filterExperience === '6-10' &&
                teacher.experience >= 6 &&
                teacher.experience <= 10) ||
            (filterExperience === '10+' && teacher.experience > 10);

        return (
            matchesSearch &&
            matchesSpecialization &&
            matchesStatus &&
            matchesExperience
        );
    });

    const stats = {
        total: teachers.length,
        active: teachers.filter((t) => t.status === 'active').length,
        inactive: teachers.filter((t) => t.status === 'inactive').length,
        totalClasses: teachers.reduce((sum, t) => sum + t.classes.length, 0),
        avgExperience: Math.round(
            teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length
        ),
    };

    const specializations = [...new Set(teachers.map((t) => t.specialization))];

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
                                    Tổng Lớp
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.totalClasses}
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
                                    KN TB
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.avgExperience} năm
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
                                value={filterSpecialization}
                                onChange={(e) =>
                                    setFilterSpecialization(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="all">Tất cả chuyên môn</option>
                                {specializations.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filterExperience}
                                onChange={(e) =>
                                    setFilterExperience(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="all">Tất cả kinh nghiệm</option>
                                <option value="0-2">0-2 năm</option>
                                <option value="3-5">3-5 năm</option>
                                <option value="6-10">6-10 năm</option>
                                <option value="10+">Trên 10 năm</option>
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

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Thêm Giáo Viên</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Teachers Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                {filteredTeachers.length === 0 ? (
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
                                onAssignClasses={handleAssignClasses}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
