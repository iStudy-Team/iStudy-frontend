import React, { useState } from 'react';
import { DevPagination } from '@/components/atoms/pagination';
import {
    Calendar,
    Clock,
    Users,
    BookOpen,
    Star,
    MapPin,
    Search,
    Filter,
    ChevronRight,
} from 'lucide-react';

// Mock data cho các lớp học
const mockClasses = [
    {
        id: 1,
        name: 'Toán Cao Cấp A1',
        instructor: 'TS. Nguyễn Văn A',
        schedule: 'Thứ 2, 4, 6 - 7:00-9:00',
        location: 'Phòng 301 - Tòa A',
        students: 45,
        maxStudents: 50,
        rating: 4.8,
        description:
            'Khóa học về giải tích và đại số tuyến tính cho sinh viên năm nhất',
        isEnrolled: false,
        category: 'Toán học',
    },
    {
        id: 2,
        name: 'Lập Trình Java Cơ Bản',
        instructor: 'ThS. Trần Thị B',
        schedule: 'Thứ 3, 5, 7 - 13:00-15:00',
        location: 'Phòng máy 201 - Tòa B',
        students: 38,
        maxStudents: 40,
        rating: 4.9,
        description: 'Học lập trình Java từ cơ bản đến nâng cao',
        isEnrolled: true,
        category: 'Lập trình',
    },
    {
        id: 3,
        name: 'Tiếng Anh Giao Tiếp',
        instructor: 'Ms. Sarah Johnson',
        schedule: 'Thứ 2, 4 - 15:00-17:00',
        location: 'Phòng 105 - Tòa C',
        students: 25,
        maxStudents: 30,
        rating: 4.7,
        description:
            'Phát triển kỹ năng giao tiếp tiếng Anh trong môi trường học thuật',
        isEnrolled: false,
        category: 'Ngoại ngữ',
    },
    {
        id: 4,
        name: 'Vật Lý Đại Cương',
        instructor: 'GS. Lê Minh C',
        schedule: 'Thứ 3, 6 - 9:00-11:00',
        location: 'Phòng 401 - Tòa A',
        students: 42,
        maxStudents: 45,
        rating: 4.6,
        description: 'Cơ học, nhiệt học và điện từ học cơ bản',
        isEnrolled: false,
        category: 'Vật lý',
    },
    {
        id: 5,
        name: 'Hóa Học Đại Cương',
        instructor: 'PGS. Hoàng Văn D',
        schedule: 'Thứ 2, 5 - 9:00-11:00',
        location: 'Phòng 205 - Tòa B',
        students: 35,
        maxStudents: 40,
        rating: 4.5,
        description: 'Các nguyên lý cơ bản của hóa học và ứng dụng',
        isEnrolled: true,
        category: 'Hóa học',
    },
    {
        id: 6,
        name: 'Kinh Tế Vi Mô',
        instructor: 'TS. Nguyễn Thị E',
        schedule: 'Thứ 4, 7 - 15:00-17:00',
        location: 'Phòng 102 - Tòa C',
        students: 28,
        maxStudents: 35,
        rating: 4.7,
        description:
            'Nghiên cứu hành vi của cá nhân và doanh nghiệp trong thị trường',
        isEnrolled: false,
        category: 'Kinh tế',
    },
    {
        id: 7,
        name: 'Triết Học Mác-Lênin',
        instructor: 'GS. Phạm Văn F',
        schedule: 'Thứ 3, 6 - 7:00-9:00',
        location: 'Phòng 301 - Tòa A',
        students: 50,
        maxStudents: 60,
        rating: 4.3,
        description:
            'Học thuyết triết học Mác-Lênin và ứng dụng trong thời đại mới',
        isEnrolled: false,
        category: 'Chính trị',
    },
    {
        id: 8,
        name: 'Lịch Sử Đảng Cộng Sản Việt Nam',
        instructor: 'TS. Lê Thị G',
        schedule: 'Thứ 2, 4 - 13:00-15:00',
        location: 'Phòng 403 - Tòa A',
        students: 48,
        maxStudents: 55,
        rating: 4.4,
        description:
            'Lịch sử hình thành và phát triển của Đảng Cộng sản Việt Nam',
        isEnrolled: true,
        category: 'Lịch sử',
    },
    {
        id: 9,
        name: 'Thể Dục 1',
        instructor: 'ThS. Trần Văn H',
        schedule: 'Thứ 3, 5 - 15:00-17:00',
        location: 'Sân thể thao',
        students: 30,
        maxStudents: 35,
        rating: 4.8,
        description: 'Rèn luyện thể chất và tinh thần thể thao',
        isEnrolled: false,
        category: 'Thể dục',
    },
    {
        id: 10,
        name: 'Tin Học Cơ Sở',
        instructor: 'ThS. Vũ Thị I',
        schedule: 'Thứ 4, 6 - 9:00-11:00',
        location: 'Phòng máy 101 - Tòa B',
        students: 32,
        maxStudents: 35,
        rating: 4.6,
        description: 'Kiến thức cơ bản về tin học và ứng dụng văn phòng',
        isEnrolled: false,
        category: 'Tin học',
    },
    {
        id: 11,
        name: 'Cơ Sở Dữ Liệu',
        instructor: 'TS. Đỗ Văn J',
        schedule: 'Thứ 2, 4, 6 - 13:00-15:00',
        location: 'Phòng máy 202 - Tòa B',
        students: 40,
        maxStudents: 45,
        rating: 4.7,
        description: 'Thiết kế và quản lý cơ sở dữ liệu quan hệ',
        isEnrolled: true,
        category: 'Lập trình',
    },
    {
        id: 12,
        name: 'Mạng Máy Tính',
        instructor: 'PGS. Bùi Thị K',
        schedule: 'Thứ 3, 5 - 9:00-11:00',
        location: 'Phòng máy 203 - Tòa B',
        students: 36,
        maxStudents: 40,
        rating: 4.5,
        description: 'Nguyên lý và kỹ thuật mạng máy tính',
        isEnrolled: false,
        category: 'Mạng',
    },
    {
        id: 13,
        name: 'Kỹ Thuật Phần Mềm',
        instructor: 'TS. Phạm Minh L',
        schedule: 'Thứ 4, 6 - 13:00-15:00',
        location: 'Phòng máy 301 - Tòa B',
        students: 35,
        maxStudents: 40,
        rating: 4.8,
        description: 'Quy trình phát triển phần mềm và quản lý dự án',
        isEnrolled: false,
        category: 'Lập trình',
    },
    {
        id: 14,
        name: 'Trí Tuệ Nhân Tạo',
        instructor: 'PGS. Nguyễn Văn M',
        schedule: 'Thứ 2, 5 - 15:00-17:00',
        location: 'Phòng máy 302 - Tòa B',
        students: 30,
        maxStudents: 35,
        rating: 4.9,
        description: 'Machine Learning và Deep Learning cơ bản',
        isEnrolled: true,
        category: 'AI',
    },
    {
        id: 15,
        name: 'An Toàn Thông Tin',
        instructor: 'TS. Lê Thị N',
        schedule: 'Thứ 3, 7 - 9:00-11:00',
        location: 'Phòng máy 204 - Tòa B',
        students: 28,
        maxStudents: 32,
        rating: 4.6,
        description: 'Bảo mật hệ thống và mạng máy tính',
        isEnrolled: false,
        category: 'Bảo mật',
    },
    {
        id: 16,
        name: 'Phát Triển Web',
        instructor: 'ThS. Hoàng Văn O',
        schedule: 'Thứ 4, 6 - 7:00-9:00',
        location: 'Phòng máy 205 - Tòa B',
        students: 42,
        maxStudents: 45,
        rating: 4.7,
        description: 'HTML, CSS, JavaScript và các framework hiện đại',
        isEnrolled: false,
        category: 'Web',
    },
    {
        id: 17,
        name: 'Mobile App Development',
        instructor: 'TS. Trần Minh P',
        schedule: 'Thứ 2, 4 - 9:00-11:00',
        location: 'Phòng máy 303 - Tòa B',
        students: 33,
        maxStudents: 38,
        rating: 4.8,
        description: 'Phát triển ứng dụng di động với React Native và Flutter',
        isEnrolled: true,
        category: 'Mobile',
    },
    {
        id: 18,
        name: 'Cloud Computing',
        instructor: 'PGS. Vũ Thị Q',
        schedule: 'Thứ 5, 7 - 13:00-15:00',
        location: 'Phòng máy 206 - Tòa B',
        students: 25,
        maxStudents: 30,
        rating: 4.5,
        description: 'AWS, Azure và các dịch vụ cloud computing',
        isEnrolled: false,
        category: 'Cloud',
    },
];

