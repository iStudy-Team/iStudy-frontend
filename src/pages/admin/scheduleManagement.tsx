import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Eye,
    Calendar,
    Clock,
    BookOpen,
    AlertCircle,
    Loader2,
    Users,
    CalendarDays,
    Trash2,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DialogSchedule } from '@/components/dialogSchedule';
import { useScheduleStore } from '@/store/useScheduleStore';
import { useClassStore } from '@/store/useClassStore';
import { Schedule } from '@/api/schedule';
import { toast } from 'sonner';

// Schedule Card Component with extended data
interface ScheduleWithClass extends Schedule {
    class_name?: string;
    grade_level_id?: string;
    academic_year_id?: string;
}

const ScheduleCard = ({
    scheduleData,
    onEdit,
    onDelete,
    onViewDetails,
}: {
    scheduleData: ScheduleWithClass;
    onEdit: (scheduleData: Schedule) => void;
    onDelete: (id: string) => void;
    onViewDetails: (scheduleData: Schedule) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const formatDate = (date?: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (time?: string | Date) => {
        if (!time) return '';
        if (time instanceof Date) {
            return time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        return time;
    };

    const getDayOfWeek = (date?: Date) => {
        if (!date) return '';
        const days = [
            'Chủ Nhật',
            'Thứ Hai',
            'Thứ Ba',
            'Thứ Tư',
            'Thứ Năm',
            'Thứ Sáu',
            'Thứ Bảy',
        ];
        return days[new Date(date).getDay()];
    };

    const isUpcoming = (date?: Date) => {
        if (!date) return false;
        const today = new Date();
        const scheduleDate = new Date(date);
        return scheduleDate >= today;
    };

    return (
        <div
            className={`rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow ${
                isUpcoming(scheduleData.day)
                    ? 'bg-[#f8f9fa] border-gray-100'
                    : 'bg-gray-50 border-gray-200'
            }`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isUpcoming(scheduleData.day)
                                ? 'bg-teal-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <Calendar
                            className={`w-6 h-6 ${
                                isUpcoming(scheduleData.day)
                                    ? 'text-teal-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {scheduleData.class_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {getDayOfWeek(scheduleData.day)} -{' '}
                            {formatDate(scheduleData.day)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isUpcoming(scheduleData.day)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {isUpcoming(scheduleData.day) ? 'Sắp tới' : 'Đã qua'}
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
                                        onViewDetails(scheduleData);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(scheduleData);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Chỉnh sửa</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(scheduleData.id);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Xóa lịch</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                        {formatTime(scheduleData.start_time)} -{' '}
                        {formatTime(scheduleData.end_time)}
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>
                        Grade: {scheduleData.grade_level_id} - Year:{' '}
                        {scheduleData.academic_year_id}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function ScheduleManagementAdmin() {
    const {
        schedules,
        loading,
        error,
        getSchedulesByClassOrDay,
        clearError,
        getSchedulesByMultipleClasses,
    } = useScheduleStore();

    const { classes, getAllClasses } = useClassStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(
        null
    );

    // Fetch data on component mount
    useEffect(() => {
        getAllClasses();
        getSchedulesByClassOrDay({ page: 1, limit: 50 });
    }, [getAllClasses, getSchedulesByClassOrDay]);

    // Fetch schedules by multiple classes when classes change
    useEffect(() => {
        const classIds = (classes || []).map((cls) => cls.id);
        if (classIds.length > 0) {
            getSchedulesByMultipleClasses({ class_ids: classIds });
        }
    }, [classes, getSchedulesByMultipleClasses]);

    // Create extended schedules with class information
    const schedulesWithClassInfo: ScheduleWithClass[] = (schedules || []).map(
        (schedule) => {
            const classInfo = (classes || []).find(
                (cls) => cls.id === schedule.class_id
            );
            return {
                ...schedule,
                class_name: classInfo?.name,
                grade_level_id: classInfo?.grade_level_id,
                academic_year_id: classInfo?.academic_year_id,
            };
        }
    );

    const handleEdit = (scheduleData: Schedule) => {
        setEditingSchedule(scheduleData);
    };

    const handleDelete = async (scheduleId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa lịch học này?')) {
            // For now, we'll implement delete in the store if needed
            // TODO: Add delete functionality to the schedule store
            console.log('Delete schedule:', scheduleId);
            toast.success('Xóa lịch học thành công');
            getSchedulesByClassOrDay({ page: 1, limit: 50 });
        }
    };

    const handleViewDetails = (scheduleData: Schedule) => {
        console.log('View details:', scheduleData);
        // Implement view details functionality
    };

    const handleDialogSuccess = () => {
        // Refresh data after successful create/update
        getSchedulesByClassOrDay({ page: 1, limit: 50 });
        setEditingSchedule(null);
    };

    // Clear error on component unmount
    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const filteredSchedules = schedulesWithClassInfo.filter((schedule) => {
        const matchesClass =
            filterClass === 'all' || schedule.class_id === filterClass;
        const matchesSearch =
            schedule.class_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) || false;

        let matchesDate = true;
        if (filterDate === 'upcoming') {
            matchesDate = schedule.day
                ? new Date(schedule.day) >= new Date()
                : false;
        } else if (filterDate === 'past') {
            matchesDate = schedule.day
                ? new Date(schedule.day) < new Date()
                : false;
        }

        return matchesClass && matchesSearch && matchesDate;
    });

    const stats = {
        total: schedulesWithClassInfo.length,
        upcoming: schedulesWithClassInfo.filter(
            (s) => s.day && new Date(s.day) >= new Date()
        ).length,
        past: schedulesWithClassInfo.filter(
            (s) => s.day && new Date(s.day) < new Date()
        ).length,
        today: schedulesWithClassInfo.filter((s) => {
            if (!s.day) return false;
            const today = new Date();
            const scheduleDate = new Date(s.day);
            return scheduleDate.toDateString() === today.toDateString();
        }).length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-400 to-teal-500 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Lịch Học
                    </h1>
                    <p className="text-teal-100">
                        Quản lý lịch học cho các lớp tiếng Anh
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
                                    Tổng Lịch Học
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CalendarDays className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Hôm Nay
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.today}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Sắp Tới
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.upcoming}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Đã Qua
                                </p>
                                <p className="text-2xl font-bold text-gray-600">
                                    {stats.past}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-600" />
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
                                    placeholder="Tìm kiếm lớp học..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                />
                            </div>

                            <Select
                                value={filterClass}
                                onValueChange={(value) => setFilterClass(value)}
                            >
                                <SelectTrigger className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                    <SelectValue placeholder="Tất cả lớp học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Tất cả lớp học
                                        </SelectItem>
                                        {(classes || []).map((cls) => (
                                            <SelectItem
                                                key={cls.id}
                                                value={cls.id}
                                            >
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterDate}
                                onValueChange={(value) => setFilterDate(value)}
                            >
                                <SelectTrigger className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                    <SelectValue placeholder="Tất cả thời gian" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">
                                            Tất cả thời gian
                                        </SelectItem>
                                        <SelectItem value="upcoming">
                                            Sắp tới
                                        </SelectItem>
                                        <SelectItem value="past">
                                            Đã qua
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogSchedule
                            editData={editingSchedule}
                            onSuccess={handleDialogSuccess}
                        >
                            <button className="flex items-center space-x-2 bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer">
                                <Plus className="w-5 h-5" />
                                <span>Tạo Lịch Học Mới</span>
                            </button>
                        </DialogSchedule>
                    </div>
                </div>
            </div>

            {/* Schedules Grid */}
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
                            onClick={() => {
                                getSchedulesByClassOrDay({
                                    page: 1,
                                    limit: 50,
                                });
                                clearError();
                            }}
                            className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500"
                        >
                            Thử lại
                        </button>
                    </div>
                ) : filteredSchedules.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy lịch học nào
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi bộ lọc hoặc tạo lịch học mới
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSchedules.map((scheduleData) => (
                            <ScheduleCard
                                key={scheduleData.id}
                                scheduleData={scheduleData}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
