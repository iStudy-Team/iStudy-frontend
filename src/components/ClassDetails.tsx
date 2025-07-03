import { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
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
    Loader2,
} from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useScheduleStore } from '@/store/useScheduleStore';
import { ClassTeacher } from '@/api/class';

export default function ClassDetailsPage() {
    const { id } = useParams({ strict: false });
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

    // Store hooks
    const {
        currentClass: classData,
        loading: classLoading,
        error: classError,
        getClassById,
    } = useClassStore();

    const { schedules, getSchedulesByClassOrDay } = useScheduleStore();

    // Load data on mount
    useEffect(() => {
        if (id) {
            // Fetch class details
            getClassById(id);
            // Fetch class schedules
            getSchedulesByClassOrDay({ class_id: id });
        }
    }, [id, getClassById, getSchedulesByClassOrDay]);

    // Loading state
    if (classLoading || !classData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">
                        Đang tải thông tin lớp học...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (classError && !classData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">
                        Có lỗi xảy ra: {classError}
                    </p>
                </div>
            </div>
        );
    }

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
            case 0:
                return 'bg-green-100 text-green-700 border-green-200';
            case 1:
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 0:
                return 'Đang hoạt động';
            case 1:
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

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const students = classData?.class_enrollments || [];

    const filteredStudents = students.filter((enrollment) => {
        const student = enrollment.student;
        const matchesSearch =
            student.full_name
                .toLowerCase()
                .includes(searchStudent.toLowerCase()) ||
            (student.user?.username || '')
                .toLowerCase()
                .includes(searchStudent.toLowerCase());
        const matchesFilter =
            studentFilter === 'all' ||
            (studentFilter === 'active' && enrollment.status === 1) ||
            (studentFilter === 'inactive' && enrollment.status === 0);
        return matchesSearch && matchesFilter;
    });

    const activeStudents = students.filter((s) => s.status === 1).length;
    const inactiveStudents = students.filter((s) => s.status === 0).length;

    const tabs = [
        { id: 'overview', label: 'Tổng quan', icon: BookOpen },
        { id: 'students', label: 'Danh sách học sinh', icon: Users },
        { id: 'schedule', label: 'Lịch học', icon: Calendar },
    ];

    interface CollapsibleSectionProps {
        title: string;
        icon: React.ComponentType<{ className?: string }>;
        sectionKey: keyof typeof expandedSections;
        children: React.ReactNode;
    }

    const CollapsibleSection = ({
        title,
        icon: Icon,
        sectionKey,
        children,
    }: CollapsibleSectionProps) => (
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
                                                classData.tuition_fee || '0'
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
                            {(classData.class_teachers?.length || 0) > 0 ? (
                                <div className="grid gap-4">
                                    {classData.class_teachers?.map(
                                        (teacher: ClassTeacher) => (
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
                                        Tổng cộng {students.length} học sinh •{' '}
                                        {activeStudents} đang học •{' '}
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
                                    {filteredStudents.map((enrollment) => {
                                        const student = enrollment.student;
                                        return (
                                            <div
                                                key={enrollment.id}
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
                                                                        enrollment.status ===
                                                                        1
                                                                            ? 'bg-green-100 text-green-700'
                                                                            : 'bg-red-100 text-red-700'
                                                                    }
                                                                >
                                                                    {enrollment.status ===
                                                                    1
                                                                        ? 'Đang học'
                                                                        : 'Đã nghỉ'}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                                                    {student
                                                                        .user
                                                                        ?.username ||
                                                                        'N/A'}
                                                                </span>
                                                                <span>
                                                                    {getGenderText(
                                                                        student.gender
                                                                    )}
                                                                </span>
                                                                <span>
                                                                    {formatDate(
                                                                        student.date_of_birth
                                                                            ? typeof student.date_of_birth ===
                                                                              'string'
                                                                                ? student.date_of_birth
                                                                                : student.date_of_birth.toISOString()
                                                                            : null
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                            <Phone className="w-4 h-4" />
                                                            {student.user
                                                                ?.phone ||
                                                                'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Email:{' '}
                                                            {student.user
                                                                ?.email ||
                                                                'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pl-18">
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>
                                                                {student.address ||
                                                                    'Chưa cập nhật địa chỉ'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <span>
                                                                Ngày nhập học:{' '}
                                                                {formatDate(
                                                                    typeof enrollment.enrollment_date ===
                                                                        'string'
                                                                        ? enrollment.enrollment_date
                                                                        : enrollment.enrollment_date?.toISOString() ||
                                                                              null
                                                                )}
                                                            </span>
                                                            {enrollment.tuition_fee && (
                                                                <span>
                                                                    Học phí:{' '}
                                                                    {formatCurrency(
                                                                        enrollment.tuition_fee
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                            {schedules && schedules.length > 0 ? (
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Ngày
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giờ bắt đầu
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giờ kết thúc
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tên lớp
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Giáo viên
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {schedules.map(
                                                    (schedule, index) => (
                                                        <tr
                                                            key={
                                                                schedule.id ||
                                                                index
                                                            }
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {schedule.day
                                                                    ? formatDate(
                                                                          typeof schedule.day ===
                                                                              'string'
                                                                              ? schedule.day
                                                                              : schedule.day.toISOString()
                                                                      )
                                                                    : 'Chưa xác định'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {schedule.start_time
                                                                    ? new Date(
                                                                          schedule.start_time
                                                                      ).toLocaleTimeString(
                                                                          'vi-VN',
                                                                          {
                                                                              hour: '2-digit',
                                                                              minute: '2-digit',
                                                                          }
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {schedule.end_time
                                                                    ? new Date(
                                                                          schedule.end_time
                                                                      ).toLocaleTimeString(
                                                                          'vi-VN',
                                                                          {
                                                                              hour: '2-digit',
                                                                              minute: '2-digit',
                                                                          }
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-base"
                                                                >
                                                                    {schedule.class_name ||
                                                                        classData.name ||
                                                                        'N/A'}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {schedule.teacher &&
                                                                schedule.teacher
                                                                    .length > 0
                                                                    ? schedule.teacher
                                                                          .map(
                                                                              (
                                                                                  t
                                                                              ) =>
                                                                                  t.full_name
                                                                          )
                                                                          .join(
                                                                              ', '
                                                                          )
                                                                    : 'Chưa phân công'}
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
                                            {formatDate(
                                                classData.start_date
                                                    ? typeof classData.start_date ===
                                                      'string'
                                                        ? classData.start_date
                                                        : classData.start_date.toISOString()
                                                    : null
                                            )}
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
                                            {formatDate(
                                                classData.end_date
                                                    ? typeof classData.end_date ===
                                                      'string'
                                                        ? classData.end_date
                                                        : classData.end_date.toISOString()
                                                    : null
                                            )}
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
                                        {formatDate(
                                            typeof classData.created_at ===
                                                'string'
                                                ? classData.created_at
                                                : classData.created_at.toISOString()
                                        )}
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
