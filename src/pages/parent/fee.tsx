import { DollarSign, Percent, Clipboard, Download } from 'lucide-react';

export default function FeeParent() {
    const tuitionData = {
        studentName: 'Nguyễn Văn A',
        className: '6A',
        monthlyFee: 500000,
        discount: 10,
        finalFee: 450000,
        unpaidMonths: [
            {
                month: 5,
                year: 2024,
                fee: 450000,
                discount: 10,
                status: 'unpaid',
            },
            {
                month: 6,
                year: 2024,
                fee: 450000,
                discount: 10,
                status: 'unpaid',
            },
        ],
        discountReason: 'Giảm 10% cho con cán bộ',
    };

    const totalDue = tuitionData.unpaidMonths.reduce(
        (sum, month) => sum + month.fee,
        0
    );

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <h1 className="text-2xl font-bold flex items-center">
                            <DollarSign className="w-6 h-6 mr-3" />
                            Thông tin học phí
                        </h1>
                        <p className="mt-1 opacity-90">
                            Học sinh: {tuitionData.studentName} - Lớp:{' '}
                            {tuitionData.className}
                        </p>
                    </div>

                    <div className="p-6">
                        {/* Thông tin học phí */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <Clipboard className="w-5 h-5 mr-2 text-blue-600" />
                                Biểu phí hàng tháng
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="text-sm text-gray-600 mb-1">
                                        Học phí gốc
                                    </div>
                                    <div className="text-xl font-bold">
                                        {tuitionData.monthlyFee.toLocaleString(
                                            'vi-VN'
                                        )}
                                        ₫
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                        <Percent className="w-4 h-4 mr-1" />
                                        Giảm giá
                                    </div>
                                    <div className="text-xl font-bold text-red-600">
                                        {tuitionData.discount}% (-
                                        {(
                                            (tuitionData.monthlyFee *
                                                tuitionData.discount) /
                                            100
                                        ).toLocaleString('vi-VN')}
                                        ₫)
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {tuitionData.discountReason}
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                                    <div className="text-sm text-gray-600 mb-1">
                                        Học phí thực tế
                                    </div>
                                    <div className="text-xl font-bold text-green-600">
                                        {tuitionData.finalFee.toLocaleString(
                                            'vi-VN'
                                        )}
                                        ₫
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Các tháng chưa đóng */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Các tháng chưa thanh toán
                            </h2>

                            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tháng
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Học phí gốc
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Giảm giá
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Thành tiền
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Trạng thái
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tuitionData.unpaidMonths.map(
                                            (month, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        Tháng {month.month}/
                                                        {month.year}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {tuitionData.monthlyFee.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                                        -{month.discount}% (
                                                        {(
                                                            (tuitionData.monthlyFee *
                                                                month.discount) /
                                                            100
                                                        ).toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫)
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                        {month.fee.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                            Chưa thanh toán
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Tổng kết */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        Tổng số tiền cần thanh toán:
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Bao gồm{' '}
                                        {tuitionData.unpaidMonths.length} tháng
                                        chưa đóng
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {totalDue.toLocaleString('vi-VN')}₫
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Đã giảm:{' '}
                                        {(
                                            ((tuitionData.monthlyFee *
                                                tuitionData.discount) /
                                                100) *
                                            tuitionData.unpaidMonths.length
                                        ).toLocaleString('vi-VN')}
                                        ₫
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Download className="w-5 h-5 mr-2" />
                                    Xuất hoá đơn
                                </button>
                                <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Thanh toán ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
