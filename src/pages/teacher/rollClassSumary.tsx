import { CLASSES } from '@/constant/classes';
import { Link, useParams } from '@tanstack/react-router';
import { STUDENTS } from '@/constant/student';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Download,
    Filter,
    Save,
    Search,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
export default function RollClassSummary() {
    const params = { id: '1' };
    const classData = CLASSES.find((item) => item.id === params.id);
    const [students, setStudents] = useState(STUDENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const updateAttendance = (studentId, status) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === studentId
                    ? { ...student, attendance: status }
                    : student
            )
        );
    };
    const getAttendanceStats = (classId: string) => {
        const classStudents = STUDENTS.filter((s) => s.classId === classId);
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
    return (
        <div>
            {/* Class header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {classData?.name}
                    </h2>
                    <p className="text-gray-600">{classData?.teacher} </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Xuất CSV
                    </button>
                    <Link to="/teacher/rollcall">
                        <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Quay lại
                        </button>
                    </Link>
                </div>
            </div>

            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm học sinh..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-gray-500" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Tất cả</option>
                        <option value="present">Có mặt</option>
                        <option value="absent">Vắng</option>
                        <option value="late">Muộn</option>
                    </select>
                </div>
            </div>

            {/* Attendance summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {(() => {
                    const stats = getAttendanceStats(classData?.id || '');
                    return (
                        <>
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {stats.total}
                                </div>
                                <div className="text-sm text-blue-800">
                                    Tổng số
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {stats.present}
                                </div>
                                <div className="text-sm text-green-800">
                                    Có mặt
                                </div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {stats.absent}
                                </div>
                                <div className="text-sm text-red-800">Vắng</div>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {stats.late}
                                </div>
                                <div className="text-sm text-yellow-800">
                                    Muộn
                                </div>
                            </div>
                        </>
                    );
                })()}
            </div>

            {/* Students list */}
            <div className="space-y-3">
                {STUDENTS.map(
                    (student, index) =>
                        student.classId === classData?.id && (
                            <div
                                key={student.id}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="font-semibold text-blue-600">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800">
                                            {student.name}
                                        </span>
                                        <div className="text-sm text-gray-500">
                                            {student.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            className="form-radio h-4 w-4 text-green-500"
                                            checked={
                                                student.attendance === 'present'
                                            }
                                            onChange={() =>
                                                updateAttendance(
                                                    student.id,
                                                    'present'
                                                )
                                            }
                                        />
                                        <span className="ml-2 flex items-center text-green-600">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Có mặt
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            className="form-radio h-4 w-4 text-yellow-500"
                                            checked={
                                                student.attendance === 'late'
                                            }
                                            onChange={() =>
                                                updateAttendance(
                                                    student.id,
                                                    'late'
                                                )
                                            }
                                        />
                                        <span className="ml-2 flex items-center text-yellow-600">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Muộn
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`attendance-${student.id}`}
                                            className="form-radio h-4 w-4 text-red-500"
                                            checked={
                                                student.attendance === 'absent'
                                            }
                                            onChange={() =>
                                                updateAttendance(
                                                    student.id,
                                                    'absent'
                                                )
                                            }
                                        />
                                        <span className="ml-2 flex items-center text-red-600">
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Vắng
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )
                )}
            </div>

            {/* Save button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <Save className="w-4 h-4 mr-2" />
                    Lưu điểm danh
                </button>
            </div>
        </div>
    );
}
