import { useState } from 'react';
import {
    DollarSign,
    Percent,
    User,
    Save,
    X,
    Edit,
    Calendar,
    Download,
    Filter,
} from 'lucide-react';

const FeeManage = () => {
    // State cho quản lý học phí
    const [students, setStudents] = useState([
        {
            id: 'HS001',
            name: 'Nguyễn Văn A',
            className: '6A',
            baseFee: 500000,
            discount: 0,
            finalFee: 500000,
            note: '',
        },
        {
            id: 'HS002',
            name: 'Trần Thị B',
            className: '6A',
            baseFee: 500000,
            discount: 10,
            finalFee: 450000,
            note: 'Giảm 10% cho con cán bộ',
        },
    ]);

    const [editingStudent, setEditingStudent] = useState(null);

    // State cho thống kê tài chính
    const [timeRange, setTimeRange] = useState('month');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('feeManagement'); // 'feeManagement' hoặc 'financeStats'

    // Format date thành chuỗi YYYY-MM-DD để sử dụng với input type="date"
    const formatDateForInput = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Xử lý thay đổi ngày từ input type="date"
    const handleDateChange = (dateString, isStartDate) => {
        const date = new Date(dateString);
        if (isStartDate) {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    // Dữ liệu thống kê mẫu
    const financialData = {
        expectedIncome: students.reduce((sum, s) => sum + s.baseFee, 0),
        actualIncome: students.reduce((sum, s) => sum + s.finalFee, 0),
        paidToTeachers: Math.round(
            students.reduce((sum, s) => sum + s.finalFee, 0) * 0.7
        ),
        outstandingBalance: students.reduce(
            (sum, s) => sum + (s.baseFee - s.finalFee),
            0
        ),
        paymentDetails: students.map((student) => ({
            studentId: student.id,
            studentName: student.name,
            className: student.className,
            expected: student.baseFee,
            paid: student.finalFee,
            remaining: student.baseFee - student.finalFee,
            lastPayment: new Date().toLocaleDateString('vi-VN'),
        })),
    };

    // Xử lý thay đổi giảm giá
    const handleDiscountChange = (id, value) => {
        const numericValue = Math.min(100, Math.max(0, parseInt(value) || 0));

        setStudents((prev) =>
            prev.map((student) => {
                if (student.id === id) {
                    const finalFee = Math.round(
                        (student.baseFee * (100 - numericValue)) / 100
                    );
                    return {
                        ...student,
                        discount: numericValue,
                        finalFee,
                        note: numericValue > 0 ? `Giảm ${numericValue}%` : '',
                    };
                }
                return student;
            })
        );
    };

    // Xử lý thay đổi bộ lọc thời gian
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        const now = new Date();
        if (range === 'month') {
            setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
            setEndDate(now);
        } else if (range === 'quarter') {
            const quarter = Math.floor(now.getMonth() / 3);
            setStartDate(new Date(now.getFullYear(), quarter * 3, 1));
            setEndDate(now);
        } else if (range === 'year') {
            setStartDate(new Date(now.getFullYear(), 0, 1));
            setEndDate(now);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Tab điều hướng */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`px-6 py-3 font-medium ${activeTab === 'feeManagement' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('feeManagement')}
                >
                    Quản lý học phí
                </button>
                <button
                    className={`px-6 py-3 font-medium ${activeTab === 'financeStats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('financeStats')}
                >
                    Thống kê tài chính
                </button>
            </div>

            {/* Giao diện quản lý học phí */}
            {activeTab === 'feeManagement' && (
                <div>
                    <h1 className="text-2xl font-bold mb-6 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                        Quản lý học phí
                    </h1>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Học sinh
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Lớp
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Học phí gốc
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Giảm giá
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Thực thu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Ghi chú
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="w-5 h-5 text-blue-600 mr-2" />
                                                <span>{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {student.className}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {student.baseFee.toLocaleString(
                                                'vi-VN'
                                            )}
                                            ₫
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingStudent === student.id ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="number"
                                                        value={student.discount}
                                                        onChange={(e) =>
                                                            handleDiscountChange(
                                                                student.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded mr-2"
                                                        min="0"
                                                        max="100"
                                                    />
                                                    <Percent className="w-4 h-4 text-gray-500" />
                                                </div>
                                            ) : (
                                                `${student.discount}%`
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                                            {student.finalFee.toLocaleString(
                                                'vi-VN'
                                            )}
                                            ₫
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingStudent === student.id ? (
                                                <input
                                                    type="text"
                                                    value={student.note}
                                                    onChange={(e) =>
                                                        setStudents((prev) =>
                                                            prev.map((s) =>
                                                                s.id ===
                                                                student.id
                                                                    ? {
                                                                          ...s,
                                                                          note: e
                                                                              .target
                                                                              .value,
                                                                      }
                                                                    : s
                                                            )
                                                        )
                                                    }
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    placeholder="Lý do giảm giá"
                                                />
                                            ) : (
                                                <span className="text-sm text-gray-600">
                                                    {student.note}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingStudent === student.id ? (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            setEditingStudent(
                                                                null
                                                            )
                                                        }
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        <Save className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setEditingStudent(
                                                                null
                                                            )
                                                        }
                                                        className="text-gray-600 hover:text-gray-800"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setEditingStudent(
                                                            student.id
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tổng kết học phí */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Tổng học phí gốc
                            </h3>
                            <p className="text-2xl font-bold">
                                {students
                                    .reduce((sum, s) => sum + s.baseFee, 0)
                                    .toLocaleString('vi-VN')}
                                ₫
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Tổng giảm giá
                            </h3>
                            <p className="text-2xl font-bold text-red-600">
                                {students
                                    .reduce(
                                        (sum, s) =>
                                            sum + (s.baseFee - s.finalFee),
                                        0
                                    )
                                    .toLocaleString('vi-VN')}
                                ₫
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200 bg-green-50">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Tổng thực thu
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {students
                                    .reduce((sum, s) => sum + s.finalFee, 0)
                                    .toLocaleString('vi-VN')}
                                ₫
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Giao diện thống kê tài chính */}
            {activeTab === 'financeStats' && (
                <div>
                    <h1 className="text-2xl font-bold mb-6 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                        Thống kê tài chính
                    </h1>

                    {/* Bộ lọc thời gian */}
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() =>
                                        handleTimeRangeChange('month')
                                    }
                                    className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                                >
                                    Theo tháng
                                </button>
                                <button
                                    onClick={() =>
                                        handleTimeRangeChange('quarter')
                                    }
                                    className={`px-4 py-2 rounded-lg ${timeRange === 'quarter' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                                >
                                    Theo quý
                                </button>
                                <button
                                    onClick={() =>
                                        handleTimeRangeChange('year')
                                    }
                                    className={`px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                                >
                                    Theo năm
                                </button>
                                <button
                                    onClick={() =>
                                        handleTimeRangeChange('custom')
                                    }
                                    className={`px-4 py-2 rounded-lg ${timeRange === 'custom' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                                >
                                    Tuỳ chọn
                                </button>
                            </div>

                            {timeRange === 'custom' && (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                        <input
                                            type="date"
                                            value={formatDateForInput(
                                                startDate
                                            )}
                                            onChange={(e) =>
                                                handleDateChange(
                                                    e.target.value,
                                                    true
                                                )
                                            }
                                            className="border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                    <span>đến</span>
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                        <input
                                            type="date"
                                            value={formatDateForInput(endDate)}
                                            onChange={(e) =>
                                                handleDateChange(
                                                    e.target.value,
                                                    false
                                                )
                                            }
                                            className="border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                </div>
                            )}

                            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Filter className="w-5 h-5 mr-2" />
                                Lọc dữ liệu
                            </button>
                        </div>
                    </div>

                    {/* Thống kê tổng quan */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
                            <div className="text-sm text-gray-500 mb-2">
                                Dự kiến thu
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                                {financialData.expectedIncome.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                Theo số buổi học
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
                            <div className="text-sm text-gray-500 mb-2">
                                Đã thu
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                {financialData.actualIncome.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {(
                                    (financialData.actualIncome /
                                        financialData.expectedIncome) *
                                        100 || 0
                                ).toFixed(1)}
                                % so với dự kiến
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-200">
                            <div className="text-sm text-gray-500 mb-2">
                                Đã trả giáo viên
                            </div>
                            <div className="text-2xl font-bold text-purple-600">
                                {financialData.paidToTeachers.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {(
                                    (financialData.paidToTeachers /
                                        financialData.actualIncome) *
                                        100 || 0
                                ).toFixed(1)}
                                % thu nhập
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
                            <div className="text-sm text-gray-500 mb-2">
                                Còn lại
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                                {financialData.outstandingBalance.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                Chưa thu từ học sinh
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết thanh toán */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Chi tiết thanh toán học sinh
                                </h2>
                                <div className="flex space-x-3">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm học sinh..."
                                        className="px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        <Download className="w-5 h-5 mr-2" />
                                        Xuất báo cáo
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Học sinh
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Lớp
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Dự kiến
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Đã đóng
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Còn lại
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Lần đóng cuối
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tỷ lệ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {financialData.paymentDetails.map(
                                            (student, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium">
                                                            {
                                                                student.studentName
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {student.studentId}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {student.className}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {student.expected.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-green-600">
                                                        {student.paid.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                                        {student.remaining.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.lastPayment ||
                                                            'Chưa đóng'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{
                                                                    width: `${(student.paid / student.expected) * 100}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-xs text-right mt-1">
                                                            {(
                                                                (student.paid /
                                                                    student.expected) *
                                                                    100 || 0
                                                            ).toFixed(1)}
                                                            %
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeManage;
