import {
    User,
    BookOpen,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const StudentDashboard = () => {
    // Giả lập dữ liệu học sinh đăng nhập (trong thực tế sẽ lấy từ auth hoặc API)
    const [student, setStudent] = useState({
        id: 's001',
        name: 'Nguyễn Văn A',
        classId: 'c001',
        className: 'Lớp 6A - Toán',
        teacher: 'Cô Nguyễn Thị Lan',
        phone: '0987654321',
        email: 'student@example.com',
    });

    // Giả lập dữ liệu điểm danh
    const [attendanceData, setAttendanceData] = useState({
        totalSessions: 30,
        present: 25,
        absent: 3,
        late: 2,
        attendanceRate: 83,
        recentRecords: [
            { date: '2023-05-15', status: 'present', note: '' },
            { date: '2023-05-12', status: 'absent', note: 'Bị ốm' },
            { date: '2023-05-08', status: 'late', note: 'Đến muộn 10 phút' },
            { date: '2023-05-05', status: 'present', note: '' },
            { date: '2023-05-01', status: 'present', note: '' },
        ],
    });

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen ">
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold flex items-center">
                                    <User className="w-6 h-6 mr-3" />
                                    Thông tin học sinh
                                </h1>
                                <p className="mt-1 opacity-90">
                                    Xem thông tin điểm danh và lịch sử học tập
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Student Info */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-4 rounded-full mr-4">
                                    <User className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {student.name}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Lớp học
                                            </p>
                                            <p className="font-medium flex items-center">
                                                <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                                                {student.className}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Giáo viên
                                            </p>
                                            <p className="font-medium">
                                                {student.teacher}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Số điện thoại
                                            </p>
                                            <p className="font-medium">
                                                {student.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Email
                                            </p>
                                            <p className="font-medium">
                                                {student.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Stats */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Thống kê điểm danh
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            {/* Total Sessions */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tổng số buổi
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {attendanceData.totalSessions}
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Present */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Có mặt
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {attendanceData.present}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Absent */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Vắng mặt
                                        </p>
                                        <p className="text-2xl font-bold text-red-600">
                                            {attendanceData.absent}
                                        </p>
                                    </div>
                                    <div className="bg-red-100 p-2 rounded-lg">
                                        <XCircle className="w-5 h-5 text-red-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Late */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Đi muộn
                                        </p>
                                        <p className="text-2xl font-bold text-yellow-600">
                                            {attendanceData.late}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-100 p-2 rounded-lg">
                                        <Clock className="w-5 h-5 text-yellow-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Rate */}
                        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-800">
                                    Tỷ lệ điểm danh
                                </h4>
                                <span className="text-xl font-bold text-blue-600">
                                    {attendanceData.attendanceRate}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-blue-600 h-4 rounded-full"
                                    style={{
                                        width: `${attendanceData.attendanceRate}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Recent Attendance */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Lịch sử điểm danh gần đây
                        </h3>
                        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ghi chú
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attendanceData.recentRecords.map(
                                        (record, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {record.date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {record.status ===
                                                        'present' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Có mặt
                                                        </span>
                                                    )}
                                                    {record.status ===
                                                        'absent' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Vắng mặt
                                                        </span>
                                                    )}
                                                    {record.status ===
                                                        'late' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            Đi muộn
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {record.note || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 bg-gray-50 text-right">
                                <button className="text-sm text-blue-600 hover:text-blue-800">
                                    Xem tất cả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
