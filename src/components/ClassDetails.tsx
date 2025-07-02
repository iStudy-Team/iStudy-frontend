import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Calendar,
    Users,
    BookOpen,
    DollarSign,
    Hash,
    User,
    Clock,
    MapPin,
    GraduationCap,
    Phone,
    Mail,
    Search,
    Download,
    ChevronDown,
    ChevronUp,
    Plus,
} from 'lucide-react';

// Mock data cho classData và students
const mockClassData = {
    id: 'CL001',
    name: '10A1',
    capacity: 40,
    tuition_fee: '5000000',
    status: 1,
    start_date: '2024-09-01',
    end_date: '2025-06-30',
    created_at: '2024-08-15',
    grade_level: {
        name: 'Lớp 10',
    },
    academic_year: {
        school_year: '2024-2025',
    },
    class_teachers: [
        {
            id: 1,
            role: 0,
            teacher: {
                full_name: 'Nguyễn Thị Lan',
                status: 1,
                user: {
                    email: 'lan.nguyen@school.edu.vn',
                    phone: '0987654321',
                },
            },
        },
    ],
    schedule: [
        {
            day_of_week: 'Thứ 2',
            start_time: '07:30',
            end_time: '11:30',
            subject: 'Toán học',
        },
        {
            day_of_week: 'Thứ 3',
            start_time: '07:30',
            end_time: '11:30',
            subject: 'Ngữ văn',
        },
        {
            day_of_week: 'Thứ 4',
            start_time: '07:30',
            end_time: '11:30',
            subject: 'Tiếng Anh',
        },
    ],
};

const mockStudents = [
    {
        id: 1,
        student_code: 'HS001',
        full_name: 'Nguyễn Văn An',
        gender: 1,
        date_of_birth: '2008-05-15',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0987654321',
        parent_name: 'Nguyễn Văn Bình',
        parent_phone: '0912345678',
        enrollment_date: '2024-08-15',
        status: 1,
        avatar: null,
    },
    {
        id: 2,
        student_code: 'HS002',
        full_name: 'Trần Thị Bảo',
        gender: 0,
        date_of_birth: '2008-03-22',
        address: '456 Đường DEF, Quận 3, TP.HCM',
        phone: '0987654322',
        parent_name: 'Trần Văn Cường',
        parent_phone: '0912345679',
        enrollment_date: '2024-08-15',
        status: 1,
        avatar: null,
    },
    {
        id: 3,
        student_code: 'HS003',
        full_name: 'Lê Minh Đức',
        gender: 1,
        date_of_birth: '2008-07-10',
        address: '789 Đường GHI, Quận 5, TP.HCM',
        phone: '0987654323',
        parent_name: 'Lê Thị Hoa',
        parent_phone: '0912345680',
        enrollment_date: '2024-08-20',
        status: 0,
        avatar: null,
    },
    {
        id: 4,
        student_code: 'HS004',
        full_name: 'Phạm Thị Mai',
        gender: 0,
        date_of_birth: '2008-09-12',
        address: '321 Đường JKL, Quận 7, TP.HCM',
        phone: '0987654324',
        parent_name: 'Phạm Văn Nam',
        parent_phone: '0912345681',
        enrollment_date: '2024-08-18',
        status: 1,
        avatar: null,
    },
];

