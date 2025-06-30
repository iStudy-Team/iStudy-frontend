import { useState, useEffect } from 'react';
import {
    DollarSign,
    User,
    Save,
    X,
    Edit,
    Calendar,
    Download,
    Filter,
    Plus,
} from 'lucide-react';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useStudentStore } from '@/store/useStudentStore';
import { useClassStore } from '@/store/useClassStore';
import { DialogInvoice } from '@/components/dialogInvoice';
import { Invoice } from '@/api/invoice';

// Extended interface for display purposes
interface InvoiceWithStudentClass extends Invoice {
    student_name?: string;
    class_name?: string;
}

const FeeManage = () => {
    const { invoices, getAllInvoices, updateInvoice, getFinancialSummary } =
        useInvoiceStore();

    const { students, getAllStudents } = useStudentStore();
    const { classes, getAllClasses } = useClassStore();

    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

    // State cho thống kê tài chính
    const [timeRange, setTimeRange] = useState('month');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('feeManagement'); // 'feeManagement' hoặc 'financeStats'

    // Fetch data on component mount
    useEffect(() => {
        getAllStudents();
        getAllClasses();
        getAllInvoices();
    }, [getAllStudents, getAllClasses, getAllInvoices]);

    // Create extended invoices with student and class information
    const invoicesWithDetails: InvoiceWithStudentClass[] = (invoices || []).map(
        (invoice) => {
            const student = (students || []).find(
                (s) => s.id === invoice.student_id
            );
            const classInfo = (classes || []).find(
                (c) => c.id === invoice.class_id
            );
            return {
                ...invoice,
                student_name: student?.full_name,
                class_name: classInfo?.name,
            };
        }
    );

    // Get financial summary
    const financialSummary = getFinancialSummary();

    // Format date thành chuỗi YYYY-MM-DD để sử dụng với input type="date"
    const formatDateForInput = (date: Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Xử lý thay đổi ngày từ input type="date"
    const handleDateChange = (dateString: string, isStartDate: boolean) => {
        const date = new Date(dateString);
        if (isStartDate) {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    // Xử lý thay đổi giảm giá
    const handleDiscountChange = async (
        invoiceId: string,
        discountAmount: number
    ) => {
        const invoice = invoices.find((inv) => inv.id === invoiceId);
        if (invoice) {
            const finalAmount = invoice.amount - discountAmount;
            await updateInvoice(invoiceId, {
                discount_amount: discountAmount,
                final_amount: Math.max(0, finalAmount),
            });
            // Refresh data
            getAllInvoices();
        }
    };

    // Xử lý thay đổi bộ lọc thời gian
    const handleTimeRangeChange = (range: string) => {
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

    const handleDialogSuccess = () => {
        getAllInvoices();
        setEditingInvoice(null);
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
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center">
                            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                            Quản lý học phí
                        </h1>

                        <DialogInvoice onSuccess={handleDialogSuccess}>
                            <button className="flex items-center space-x-2 bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer">
                                <Plus className="w-5 h-5" />
                                <span>Tạo Hóa Đơn Mới</span>
                            </button>
                        </DialogInvoice>
                    </div>

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
                                        Tháng/Năm
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
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {invoicesWithDetails.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="w-5 h-5 text-blue-600 mr-2" />
                                                <span>
                                                    {invoice.student_name ||
                                                        'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {invoice.class_name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {invoice.month}/{invoice.year}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {invoice.amount.toLocaleString(
                                                'vi-VN'
                                            )}
                                            ₫
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingInvoice?.id ===
                                            invoice.id ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="number"
                                                        value={
                                                            invoice.discount_amount ||
                                                            0
                                                        }
                                                        onChange={(e) =>
                                                            handleDiscountChange(
                                                                invoice.id,
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || 0
                                                            )
                                                        }
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded mr-2"
                                                        min="0"
                                                    />
                                                    <span className="text-sm">
                                                        ₫
                                                    </span>
                                                </div>
                                            ) : (
                                                `${(invoice.discount_amount || 0).toLocaleString('vi-VN')}₫`
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                                            {(
                                                invoice.final_amount ||
                                                invoice.amount
                                            ).toLocaleString('vi-VN')}
                                            ₫
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    invoice.status === 'PAID'
                                                        ? 'bg-green-100 text-green-700'
                                                        : invoice.status ===
                                                            'OVERDUE'
                                                          ? 'bg-red-100 text-red-700'
                                                          : invoice.status ===
                                                              'CANCELLED'
                                                            ? 'bg-gray-100 text-gray-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {invoice.status === 'PAID'
                                                    ? 'Đã thanh toán'
                                                    : invoice.status ===
                                                        'OVERDUE'
                                                      ? 'Quá hạn'
                                                      : invoice.status ===
                                                          'CANCELLED'
                                                        ? 'Đã hủy'
                                                        : 'Chờ thanh toán'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingInvoice?.id ===
                                            invoice.id ? (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            setEditingInvoice(
                                                                null
                                                            )
                                                        }
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        <Save className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setEditingInvoice(
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
                                                        setEditingInvoice(
                                                            invoice
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
                                {financialSummary.expectedIncome.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Tổng giảm giá
                            </h3>
                            <p className="text-2xl font-bold text-red-600">
                                {financialSummary.totalDiscount.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200 bg-green-50">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                Tổng thực thu
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {financialSummary.actualIncome.toLocaleString(
                                    'vi-VN'
                                )}
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
                                {financialSummary.expectedIncome.toLocaleString(
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
                                {financialSummary.actualIncome.toLocaleString(
                                    'vi-VN'
                                )}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {(
                                    (financialSummary.actualIncome /
                                        financialSummary.expectedIncome) *
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
                                {Math.round(
                                    financialSummary.actualIncome * 0.7
                                ).toLocaleString('vi-VN')}
                                ₫
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                70% thu nhập
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
                            <div className="text-sm text-gray-500 mb-2">
                                Còn lại
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                                {financialSummary.outstandingBalance.toLocaleString(
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
                                                Tháng/Năm
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
                                                Trạng thái
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tỷ lệ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoicesWithDetails.map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium">
                                                        {invoice.student_name ||
                                                            'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {invoice.student_id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {invoice.class_name ||
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {invoice.month}/
                                                    {invoice.year}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {invoice.amount.toLocaleString(
                                                        'vi-VN'
                                                    )}
                                                    ₫
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-green-600">
                                                    {invoice.status === 'PAID'
                                                        ? (
                                                              invoice.final_amount ||
                                                              invoice.amount
                                                          ).toLocaleString(
                                                              'vi-VN'
                                                          )
                                                        : '0'}
                                                    ₫
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                                    {invoice.status !== 'PAID'
                                                        ? (
                                                              invoice.final_amount ||
                                                              invoice.amount
                                                          ).toLocaleString(
                                                              'vi-VN'
                                                          )
                                                        : '0'}
                                                    ₫
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            invoice.status ===
                                                            'PAID'
                                                                ? 'bg-green-100 text-green-700'
                                                                : invoice.status ===
                                                                    'OVERDUE'
                                                                  ? 'bg-red-100 text-red-700'
                                                                  : invoice.status ===
                                                                      'CANCELLED'
                                                                    ? 'bg-gray-100 text-gray-700'
                                                                    : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                    >
                                                        {invoice.status ===
                                                        'PAID'
                                                            ? 'Đã thanh toán'
                                                            : invoice.status ===
                                                                'OVERDUE'
                                                              ? 'Quá hạn'
                                                              : invoice.status ===
                                                                  'CANCELLED'
                                                                ? 'Đã hủy'
                                                                : 'Chờ thanh toán'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{
                                                                width: `${invoice.status === 'PAID' ? 100 : 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-xs text-right mt-1">
                                                        {invoice.status ===
                                                        'PAID'
                                                            ? 100
                                                            : 0}
                                                        %
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
