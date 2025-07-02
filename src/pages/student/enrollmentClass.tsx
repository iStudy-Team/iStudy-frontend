import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Users,
    Calendar,
    Clock,
    DollarSign,
    Search,
    Filter,
    UserPlus,
    MapPin,
    Star,
    ChevronDown,
} from 'lucide-react';

// Mock data for classes
const mockClasses = [
    {
        id: 1,
        name: 'Toán học nâng cao',
        teacher: 'Thầy Nguyễn Văn A',
        grade_level: 'Lớp 10',
        subject: 'Toán học',
        capacity: 30,
        enrolled: 25,
        tuition_fee: '2,000,000 VND',
        start_date: '2024-09-01',
        end_date: '2024-12-31',
        schedule: 'Thứ 2, 4, 6 - 19:00-21:00',
        location: 'Phòng A101',
        rating: 4.8,
        description:
            'Lớp học chuyên sâu về các chủ đề toán học nâng cao dành cho học sinh lớp 10',
        status: 'OPEN',
    },
    {
        id: 2,
        name: 'Tiếng Anh giao tiếp',
        teacher: 'Cô Trần Thị B',
        grade_level: 'Lớp 11',
        subject: 'Tiếng Anh',
        capacity: 25,
        enrolled: 20,
        tuition_fee: '1,800,000 VND',
        start_date: '2024-09-15',
        end_date: '2024-12-15',
        schedule: 'Thứ 3, 5, 7 - 18:00-20:00',
        location: 'Phòng B205',
        rating: 4.9,
        description:
            'Phát triển kỹ năng giao tiếp tiếng Anh trong các tình huống thực tế',
        status: 'OPEN',
    },
    {
        id: 3,
        name: 'Vật lý thí nghiệm',
        teacher: 'Thầy Lê Văn C',
        grade_level: 'Lớp 12',
        subject: 'Vật lý',
        capacity: 20,
        enrolled: 18,
        tuition_fee: '2,200,000 VND',
        start_date: '2024-09-10',
        end_date: '2024-12-20',
        schedule: 'Thứ 2, 4 - 19:30-21:30',
        location: 'Phòng thí nghiệm C301',
        rating: 4.7,
        description:
            'Thực hành các thí nghiệm vật lý quan trọng cho kỳ thi THPT',
        status: 'OPEN',
    },
    {
        id: 4,
        name: 'Hóa học hữu cơ',
        teacher: 'Cô Phạm Thị D',
        grade_level: 'Lớp 11',
        subject: 'Hóa học',
        capacity: 25,
        enrolled: 15,
        tuition_fee: '1,900,000 VND',
        start_date: '2024-09-05',
        end_date: '2024-12-10',
        schedule: 'Thứ 3, 6 - 18:30-20:30',
        location: 'Phòng D102',
        rating: 4.6,
        description: 'Khám phá thế giới hóa học hữu cơ với các phản ứng thú vị',
        status: 'OPEN',
    },
    {
        id: 5,
        name: 'Văn học Việt Nam',
        teacher: 'Cô Hoàng Thị E',
        grade_level: 'Lớp 12',
        subject: 'Ngữ văn',
        capacity: 35,
        enrolled: 30,
        tuition_fee: '1,500,000 VND',
        start_date: '2024-09-08',
        end_date: '2024-12-25',
        schedule: 'Thứ 2, 5 - 19:00-21:00',
        location: 'Phòng E201',
        rating: 4.8,
        description:
            'Tìm hiểu sâu về văn học Việt Nam qua các tác phẩm kinh điển',
        status: 'OPEN',
    },
    {
        id: 6,
        name: 'Lịch sử Việt Nam',
        teacher: 'Thầy Đặng Văn F',
        grade_level: 'Lớp 10',
        subject: 'Lịch sử',
        capacity: 30,
        enrolled: 25,
        tuition_fee: '1,600,000 VND',
        start_date: '2024-09-12',
        end_date: '2024-12-18',
        schedule: 'Thứ 4, 7 - 18:00-20:00',
        location: 'Phòng F105',
        rating: 4.5,
        description: 'Khám phá dòng chảy lịch sử dân tộc Việt Nam',
        status: 'OPEN',
    },
];