export default function ClassDetailsPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchStudent, setSearchStudent] = useState('');
    const [studentFilter, setStudentFilter] = useState('all');
    const [expandedSections, setExpandedSections] = useState({
        basicInfo: true,
        timeInfo: true,
        teachers: true,
        schedule: false,
        students: true,
        system: false,
    });

    const classData = mockClassData;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Chưa xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(Number(amount));
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case 1:
                return 'bg-green-100 text-green-700 border-green-200';
            case 0:
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Đang hoạt động';
            case 0:
                return 'Ngừng hoạt động';
            default:
                return 'Không xác định';
        }
    };

    const getTeacherRoleText = (role: number) => {
        switch (role) {
            case 0:
                return 'Giáo viên chủ nhiệm';
            case 1:
                return 'Giáo viên bộ môn';
            default:
                return 'Giáo viên';
        }
    };

    const getGenderText = (gender: number) => {
        return gender === 1 ? 'Nam' : 'Nữ';
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const filteredStudents = mockStudents.filter((student) => {
        const matchesSearch =
            student.full_name
                .toLowerCase()
                .includes(searchStudent.toLowerCase()) ||
            student.student_code
                .toLowerCase()
                .includes(searchStudent.toLowerCase());
        const matchesFilter =
            studentFilter === 'all' ||
            (studentFilter === 'active' && student.status === 1) ||
            (studentFilter === 'inactive' && student.status === 0);
        return matchesSearch && matchesFilter;
    });

    const activeStudents = mockStudents.filter((s) => s.status === 1).length;
    const inactiveStudents = mockStudents.filter((s) => s.status === 0).length;

    const tabs = [
        { id: 'overview', label: 'Tổng quan', icon: BookOpen },
        { id: 'students', label: 'Danh sách học sinh', icon: Users },
        { id: 'schedule', label: 'Lịch học', icon: Calendar },
    ];

    const CollapsibleSection = ({
        title,
        icon: Icon,
        sectionKey,
        children,
    }) => (
        <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(sectionKey)}
            >
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        {title}
                    </div>
                    {expandedSections[sectionKey] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </CardTitle>
            </CardHeader>
            {expandedSections[sectionKey] && (
                <CardContent>{children}</CardContent>
            )}
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">
                                    Lớp {classData.name}
                                </h1>
                                <Badge
                                    className={`${getStatusColor(classData.status)} text-xs`}
                                >
                                    {getStatusText(classData.status)}
                                </Badge>
                            </div>
                            <div className="text-lg opacity-90">
                                {classData.grade_level?.name} • {activeStudents}{' '}
                                học sinh đang học • Năm học{' '}
                                {classData.academic_year?.school_year}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border mb-8">
                    <div className="flex border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {activeStudents}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Học sinh đang học
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {classData.class_teachers?.length ||
                                                0}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Giáo viên
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {formatCurrency(
                                                classData.tuition_fee
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Học phí
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {classData.capacity}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Sĩ số tối đa
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <CollapsibleSection
                            title="Thông tin cơ bản"
                            icon={BookOpen}
                            sectionKey="basicInfo"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                                            Tên lớp
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {classData.name}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                                            Khối lớp
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {classData.grade_level?.name ||
                                                    'Chưa xác định'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                                            Trạng thái
                                        </label>
                                        <Badge
                                            className={getStatusColor(
                                                classData.status
                                            )}
                                        >
                                            {getStatusText(classData.status)}
                                        </Badge>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                                            Năm học
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {classData.academic_year
                                                    ?.school_year ||
                                                    'Chưa xác định'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleSection>

                        {/* Teachers Information */}
                        <CollapsibleSection
                            title="Giáo viên phụ trách"
                            icon={User}
                            sectionKey="teachers"
                        >
                            {classData.class_teachers?.length > 0 ? (
                                <div className="grid gap-4">
                                    {classData.class_teachers.map(
                                        (teacher: any) => (
                                            <div
                                                key={teacher.id}
                                                className="p-4 border rounded-xl bg-white hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {teacher.teacher?.full_name?.charAt(
                                                                0
                                                            ) || 'G'}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-lg text-gray-900">
                                                                {
                                                                    teacher
                                                                        .teacher
                                                                        ?.full_name
                                                                }
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {getTeacherRoleText(
                                                                        teacher.role
                                                                    )}
                                                                </Badge>
                                                                <Badge
                                                                    className={
                                                                        teacher
                                                                            .teacher
                                                                            ?.status ===
                                                                        1
                                                                            ? 'bg-green-100 text-green-700'
                                                                            : 'bg-red-100 text-red-700'
                                                                    }
                                                                >
                                                                    {teacher
                                                                        .teacher
                                                                        ?.status ===
                                                                    1
                                                                        ? 'Đang làm việc'
                                                                        : 'Nghỉ việc'}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                            <Mail className="w-4 h-4" />
                                                            {
                                                                teacher.teacher
                                                                    ?.user
                                                                    ?.email
                                                            }
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Phone className="w-4 h-4" />
                                                            {
                                                                teacher.teacher
                                                                    ?.user
                                                                    ?.phone
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">
                                        Chưa có giáo viên phụ trách
                                    </p>
                                </div>
                            )}
                        </CollapsibleSection>
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="space-y-6">
                        {/* Students Header */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Danh sách học sinh
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        Tổng cộng {mockStudents.length} học sinh
                                        • {activeStudents} đang học •{' '}
                                        {inactiveStudents} đã nghỉ
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Xuất Excel
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Thêm học sinh
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                                        value={searchStudent}
                                        onChange={(e) =>
                                            setSearchStudent(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    value={studentFilter}
                                    onChange={(e) =>
                                        setStudentFilter(e.target.value)
                                    }
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">
                                        Tất cả trạng thái
                                    </option>
                                    <option value="active">Đang học</option>
                                    <option value="inactive">Đã nghỉ</option>
                                </select>
                            </div>
                        </div>

                        {/* Students List */}
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            {filteredStudents.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {filteredStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className="p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                                                        {student.full_name.charAt(
                                                            0
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h4 className="font-semibold text-xl text-gray-900">
                                                                {
                                                                    student.full_name
                                                                }
                                                            </h4>
                                                            <Badge
                                                                className={
                                                                    student.status ===
                                                                    1
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : 'bg-red-100 text-red-700'
                                                                }
                                                            >
                                                                {student.status ===
                                                                1
                                                                    ? 'Đang học'
                                                                    : 'Đã nghỉ'}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                                                {
                                                                    student.student_code
                                                                }
                                                            </span>
                                                            <span>
                                                                {getGenderText(
                                                                    student.gender
                                                                )}
                                                            </span>
                                                            <span>
                                                                {formatDate(
                                                                    student.date_of_birth
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                        <Phone className="w-4 h-4" />
                                                        {student.phone}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        PH:{' '}
                                                        {student.parent_name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 pl-18">
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>
                                                            {student.address}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <span>
                                                            Ngày nhập học:{' '}
                                                            {formatDate(
                                                                student.enrollment_date
                                                            )}
                                                        </span>
                                                        <span>
                                                            SĐT phụ huynh:{' '}
                                                            {
                                                                student.parent_phone
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Users className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 text-xl">
                                        Không tìm thấy học sinh nào
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="space-y-8">
                        <CollapsibleSection
                            title="Thời khóa biểu"
                            icon={Clock}
                            sectionKey="schedule"
                        >
                            {classData.schedule?.length > 0 ? (
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Thứ
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giờ bắt đầu
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giờ kết thúc
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Môn học
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {classData.schedule.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {
                                                                    item.day_of_week
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {
                                                                    item.start_time
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {item.end_time}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-base"
                                                                >
                                                                    {item.subject ||
                                                                        '---'}
                                                                </Badge>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Clock className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 text-xl">
                                        Chưa có lịch học được thiết lập
                                    </p>
                                </div>
                            )}
                        </CollapsibleSection>

                        {/* Time Information */}
                        <CollapsibleSection
                            title="Thông tin thời gian"
                            icon={Calendar}
                            sectionKey="timeInfo"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white rounded-lg shadow-sm border">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                                        Ngày bắt đầu
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                        <p className="text-xl text-gray-900">
                                            {formatDate(classData.start_date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-sm border">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                                        Ngày kết thúc
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                        <p className="text-xl text-gray-900">
                                            {formatDate(classData.end_date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleSection>

                        {/* System Information */}
                        <CollapsibleSection
                            title="Thông tin hệ thống"
                            icon={Hash}
                            sectionKey="system"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white rounded-lg shadow-sm border">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                                        Mã lớp học
                                    </label>
                                    <p className="text-xl font-mono text-gray-900 bg-gray-50 px-4 py-3 rounded border">
                                        {classData.id}
                                    </p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-sm border">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                                        Ngày tạo
                                    </label>
                                    <p className="text-xl text-gray-900">
                                        {formatDate(classData.created_at)}
                                    </p>
                                </div>
                            </div>
                        </CollapsibleSection>
                    </div>
                )}
            </div>
        </div>
    );
}
