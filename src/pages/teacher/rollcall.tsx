import {
    Clipboard,
    CheckCircle,
    XCircle,
    Search,
    Calendar,
    BarChart3,
    UserCheck,
    UserX,
    Clock,
    BookOpen,
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Save,
    Filter,
} from 'lucide-react';
import { CLASSES } from '@/constant/classes';
import { STUDENTS } from '@/constant/student';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

const RollCall = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );

    const [showStats, setShowStats] = useState(false);
    const [showAddClass, setShowAddClass] = useState(false);

    // Dữ liệu mẫu với nhiều lớp học và học sinh
    const [classes, setClasses] = useState(CLASSES);

    const [students, setStudents] = useState(STUDENTS);

    const [newClassName, setNewClassName] = useState('');
    const [newClassSubject, setNewClassSubject] = useState('');
    const [newClassTeacher, setNewClassTeacher] = useState('');

    // Thống kê điểm danh
    const getAttendanceStats = (classId: string) => {
        const classStudents = students.filter((s) => s.classId === classId);
        const present = classStudents.filter(
            (s) => s.attendance === 'present'
        ).length;
        const absent = classStudents.filter(
            (s) => s.attendance === 'absent'
        ).length;
        const late = classStudents.filter(
            (s) => s.attendance === 'late'
        ).length;
        const total = classStudents.length;

        return {
            present,
            absent,
            late,
            total,
            presentRate: total > 0 ? Math.round((present / total) * 100) : 0,
        };
    };

    // Cập nhật trạng thái điểm danh

    // Lưu điểm danh

    // Thêm lớp học mới
    const addClass = () => {
        if (newClassName && newClassSubject && newClassTeacher) {
            const newClass = {
                id: String(classes.length + 1),
                name: newClassName,
                subject: newClassSubject,
                teacher: newClassTeacher,
                students: 0,
                color: `bg-${['blue', 'green', 'purple', 'red', 'yellow', 'indigo'][Math.floor(Math.random() * 6)]}-500`,
            };
            setClasses((prev) => [...prev, newClass]);
            setNewClassName('');
            setNewClassSubject('');
            setNewClassTeacher('');
            setShowAddClass(false);
        }
    };

    // Xuất dữ liệu CSV
    const exportToCSV = () => {
        const classData = classes.find((c) => c.id === selectedClass);
        const classStudents = filteredStudents;

        let csvContent = 'STT,Họ tên,Trạng thái,Số điện thoại\n';
        classStudents.forEach((student, index) => {
            const status =
                student.attendance === 'present'
                    ? 'Có mặt'
                    : student.attendance === 'absent'
                      ? 'Vắng'
                      : 'Muộn';
            csvContent += `${index + 1},${student.name},${status},${student.phone}\n`;
        });

        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;',
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `diem_danh_${classData.name}_${selectedDate}.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (showStats) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                                <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                                Thống kê điểm danh
                            </h1>
                            <button
                                onClick={() => setShowStats(false)}
                                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classes.map((cls) => {
                                const stats = getAttendanceStats(cls.id);
                                return (
                                    <div
                                        key={cls.id}
                                        className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div
                                                className={`w-4 h-4 rounded-full ${cls.color} mr-3`}
                                            ></div>
                                            <h3 className="font-semibold text-gray-800">
                                                {cls.name}
                                            </h3>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Tổng số học sinh:
                                                </span>
                                                <span className="font-medium">
                                                    {stats.total}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-green-600 flex items-center">
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Có mặt:
                                                </span>
                                                <span className="font-medium text-green-600">
                                                    {stats.present}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-red-600 flex items-center">
                                                    <XCircle className="w-4 h-4 mr-1" />
                                                    Vắng:
                                                </span>
                                                <span className="font-medium text-red-600">
                                                    {stats.absent}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-yellow-600 flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    Muộn:
                                                </span>
                                                <span className="font-medium text-yellow-600">
                                                    {stats.late}
                                                </span>
                                            </div>

                                            <div className="pt-2 mt-4 border-t border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        Tỷ lệ có mặt:
                                                    </span>
                                                    <span className="font-bold text-blue-600">
                                                        {stats.presentRate}%
                                                    </span>
                                                </div>
                                                <div className="mt-2 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${stats.presentRate}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold flex items-center">
                                    <Clipboard className="w-8 h-8 mr-3" />
                                    Hệ thống quản lý điểm danh
                                </h1>
                                <p className="mt-2 opacity-90">
                                    Quản lý điểm danh học sinh hiệu quả và
                                    chuyên nghiệp
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowStats(true)}
                                    className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors cursor-pointer"
                                >
                                    <BarChart3 className="w-4 h-4 mr-2 text-gray-900" />
                                    <p className="text-gray-900">Thống kê</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div>
                            {/* Date picker */}
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                    <label className="text-gray-700 font-medium">
                                        Ngày điểm danh:
                                    </label>
                                </div>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Chọn lớp để điểm danh
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {classes.map((cls) => {
                                    const stats = getAttendanceStats(cls.id);
                                    return (
                                        <Link
                                            key={cls.id}
                                            className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300"
                                            to={`/teacher/rollcall/${cls.id}`}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div
                                                    className={`w-12 h-12 ${cls.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                                                >
                                                    <BookOpen className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-800">
                                                        {stats.total}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        học sinh
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-gray-800 mb-2">
                                                {cls.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {cls.subject}
                                            </p>
                                            <p className="text-xs text-gray-500 mb-4">
                                                {cls.teacher}
                                            </p>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center text-green-600">
                                                    <UserCheck className="w-4 h-4 mr-1" />
                                                    {stats.present}
                                                </div>
                                                <div className="flex items-center text-red-600">
                                                    <UserX className="w-4 h-4 mr-1" />
                                                    {stats.absent}
                                                </div>
                                                <div className="flex items-center text-yellow-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {stats.late}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Class Modal */}
            {showAddClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Thêm lớp học mới
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên lớp
                                </label>
                                <input
                                    type="text"
                                    value={newClassName}
                                    onChange={(e) =>
                                        setNewClassName(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="VD: Lớp 6A - Toán"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Môn học
                                </label>
                                <input
                                    type="text"
                                    value={newClassSubject}
                                    onChange={(e) =>
                                        setNewClassSubject(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="VD: Toán học"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giáo viên
                                </label>
                                <input
                                    type="text"
                                    value={newClassTeacher}
                                    onChange={(e) =>
                                        setNewClassTeacher(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="VD: Cô Nguyễn Thị Lan"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddClass(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={addClass}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Thêm lớp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RollCall;
