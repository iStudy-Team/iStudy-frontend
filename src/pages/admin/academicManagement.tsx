import { useEffect, useState } from 'react';
import {
    Plus,
    Search,
    Lock,
    Unlock,
    AlertCircle,
    Clock,
    GraduationCap,
    School,
} from 'lucide-react';
import { useAcademicStore } from '@/store/useAcademicStore';
import { Academic } from '@/api/academic';
import { Modal } from '@/components/atoms/modal';
import { AcademicForm } from '@/components/molecules/admin.academic.form';
import { GradeForm } from '@/components/molecules/admin.grade.form';
import { AcademicCard } from '@/components/molecules/admin.academic.card';
import { Grade } from '@/api/grade';
import { DevPagination } from '@/components/atoms/pagination';
import { GradeCard } from '@/components/molecules/admin.grade.card';
import { useGradeStore } from '@/store/useGradeStore';
import { confirm } from '@/composables/onConfirm';
import { DialogAcademicDetails } from '@/components/dialogAcademicDetails';
import { DialogGradeDetails } from '@/components/dialogGradeDetails';

// Main Component
export default function CourseGradeManagement() {
    const [activeTab, setActiveTab] = useState<'courses' | 'grades'>('courses');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [showAcademicDetailsDialog, setShowAcademicDetailsDialog] =
        useState(false);
    const [showGradeDetailsDialog, setShowGradeDetailsDialog] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Academic | null>(null);
    const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);
    const [selectedAcademicForDetails, setSelectedAcademicForDetails] =
        useState<Academic | null>(null);
    const [selectedGradeForDetails, setSelectedGradeForDetails] =
        useState<Grade | null>(null);
    const { academicYears, getAllAcademicYears } = useAcademicStore();
    const { grades, fetchGrades, deleteGrade } = useGradeStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPagesAcademic, setTotalPagesAcademic] = useState(0);
    const [totalPagesGrade, setTotalPagesGrade] = useState(0);

    const handlePageChange = async (page: number, limit: number) => {
        setCurrentPage(page);
        setLimit(limit);
    };

    // Sample data for courses
    const courses = academicYears || [];

    // Filter functions
    const filteredCourses = courses.filter((course) =>
        course.school_year.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGrades = grades.filter(
        (grade) =>
            grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (grade.description &&
                grade.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    // Stats
    const courseStats = {
        total: courses.length,
        active: courses.filter((c) => c.status === 1).length,
        inactive: courses.filter((c) => c.status === 0).length,
        completed: courses.filter((c) => c.status === 2).length,
    };

    const gradeStats = {
        total: grades.length,
    };

    const handleEditCourse = (Academic: Academic) => {
        setCurrentCourse(Academic);
        setShowCourseModal(true);
    };

    const handleViewCourseDetails = (Academic: Academic) => {
        setSelectedAcademicForDetails(Academic);
        setShowAcademicDetailsDialog(true);
    };

    const handleEditGrade = (Grade: Grade) => {
        setCurrentGrade(Grade);
        setShowGradeModal(true);
    };

    const handleViewGradeDetails = (Grade: Grade) => {
        setSelectedGradeForDetails(Grade);
        setShowGradeDetailsDialog(true);
    };

    const handleDeleteGrade = async (gradeId: string) => {
        confirm({
            title: 'Xác nhận xóa khối',
            description: 'Bạn có chắc chắn muốn xóa khối này không?',
            cancelText: 'Hủy',
            confirmText: 'Xóa',
            onConfirm: async () => {
                await deleteGrade(gradeId);
            },
        });
        setCurrentGrade(null);
        setShowGradeModal(false);
    };

    useEffect(() => {
        getAllAcademicYears(currentPage, limit).then((res) => {
            setTotalPagesAcademic(
                res.totalCount ? Math.ceil(res.totalCount / limit) : 0
            );
        });
        fetchGrades(currentPage, limit).then((res) => {
            setTotalPagesGrade(
                res.totalCount ? Math.ceil(res.totalCount / limit) : 0
            );
        });
    }, [currentPage, limit, getAllAcademicYears, fetchGrades]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Khóa Học & Khối
                    </h1>
                    <p className="text-blue-100">
                        Quản lý khóa học và khối lớp trong hệ thống giáo dục
                    </p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto px-8 -mt-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                                activeTab === 'courses'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <GraduationCap className="w-5 h-5" />
                            <span>Khóa Học</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('grades')}
                            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                                activeTab === 'grades'
                                    ? 'text-purple-600 border-b-2 border-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <School className="w-5 h-5" />
                            <span>Khối Lớp</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-8 mb-8">
                {activeTab === 'courses' ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Tổng Khóa Học
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {courseStats.total}
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
                                        Đang Hoạt Động
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {courseStats.active}
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
                                        Không Hoạt Động
                                    </p>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {courseStats.inactive}
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
                                        Đã Hoàn Thành
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {courseStats.completed}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Tổng Khối
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {gradeStats.total}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <School className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto px-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder={
                                    activeTab === 'courses'
                                        ? 'Tìm kiếm khóa học...'
                                        : 'Tìm kiếm khối lớp...'
                                }
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                            />
                        </div>

                        <Modal
                            isOpen={
                                activeTab === 'courses'
                                    ? showCourseModal
                                    : showGradeModal
                            }
                            title={
                                activeTab === 'courses'
                                    ? currentCourse
                                        ? 'Chỉnh sửa khóa học'
                                        : 'Tạo khóa học mới'
                                    : currentGrade
                                      ? 'Chỉnh sửa khối'
                                      : 'Tạo khối mới'
                            }
                            onOpen={() => {
                                if (activeTab === 'courses') {
                                    setShowCourseModal(!showCourseModal);
                                    setCurrentCourse(null);
                                } else {
                                    setShowGradeModal(!showGradeModal);
                                    setCurrentGrade(null);
                                }
                            }}
                            button={
                                <button
                                    className={`flex items-center space-x-2 cursor-pointer ${
                                        activeTab === 'courses'
                                            ? 'bg-blue-500 hover:bg-blue-600'
                                            : 'bg-purple-500 hover:bg-purple-600'
                                    } text-white px-6 py-2 rounded-lg transition-colors`}
                                    onClick={() => {
                                        if (activeTab === 'courses') {
                                            setShowCourseModal(true);
                                            setCurrentCourse(null);
                                        } else {
                                            setShowGradeModal(true);
                                            setCurrentGrade(null);
                                        }
                                    }}
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>
                                        {activeTab === 'courses'
                                            ? 'Tạo Khóa Học Mới'
                                            : 'Tạo Khối Mới'}
                                    </span>
                                </button>
                            }
                        >
                            {activeTab === 'courses' ? (
                                <AcademicForm
                                    initialData={currentCourse || undefined}
                                    onCancel={() => {
                                        setShowCourseModal(false);
                                        setCurrentCourse(null);
                                    }}
                                    currentCourse={currentCourse}
                                    closeModal={() => {
                                        setShowCourseModal(false);
                                        setCurrentCourse(null);
                                    }}
                                />
                            ) : (
                                <GradeForm
                                    initialData={currentGrade || undefined}
                                    onCancel={() => {
                                        setShowGradeModal(false);
                                        setCurrentGrade(null);
                                    }}
                                    closeModal={() => {
                                        setShowGradeModal(false);
                                        setCurrentGrade(null);
                                    }}
                                    currentGrade={currentGrade}
                                />
                            )}
                        </Modal>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                {activeTab === 'courses' ? (
                    filteredCourses.length === 0 ? (
                        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy khóa học nào
                            </h3>
                            <p className="text-gray-500">
                                Thử thay đổi từ khóa tìm kiếm hoặc tạo khóa học
                                mới
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <AcademicCard
                                    key={course.id}
                                    Academic={course}
                                    onEdit={handleEditCourse}
                                    onViewDetails={handleViewCourseDetails}
                                />
                            ))}
                        </div>
                    )
                ) : filteredGrades.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy khối lớp nào
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi từ khóa tìm kiếm hoặc tạo khối mới
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGrades.map((grade) => (
                            <GradeCard
                                key={grade.id}
                                Grade={grade}
                                onEdit={handleEditGrade}
                                onViewDetails={handleViewGradeDetails}
                                onDelete={handleDeleteGrade}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-8 mb-8">
                <DevPagination
                    currentPage={currentPage}
                    totalPages={
                        activeTab === 'courses'
                            ? totalPagesAcademic
                            : totalPagesGrade
                    }
                    onPageChange={handlePageChange}
                    limit={limit}
                />
            </div>

            {/* Dialog Components */}
            <DialogAcademicDetails
                isOpen={showAcademicDetailsDialog}
                onClose={() => {
                    setShowAcademicDetailsDialog(false);
                    setSelectedAcademicForDetails(null);
                }}
                academic={selectedAcademicForDetails}
            />

            <DialogGradeDetails
                isOpen={showGradeDetailsDialog}
                onClose={() => {
                    setShowGradeDetailsDialog(false);
                    setSelectedGradeForDetails(null);
                }}
                grade={selectedGradeForDetails}
            />
        </div>
    );
}
