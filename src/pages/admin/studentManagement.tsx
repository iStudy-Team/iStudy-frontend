import React, { useState } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    User,
    Mail,
    Phone,
    BookOpen,
    Calendar,
    Eye,
    X,
    AlertCircle,
    Users,
    Award,
    GraduationCap,
    MapPin,
    Heart,
} from 'lucide-react';

interface Student {
    id: string;
    studentId: string;
    name: string;
    email: string;
    phone: string;
    class: string;
    grade: number;
    dateOfBirth: string;
    address: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    status: 'active' | 'inactive' | 'graduated';
    enrollmentDate: string;
    gpa: number;
    attendance: number;
    medicalInfo: string;
    photo?: string;
}

const StudentCard = ({ student, onEdit, onDelete, onViewDetails }: any) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'inactive':
                return 'bg-red-100 text-red-700';
            case 'graduated':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang học';
            case 'inactive':
                return 'Nghỉ học';
            case 'graduated':
                return 'Đã tốt nghiệp';
            default:
                return 'Không xác định';
        }
    };

    const calculateAge = (dateOfBirth: string) => {
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

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            student.status === 'active'
                                ? 'bg-blue-100'
                                : student.status === 'graduated'
                                  ? 'bg-green-100'
                                  : 'bg-gray-100'
                        }`}
                    >
                        <User
                            className={`w-6 h-6 ${
                                student.status === 'active'
                                    ? 'text-blue-600'
                                    : student.status === 'graduated'
                                      ? 'text-green-600'
                                      : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {student.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Mã HS: {student.studentId}
                        </p>
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
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>
                        Lớp {student.class} - Khối {student.grade}
                    </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{calculateAge(student.dateOfBirth)} tuổi</span>
                </div>
                {student.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{student.email}</span>
                    </div>
                )}
                {student.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{student.phone}</span>
                    </div>
                )}
                {student.address && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{student.address}</span>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="text-center">
                            <p className="font-medium text-gray-900">
                                {student.gpa.toFixed(1)}
                            </p>
                            <p className="text-xs text-gray-500">Điểm TB</p>
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-gray-900">
                                {student.attendance}%
                            </p>
                            <p className="text-xs text-gray-500">Điểm danh</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">
                            PH: {student.parentName}
                        </p>
                        <p className="text-xs text-gray-600">
                            {student.parentPhone}
                        </p>
                    </div>
                </div>
            </div>

            {student.medicalInfo && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-700 font-medium">
                            Có thông tin y tế
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function StudentManagement() {
    const [students, setStudents] = useState<Student[]>([
        {
            id: '1',
            studentId: 'HS2024001',
            name: 'Nguyễn Văn An',
            email: 'an.nguyen@student.edu.vn',
            phone: '0123456789',
            class: '3A',
            grade: 3,
            dateOfBirth: '2015-05-15',
            address: '123 Đường Láng, Đống Đa, Hà Nội',
            parentName: 'Nguyễn Văn Bình',
            parentPhone: '0987654321',
            parentEmail: 'binh.nguyen@gmail.com',
            status: 'active',
            enrollmentDate: '2022-09-01',
            gpa: 8.5,
            attendance: 95,
            medicalInfo: 'Dị ứng với tôm, cua',
        },
        {
            id: '2',
            studentId: 'HS2024002',
            name: 'Trần Thị Bích',
            email: '',
            phone: '',
            class: '4B',
            grade: 4,
            dateOfBirth: '2014-08-20',
            address: '456 Giải Phóng, Hai Bà Trưng, Hà Nội',
            parentName: 'Trần Văn Cường',
            parentPhone: '0909123456',
            parentEmail: 'cuong.tran@gmail.com',
            status: 'active',
            enrollmentDate: '2021-09-01',
            gpa: 9.2,
            attendance: 98,
            medicalInfo: '',
        },
        {
            id: '3',
            studentId: 'HS2024003',
            name: 'Lê Minh Đức',
            email: 'duc.le@student.edu.vn',
            phone: '0333444555',
            class: '5A',
            grade: 5,
            dateOfBirth: '2013-12-10',
            address: '789 Cầu Giấy, Cầu Giấy, Hà Nội',
            parentName: 'Lê Thị Hoa',
            parentPhone: '0888777666',
            parentEmail: 'hoa.le@gmail.com',
            status: 'active',
            enrollmentDate: '2020-09-01',
            gpa: 7.8,
            attendance: 92,
            medicalInfo: 'Cận thị, đeo kính',
        },
        {
            id: '4',
            studentId: 'HS2023015',
            name: 'Phạm Thị Lan',
            email: '',
            phone: '',
            class: '6A',
            grade: 6,
            dateOfBirth: '2012-03-25',
            address: '321 Hoàng Hoa Thám, Ba Đình, Hà Nội',
            parentName: 'Phạm Văn Minh',
            parentPhone: '0777888999',
            parentEmail: 'minh.pham@gmail.com',
            status: 'graduated',
            enrollmentDate: '2019-09-01',
            gpa: 8.9,
            attendance: 96,
            medicalInfo: '',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('all');
    const [filterGrade, setFilterGrade] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleEdit = (student: Student) => {
        console.log('Edit student:', student);
    };

    const handleDelete = (studentId: string) => {
        setStudents(students.filter((s) => s.id !== studentId));
    };

    const handleViewDetails = (student: Student) => {
        console.log('View student details:', student);
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass =
            filterClass === 'all' || student.class === filterClass;
        const matchesGrade =
            filterGrade === 'all' || student.grade.toString() === filterGrade;
        const matchesStatus =
            filterStatus === 'all' || student.status === filterStatus;

        return matchesSearch && matchesClass && matchesGrade && matchesStatus;
    });

    const stats = {
        total: students.length,
        active: students.filter((s) => s.status === 'active').length,
        inactive: students.filter((s) => s.status === 'inactive').length,
        graduated: students.filter((s) => s.status === 'graduated').length,
        avgGpa:
            students
                .filter((s) => s.status === 'active')
                .reduce((sum, s) => sum + s.gpa, 0) /
            students.filter((s) => s.status === 'active').length,
        avgAttendance:
            students
                .filter((s) => s.status === 'active')
                .reduce((sum, s) => sum + s.attendance, 0) /
            students.filter((s) => s.status === 'active').length,
    };

    const classes = [...new Set(students.map((s) => s.class))].sort();
    const grades = [...new Set(students.map((s) => s.grade))].sort();

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
                                    Nghỉ học
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.inactive}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Điểm TB
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.avgGpa.toFixed(1)}
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
                                    Điểm danh
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.avgAttendance.toFixed(0)}%
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-orange-600" />
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
                                value={filterGrade}
                                onChange={(e) => setFilterGrade(e.target.value)}
                            >
                                <option value="all">Tất cả khối</option>
                                {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        Khối {grade}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                value={filterClass}
                                onChange={(e) => setFilterClass(e.target.value)}
                            >
                                <option value="all">Tất cả lớp</option>
                                {classes.map((cls) => (
                                    <option key={cls} value={cls}>
                                        Lớp {cls}
                                    </option>
                                ))}
                            </select>

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
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students Grid */}
                {filteredStudents.length > 0 ? (
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
                                    onClick={() => setIsCreateModalOpen(true)}
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
        </div>
    );
}
