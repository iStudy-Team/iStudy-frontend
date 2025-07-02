import { useState, useEffect } from 'react';
import { DialogCreateClass } from '@/components/dialogCreateClass';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Lock,
    Unlock,
    Users,
    Calendar,
    BookOpen,
    AlertCircle,
    Eye,
    Clock,
    Loader2,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useClassStore } from '@/store/useClassStore';
import { Class, ClassStatus } from '@/api/class';
import { Link } from '@tanstack/react-router';

const ClassCard = ({
    classData,
    onToggleStatus,
    onEdit,
}: {
    classData: Class;
    onToggleStatus: (id: string) => void;
    onEdit: (classData: Class) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const getStatusText = (status: ClassStatus) => {
        switch (status) {
            case ClassStatus.OPEN:
                return 'Đang mở';
            case ClassStatus.CLOSE:
                return 'Đã đóng';
            case ClassStatus.COMPLETED:
                return 'Hoàn thành';
            default:
                return 'Không xác định';
        }
    };

    const getStatusStyle = (status: ClassStatus) => {
        switch (status) {
            case ClassStatus.OPEN:
                return 'bg-green-100 text-green-700';
            case ClassStatus.CLOSE:
                return 'bg-red-100 text-red-700';
            case ClassStatus.COMPLETED:
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const formatDate = (date?: string | Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
    };

    return (
        <div className="bg-[#f8f9fa] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                {/* Class Info */}
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            classData.status === ClassStatus.OPEN
                                ? 'bg-teal-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <BookOpen
                            className={`w-6 h-6 ${
                                classData.status === ClassStatus.OPEN
                                    ? 'text-teal-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {classData.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Khối Lớp: {classData.grade_level?.name} <br />
                            Năm Học: {classData.academic_year?.school_year}
                        </p>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="flex items-center space-x-2">
                    {/* Status Badge */}
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            classData.status
                        )}`}
                    >
                        {getStatusText(classData.status)}
                    </span>

                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                                {/* View Details */}
                                <Link
                                    to={`/admin/class-management/${classData.id}`}
                                    onClick={() => {
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </Link>

                                {/* Edit */}
                                <button
                                    onClick={() => {
                                        onEdit(classData);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Chỉnh sửa</span>
                                </button>

                                {/* Toggle Status */}
                                <button
                                    onClick={() => {
                                        onToggleStatus(classData.id);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    {classData.status === ClassStatus.OPEN ? (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Đóng lớp</span>
                                        </>
                                    ) : (
                                        <>
                                            <Unlock className="w-4 h-4" />
                                            <span>Mở lại lớp</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="space-y-3">
                {/* Capacity */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                        Sức chứa: {classData.capacity || 'Không giới hạn'}
                    </span>
                </div>

                {/* Date Range */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                        {classData?.start_date && classData?.end_date
                            ? `${formatDate(classData.start_date)} - ${formatDate(classData.end_date)}`
                            : 'Chưa cập nhật'}
                    </span>
                </div>

                {/* Tuition Fee */}
                {classData.tuition_fee && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Học phí: {classData.tuition_fee}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ClassManagementAdmin() {
    const { classes, loading, error, getClasses, updateClass, searchClasses } =
        useClassStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('all');
    const [filterYear, setFilterYear] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Fetch classes on component mount
    useEffect(() => {
        getClasses(1, 10);
    }, [getClasses]);

    const handleToggleStatus = async (classId: string) => {
        const classToUpdate = classes.find((cls) => cls.id === classId);
        if (classToUpdate) {
            const newStatus =
                classToUpdate.status === ClassStatus.OPEN
                    ? ClassStatus.CLOSE
                    : ClassStatus.OPEN;

            await updateClass(classId, { status: newStatus });
        }
    };

    const handleEdit = (classData: Class) => {
        // Implement edit functionality
        console.log('Edit class:', classData);
    };

    const filteredClasses = classes.filter((cls) => {
        const matchesGrade =
            filterGrade === 'all' || cls.grade_level_id === filterGrade;
        const matchesYear =
            filterYear === 'all' || cls.academic_year_id === filterYear;
        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'open' && cls.status === ClassStatus.OPEN) ||
            (filterStatus === 'close' && cls.status === ClassStatus.CLOSE) ||
            (filterStatus === 'completed' &&
                cls.status === ClassStatus.COMPLETED);

        return matchesGrade && matchesYear && matchesStatus;
    });

    const stats = {
        total: classes.length,
        active: classes.filter((cls) => cls.status === ClassStatus.OPEN).length,
        closed: classes.filter((cls) => cls.status === ClassStatus.CLOSE)
            .length,
        completed: classes.filter((cls) => cls.status === ClassStatus.COMPLETED)
            .length,
    };

    const availableYears = [
        ...new Set(classes.map((cls) => cls.academic_year_id)),
    ].sort();
    const availableGrades = [
        ...new Set(classes.map((cls) => cls.grade_level_id)),
    ].sort();

    // Handle search when search term changes
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm.trim()) {
                searchClasses(searchTerm, { page: 1, limit: 10 });
            } else {
                getClasses(1, 10);
            }
        }, 500);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm, searchClasses, getClasses]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-400 to-teal-500 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Lớp Học Tiếng Anh
                    </h1>
                    <p className="text-teal-100">
                        Quản lý các lớp học tiếng Anh theo khối lớp và năm học
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-8 -mt-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng Lớp Học
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Đang Hoạt Động
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Unlock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Đã Đóng
                                </p>
                                <p className="text-2xl font-bold text-gray-600">
                                    {stats.closed}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Hoàn Thành
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.completed}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
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
                                    placeholder="Tìm kiếm lớp học, giáo viên..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                />
                            </div>

                            <Select
                                value={filterGrade}
                                onValueChange={(value) => setFilterGrade(value)}
                            >
                                <SelectTrigger className=" border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400  h-auto">
                                    <SelectValue placeholder="Tất cả khối lớp" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Tất cả khối lớp
                                        </SelectItem>
                                        {availableGrades.map((grade) => (
                                            <SelectItem
                                                key={grade}
                                                value={grade.toString()}
                                            >
                                                Lớp {grade}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterYear}
                                onValueChange={(value) => setFilterYear(value)}
                            >
                                <SelectTrigger className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                    <SelectValue placeholder="Tất cả năm học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Tất cả năm học
                                        </SelectItem>
                                        {availableYears.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                            >
                                                Năm {year}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterStatus}
                                onValueChange={(value) =>
                                    setFilterStatus(value)
                                }
                            >
                                <SelectTrigger className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                    <SelectValue placeholder="Tất cả trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Tất cả trạng thái
                                        </SelectItem>
                                        <SelectItem value="open">
                                            Đang mở
                                        </SelectItem>
                                        <SelectItem value="close">
                                            Đã đóng
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Hoàn thành
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogCreateClass>
                            <button className="flex items-center space-x-2 bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer">
                                <Plus className="w-5 h-5 " />
                                <span>Tạo Lớp Học Mới</span>
                            </button>
                        </DialogCreateClass>
                    </div>
                </div>
            </div>

            {/* Classes Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                {loading ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <Loader2 className="w-12 h-12 text-teal-400 mx-auto mb-4 animate-spin" />
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
                            onClick={() => getClasses(1, 10)}
                            className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500"
                        >
                            Thử lại
                        </button>
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy lớp học nào
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi bộ lọc hoặc tạo lớp học mới
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((classData) => (
                            <ClassCard
                                key={classData.id}
                                classData={classData}
                                onToggleStatus={handleToggleStatus}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* Class Details Dialog */}
        </div>
    );
}
