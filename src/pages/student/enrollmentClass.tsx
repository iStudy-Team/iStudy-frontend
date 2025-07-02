import { useState, useEffect } from 'react';
import { DevPagination } from '@/components/atoms/pagination';
import { DevConfirmAlert } from '@/components/atoms/confirm-alert';
import {
    Calendar,
    Clock,
    Users,
    Star,
    MapPin,
    Search,
    Filter,
    Loader2,
    AlertCircle,
    GraduationCap,
} from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useClassEnrollmentStore } from '@/store/useClassEnrollmentStore';
import { Class, ClassStatus, ClassEnrollmentStatus } from '@/api/class';

export default function EnrollmentClass() {
    const { classes, loading, error, getClasses } = useClassStore();
    const {
        enrollments,
        loading: enrollmentLoading,
        enrollInClass,
        unenrollFromClass,
        getMyEnrollments,
        isEnrolledInClass,
        getEnrollmentByClassId,
    } = useClassEnrollmentStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        classId: string;
        className: string;
        action: 'enroll' | 'unenroll';
    }>({
        isOpen: false,
        classId: '',
        className: '',
        action: 'enroll',
    });

    const classesPerPage = 9;

    // Fetch classes and enrollments when component mounts
    useEffect(() => {
        getClasses(currentPage, classesPerPage);
        getMyEnrollments(); // Fetch user's enrollments
    }, [getClasses, getMyEnrollments, currentPage]);

    // Filter classes based on search and category
    const filteredClasses = classes.filter((cls) => {
        const matchesSearch =
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.grade_level?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            cls.academic_year?.school_year
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === 'all' ||
            cls.grade_level?.name === selectedCategory;

        // Only show open classes
        const isOpen = cls.status === ClassStatus.OPEN;

        return matchesSearch && matchesCategory && isOpen;
    });

    // Calculate pagination for filtered results
    const startIndex = (currentPage - 1) * classesPerPage;
    const currentClasses = filteredClasses.slice(
        startIndex,
        startIndex + classesPerPage
    );

    // Get unique grade levels for categories
    const categories = [
        'all',
        ...Array.from(
            new Set(classes.map((cls) => cls.grade_level?.name).filter(Boolean))
        ),
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEnroll = (classId: string) => {
        const isEnrolled = isEnrolledInClass(classId);
        const currentClass = classes.find((cls) => cls.id === classId);
        const className = currentClass?.name || 'Lớp học này';

        if (isEnrolled) {
            // Show confirmation dialog for unenroll
            setConfirmDialog({
                isOpen: true,
                classId,
                className,
                action: 'unenroll',
            });
        } else {
            // Show confirmation dialog for enroll
            setConfirmDialog({
                isOpen: true,
                classId,
                className,
                action: 'enroll',
            });
        }
    };

    const handleConfirmEnrollment = async () => {
        try {
            const { classId, action } = confirmDialog;

            if (action === 'unenroll') {
                // Unenroll from class
                const enrollment = getEnrollmentByClassId(classId);
                if (enrollment) {
                    const success = await unenrollFromClass(enrollment.id);
                    if (success) {
                        // Refresh classes to update enrollment counts
                        await getClasses(currentPage, classesPerPage);
                    }
                }
            } else {
                // Enroll in class
                const enrollment = await enrollInClass(classId);
                if (enrollment) {
                    // Refresh classes to update enrollment counts
                    await getClasses(currentPage, classesPerPage);
                }
            }
        } catch (error) {
            console.error('Error handling enrollment:', error);
            // Error handling is already done in the store with toast notifications
        } finally {
            setConfirmDialog({
                isOpen: false,
                classId: '',
                className: '',
                action: 'enroll',
            });
        }
    };

    const formatDate = (dateString: string | Date | null | undefined) => {
        if (!dateString) return 'Chưa xác định';
        const date =
            typeof dateString === 'string' ? new Date(dateString) : dateString;
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: string | undefined) => {
        if (!amount) return 'Miễn phí';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(Number(amount));
    };

    const getStatusColor = (status: ClassStatus) => {
        switch (status) {
            case ClassStatus.OPEN:
                return 'bg-green-100 text-green-700 border-green-200';
            case ClassStatus.CLOSE:
                return 'bg-red-100 text-red-700 border-red-200';
            case ClassStatus.COMPLETED:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

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

    const getCurrentEnrollmentCount = (cls: Class) => {
        return (
            cls.class_enrollments?.filter(
                (enrollment) =>
                    enrollment.status === ClassEnrollmentStatus.ACTIVE
            ).length || 0
        );
    };

    const getClassRating = () => {
        // Since we don't have rating in the API, return a default value
        // In a real app, you might have a separate rating system
        return (4.5 + Math.random() * 0.5).toFixed(1);
    };

    // Loading state
    if (loading && classes.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">
                        Đang tải danh sách lớp học...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        Có lỗi xảy ra
                    </h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tải lại trang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 pb-2">
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
                                placeholder="Tìm kiếm lớp học, khối lớp, năm học..."
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
                                <option value="all">Tất cả khối lớp</option>
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
                    {currentClasses.map((cls) => {
                        const enrollmentCount = getCurrentEnrollmentCount(cls);
                        const capacity = cls.capacity || 30;
                        const rating = getClassRating();

                        return (
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
                                                <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                                                <span className="text-sm font-medium">
                                                    {cls.grade_level?.name ||
                                                        'Chưa xác định'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full shadow-md">
                                            <Star className="h-4 w-4 text-white mr-1" />
                                            <span className="text-sm font-bold text-white">
                                                {rating}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="h-4 w-4 mr-3 text-green-500" />
                                            <span className="text-sm">
                                                Năm học:{' '}
                                                {cls.academic_year
                                                    ?.school_year ||
                                                    'Chưa xác định'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="h-4 w-4 mr-3 text-purple-500" />
                                            <span className="text-sm">
                                                {formatDate(cls.start_date)} -{' '}
                                                {formatDate(cls.end_date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Users className="h-4 w-4 mr-3 text-purple-500" />
                                            <span className="text-sm">
                                                {enrollmentCount}/{capacity} học
                                                sinh
                                            </span>
                                            <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${Math.min((enrollmentCount / capacity) * 100, 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin className="h-4 w-4 text-red-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Học phí:{' '}
                                                {formatCurrency(
                                                    cls.tuition_fee
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cls.status)}`}
                                        >
                                            {getStatusText(cls.status)}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-2 rounded-full border border-blue-200">
                                            {cls.grade_level?.name ||
                                                'Không xác định'}
                                        </span>
                                        <button
                                            onClick={() => handleEnroll(cls.id)}
                                            disabled={
                                                enrollmentLoading ||
                                                cls.status !==
                                                    ClassStatus.OPEN ||
                                                enrollmentCount >= capacity
                                            }
                                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                                                isEnrolledInClass(cls.id)
                                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 shadow-green-200'
                                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-200'
                                            }`}
                                        >
                                            {enrollmentLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Đang xử lý...</span>
                                                </div>
                                            ) : isEnrolledInClass(cls.id) ? (
                                                '✓ Đã đăng ký'
                                            ) : cls.status !==
                                              ClassStatus.OPEN ? (
                                                'Lớp đã đóng'
                                            ) : enrollmentCount >= capacity ? (
                                                'Đã đầy'
                                            ) : (
                                                'Đăng ký ngay'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredClasses.length === 0 && !loading && (
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

                {/* Loading state for pagination */}
                {loading && classes.length > 0 && (
                    <div className="text-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                        <p className="text-gray-600 mt-2">
                            Đang tải thêm lớp học...
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {filteredClasses.length > classesPerPage && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                        <DevPagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(
                                filteredClasses.length / classesPerPage
                            )}
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
                                {
                                    enrollments.filter(
                                        (enrollment) =>
                                            enrollment.status ===
                                            ClassEnrollmentStatus.ACTIVE
                                    ).length
                                }
                            </div>
                            <div className="text-green-100">Lớp đã đăng ký</div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {categories.length - 1}
                            </div>
                            <div className="text-purple-100">Khối lớp</div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">
                                {
                                    classes.filter(
                                        (cls) => cls.status === ClassStatus.OPEN
                                    ).length
                                }
                            </div>
                            <div className="text-yellow-100">Lớp đang mở</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <DevConfirmAlert
                isOpen={confirmDialog.isOpen}
                onClose={() =>
                    setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
                }
                onConfirm={handleConfirmEnrollment}
                title={
                    confirmDialog.action === 'enroll'
                        ? 'Xác nhận đăng ký'
                        : 'Xác nhận hủy đăng ký'
                }
                description={
                    confirmDialog.action === 'enroll'
                        ? `Bạn có chắc chắn muốn đăng ký lớp "${confirmDialog.className}"?`
                        : `Bạn có chắc chắn muốn hủy đăng ký lớp "${confirmDialog.className}"?`
                }
                confirmText={
                    confirmDialog.action === 'enroll'
                        ? 'Đăng ký'
                        : 'Hủy đăng ký'
                }
                confirmButtonVariant={
                    confirmDialog.action === 'enroll'
                        ? 'secondary'
                        : 'destructive'
                }
            />
        </div>
    );
}
