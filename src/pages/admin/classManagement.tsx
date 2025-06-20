import { useState } from 'react';
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
    UserCheck,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ClassData {
    id: string;
    name: string;
    grade: number;
    year: number;
    teacher: string;
    studentCount: number;
    status: 'active' | 'closed';
    startDate: string;
    endDate: string;
    description: string;
    schedule: string;
}

interface CreateClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (classData: Omit<ClassData, 'id'>) => void;
}

const ClassCard = ({
    classData,
    onToggleStatus,
    onEdit,
    onViewDetails,
}: {
    classData: ClassData;
    onToggleStatus: (id: string) => void;
    onEdit: (classData: ClassData) => void;
    onViewDetails: (classData: ClassData) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="bg-[#f8f9fa] rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            classData.status === 'active'
                                ? 'bg-teal-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <BookOpen
                            className={`w-6 h-6 ${
                                classData.status === 'active'
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
                            Khối {classData.grade} - Năm {classData.year}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            classData.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {classData.status === 'active'
                            ? 'Đang hoạt động'
                            : 'Đã đóng'}
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
                                        onViewDetails(classData);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
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
                                <button
                                    onClick={() => {
                                        onToggleStatus(classData.id);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    {classData.status === 'active' ? (
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

            <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <UserCheck className="w-4 h-4" />
                    <span>GV: {classData.teacher}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{classData.studentCount} học sinh</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                        {classData.startDate} - {classData.endDate}
                    </span>
                </div>

                {classData.schedule && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{classData.schedule}</span>
                    </div>
                )}
            </div>

            {classData.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {classData.description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default function ClassManagementAdmin() {
    const [classes, setClasses] = useState<ClassData[]>([
        {
            id: '1',
            name: 'Lớp 3A',
            grade: 3,
            year: 2024,
            teacher: 'Nguyễn Thị Hoa',
            studentCount: 25,
            status: 'active',
            startDate: '2024-09-01',
            endDate: '2025-05-31',
            description:
                'Lớp học tiếng Anh cơ bản cho học sinh lớp 3, tập trung vào từ vựng và giao tiếp đơn giản.',
            schedule: 'Thứ 2, 4, 6 - 8:00-9:30',
        },
        {
            id: '2',
            name: 'Lớp 3B',
            grade: 3,
            year: 2024,
            teacher: 'Trần Văn Nam',
            studentCount: 23,
            status: 'active',
            startDate: '2024-09-01',
            endDate: '2025-05-31',
            description: 'Lớp học tiếng Anh nâng cao cho học sinh lớp 3.',
            schedule: 'Thứ 3, 5, 7 - 14:00-15:30',
        },
        {
            id: '3',
            name: 'Lớp 3A',
            grade: 3,
            year: 2023,
            teacher: 'Lê Thị Mai',
            studentCount: 28,
            status: 'closed',
            startDate: '2023-09-01',
            endDate: '2024-05-31',
            description:
                'Lớp học tiếng Anh năm 2023 đã hoàn thành chương trình.',
            schedule: 'Thứ 2, 4, 6 - 8:00-9:30',
        },
        {
            id: '4',
            name: 'Lớp 4A',
            grade: 4,
            year: 2024,
            teacher: 'Phạm Thị Lan',
            studentCount: 26,
            status: 'active',
            startDate: '2024-09-01',
            endDate: '2025-05-31',
            description: 'Lớp học tiếng Anh cho học sinh lớp 4.',
            schedule: 'Thứ 2, 4, 6 - 10:00-11:30',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('all');
    const [filterYear, setFilterYear] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

    const handleCreateClass = (newClassData: Omit<ClassData, 'id'>) => {
        const newClass: ClassData = {
            ...newClassData,
            id: Date.now().toString(),
        };
        setClasses([...classes, newClass]);
    };

    const handleToggleStatus = (classId: string) => {
        setClasses(
            classes.map((cls) =>
                cls.id === classId
                    ? {
                          ...cls,
                          status: cls.status === 'active' ? 'closed' : 'active',
                      }
                    : cls
            )
        );
    };

    const handleEdit = (classData: ClassData) => {
        setSelectedClass(classData);
        // Implement edit functionality
        console.log('Edit class:', classData);
    };

    const handleViewDetails = (classData: ClassData) => {
        setSelectedClass(classData);
        // Implement view details functionality
        console.log('View details:', classData);
    };

    const filteredClasses = classes.filter((cls) => {
        const matchesSearch =
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade =
            filterGrade === 'all' || cls.grade.toString() === filterGrade;
        const matchesYear =
            filterYear === 'all' || cls.year.toString() === filterYear;
        const matchesStatus =
            filterStatus === 'all' || cls.status === filterStatus;

        return matchesSearch && matchesGrade && matchesYear && matchesStatus;
    });

    const stats = {
        total: classes.length,
        active: classes.filter((cls) => cls.status === 'active').length,
        closed: classes.filter((cls) => cls.status === 'closed').length,
        totalStudents: classes.reduce((sum, cls) => sum + cls.studentCount, 0),
    };

    const availableYears = [...new Set(classes.map((cls) => cls.year))].sort(
        (a, b) => b - a
    );
    const availableGrades = [...new Set(classes.map((cls) => cls.grade))].sort(
        (a, b) => a - b
    );

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
                                    Tổng Học Sinh
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.totalStudents}
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
                                        <SelectItem value="active">
                                            Đang hoạt động
                                        </SelectItem>
                                        <SelectItem value="closed">
                                            Đã đóng
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogCreateClass>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center space-x-2 bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer"
                            >
                                <Plus className="w-5 h-5 " />
                                <span>Tạo Lớp Học Mới</span>
                            </button>
                        </DialogCreateClass>
                    </div>
                </div>
            </div>

            {/* Classes Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                {filteredClasses.length === 0 ? (
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
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