export default function ErnollmentClass() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [enrolledClasses, setEnrolledClasses] = useState(
        mockClasses.filter((cls) => cls.isEnrolled).map((cls) => cls.id)
    );

    const classesPerPage = 9;

    // Lọc các lớp học
    const filteredClasses = mockClasses.filter((cls) => {
        const matchesSearch =
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'all' || cls.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredClasses.length / classesPerPage);
    const startIndex = (currentPage - 1) * classesPerPage;
    const currentClasses = filteredClasses.slice(
        startIndex,
        startIndex + classesPerPage
    );

    const handlePageChange = (page, limit) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEnroll = (classId) => {
        setEnrolledClasses((prev) =>
            prev.includes(classId)
                ? prev.filter((id) => id !== classId)
                : [...prev, classId]
        );
    };

    const categories = [
        'all',
        'Toán học',
        'Lập trình',
        'Ngoại ngữ',
        'Vật lý',
        'Hóa học',
        'Kinh tế',
        'Chính trị',
        'Lịch sử',
        'Thể dục',
        'Tin học',
        'Mạng',
        'AI',
        'Bảo mật',
        'Web',
        'Mobile',
        'Cloud',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 ">
                        Đăng Ký Lớp Học
                    </h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm lớp học, giảng viên..."
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-700 placeholder-gray-500"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="relative lg:w-64">
                            <Filter className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                            <select
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 text-gray-700"
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">Tất cả môn học</option>
                                {categories.slice(1).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {currentClasses.map((cls) => (
                        <div
                            key={cls.id}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 hover:scale-105"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {cls.name}
                                        </h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                                            <span className="text-sm font-medium">
                                                {cls.instructor}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full shadow-md">
                                        <Star className="h-4 w-4 text-white mr-1" />
                                        <span className="text-sm font-bold text-white">
                                            {cls.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="h-4 w-4 mr-3 text-green-500" />
                                        <span className="text-sm">
                                            {cls.schedule}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-4 w-4 mr-3 text-red-500" />
                                        <span className="text-sm">
                                            {cls.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Users className="h-4 w-4 mr-3 text-purple-500" />
                                        <span className="text-sm">
                                            {cls.students}/{cls.maxStudents}{' '}
                                            sinh viên
                                        </span>
                                        <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                style={{
                                                    width: `${(cls.students / cls.maxStudents) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                    {cls.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-2 rounded-full border border-blue-200">
                                        {cls.category}
                                    </span>
                                    <button
                                        onClick={() => handleEnroll(cls.id)}
                                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                                            enrolledClasses.includes(cls.id)
                                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 shadow-green-200'
                                                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-200'
                                        }`}
                                    >
                                        {enrolledClasses.includes(cls.id)
                                            ? '✓ Đã đăng ký'
                                            : 'Đăng ký ngay'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredClasses.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Không tìm thấy lớp học
                        </h3>
                        <p className="text-gray-600">
                            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                        <DevPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            limit={classesPerPage}
                        />
                    </div>
                )}

                {/* Stats */}
                <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Thống Kê Tổng Quan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {filteredClasses.length}
                            </div>
                            <div className="text-blue-100">Lớp học có sẵn</div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {enrolledClasses.length}
                            </div>
                            <div className="text-green-100">Lớp đã đăng ký</div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {categories.length - 1}
                            </div>
                            <div className="text-purple-100">
                                Danh mục môn học
                            </div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {Math.round(
                                    (mockClasses.reduce(
                                        (sum, cls) => sum + cls.rating,
                                        0
                                    ) /
                                        mockClasses.length) *
                                        10
                                ) / 10}
                            </div>
                            <div className="text-yellow-100">
                                Đánh giá trung bình
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