// Pagination Component
const DevPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    limit = 6,
    visiblePages = 3,
}) => {
    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let end = Math.min(totalPages, start + visiblePages - 1);

        if (end - start + 1 < visiblePages) {
            start = Math.max(1, end - visiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePageNumbers = getVisiblePages();

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page, limit);
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`px-3 py-2 rounded-md ${
                    currentPage <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
            >
                Trước
            </button>

            {visiblePageNumbers[0] > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-2 rounded-md ${
                            currentPage === 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                    >
                        1
                    </button>
                    {visiblePageNumbers[0] > 2 && (
                        <span className="px-2">...</span>
                    )}
                </>
            )}

            {visiblePageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md ${
                        page === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border'
                    }`}
                >
                    {page}
                </button>
            ))}

            {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
                <>
                    {visiblePageNumbers[visiblePageNumbers.length - 1] <
                        totalPages - 1 && <span className="px-2">...</span>}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-2 rounded-md ${
                            currentPage === totalPages
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-3 py-2 rounded-md ${
                    currentPage >= totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
            >
                Sau
            </button>
        </div>
    );
};

export default function ClassEnrollment() {
    const [classes, setClasses] = useState(mockClasses);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 6;

    // Filter classes based on search and filters
    const filteredClasses = classes.filter((cls) => {
        const matchesSearch =
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade =
            !selectedGrade || cls.grade_level === selectedGrade;
        const matchesSubject =
            !selectedSubject || cls.subject === selectedSubject;

        return matchesSearch && matchesGrade && matchesSubject;
    });

    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
    const currentClasses = filteredClasses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEnroll = (classId, className) => {
        alert(`Bạn đã đăng ký thành công lớp: ${className}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getAvailableSlots = (capacity, enrolled) => {
        return capacity - enrolled;
    };

    const getGrades = () => [...new Set(classes.map((cls) => cls.grade_level))];
    const getSubjects = () => [...new Set(classes.map((cls) => cls.subject))];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Danh sách lớp học
                    </h1>
                    <p className="text-gray-600">
                        Khám phá và đăng ký các lớp học phù hợp với bạn
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm lớp học, giáo viên, môn học..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Bộ lọc</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Khối lớp
                                    </label>
                                    <select
                                        value={selectedGrade}
                                        onChange={(e) =>
                                            setSelectedGrade(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">
                                            Tất cả khối lớp
                                        </option>
                                        {getGrades().map((grade) => (
                                            <option key={grade} value={grade}>
                                                {grade}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Môn học
                                    </label>
                                    <select
                                        value={selectedSubject}
                                        onChange={(e) =>
                                            setSelectedSubject(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Tất cả môn học</option>
                                        {getSubjects().map((subject) => (
                                            <option
                                                key={subject}
                                                value={subject}
                                            >
                                                {subject}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentClasses.map((classData) => (
                        <div
                            key={classData.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                        >
                            {/* Class Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">
                                                {classData.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {classData.subject} -{' '}
                                                {classData.grade_level}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {classData.rating}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {classData.description}
                                </p>

                                {/* Teacher */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium">
                                            GV
                                        </span>
                                    </div>
                                    <span>{classData.teacher}</span>
                                </div>
                            </div>

                            {/* Class Details */}
                            <div className="px-6 pb-4 space-y-3">
                                {/* Capacity */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>Sức chứa</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">
                                        {classData.enrolled}/
                                        {classData.capacity} học sinh
                                    </span>
                                </div>

                                {/* Available slots */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Còn lại
                                    </span>
                                    <span
                                        className={`font-medium ${
                                            getAvailableSlots(
                                                classData.capacity,
                                                classData.enrolled
                                            ) > 5
                                                ? 'text-green-600'
                                                : 'text-orange-600'
                                        }`}
                                    >
                                        {getAvailableSlots(
                                            classData.capacity,
                                            classData.enrolled
                                        )}{' '}
                                        chỗ
                                    </span>
                                </div>

                                {/* Schedule */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{classData.schedule}</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{classData.location}</span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {formatDate(classData.start_date)} -{' '}
                                        {formatDate(classData.end_date)}
                                    </span>
                                </div>

                                {/* Tuition */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Học phí</span>
                                    </div>
                                    <span className="text-blue-600 font-semibold">
                                        {classData.tuition_fee}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-6 pb-6">
                                <button
                                    onClick={() =>
                                        handleEnroll(
                                            classData.id,
                                            classData.name
                                        )
                                    }
                                    disabled={
                                        getAvailableSlots(
                                            classData.capacity,
                                            classData.enrolled
                                        ) === 0
                                    }
                                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2 ${
                                        getAvailableSlots(
                                            classData.capacity,
                                            classData.enrolled
                                        ) === 0
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span>
                                        {getAvailableSlots(
                                            classData.capacity,
                                            classData.enrolled
                                        ) === 0
                                            ? 'Hết chỗ'
                                            : 'Đăng ký ngay'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {currentClasses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy lớp học
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <DevPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        limit={itemsPerPage}
                    />
                )}
            </div>
        </div>
    );
}
