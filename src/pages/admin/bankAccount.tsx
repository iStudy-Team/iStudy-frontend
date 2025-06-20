import React, { useState } from 'react';
import { Search } from 'lucide-react';

const BankAccountViewer = () => {
    const [accounts] = useState([
        {
            id: 1,
            bank: 'MBBank',
            accountNumber: '2811200440',
            accountHolder: 'TO KHAC GIAP',
            accountType: 'Obito',
            connectionStatus: 'API Banking',
            statusColor: 'bg-green-500',
            balance: 0,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAccounts = accounts.filter(
        (account) =>
            account.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.accountNumber.includes(searchTerm) ||
            account.accountHolder
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const getBankIcon = (bank) => {
        const icons = {
            MBBank: '🏛️',
            Vietcombank: '🏦',
            Techcombank: '💳',
            BIDV: '🏢',
            VietinBank: '🏪',
            ACB: '🏬',
            TPBank: '🏭',
        };
        return icons[bank] || '🏦';
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Tài khoản ngân hàng</h1>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Xem</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-white border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="text-gray-600">mục</span>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Tìm:</span>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="bg-white border border-gray-300 rounded px-3 py-1 pl-8 text-sm w-64"
                                    placeholder="Tìm kiếm..."
                                />
                                <Search
                                    size={16}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-700">
                                    Ngân hàng
                                </th>
                                <th className="text-left p-4 font-medium text-gray-700">
                                    Chủ tài khoản
                                </th>
                                <th className="text-left p-4 font-medium text-gray-700">
                                    Kết nối qua
                                </th>
                                <th className="text-left p-4 font-medium text-gray-700">
                                    Số dư
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccounts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        {searchTerm
                                            ? 'Không tìm thấy kết quả phù hợp'
                                            : 'Không có dữ liệu'}
                                    </td>
                                </tr>
                            ) : (
                                currentAccounts.map((account) => (
                                    <tr
                                        key={account.id}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {getBankIcon(account.bank)}
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {account.bank}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {account.accountNumber}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-blue-600 font-medium">
                                                {account.accountHolder}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {account.accountType}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-orange-500">
                                                    🔗
                                                </span>
                                                <span>
                                                    {account.connectionStatus}
                                                </span>
                                                <span
                                                    className={`w-2 h-2 rounded-full ${account.statusColor}`}
                                                ></span>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded text-white ${
                                                        account.statusColor ===
                                                        'bg-green-500'
                                                            ? 'bg-green-500'
                                                            : 'bg-yellow-500'
                                                    }`}
                                                >
                                                    {account.statusColor ===
                                                    'bg-green-500'
                                                        ? 'Đã kết nối'
                                                        : 'Đang kết nối'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-mono text-gray-700">
                                                {formatCurrency(
                                                    account.balance
                                                )}{' '}
                                                đ
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                        Đang xem {startIndex + 1} đến{' '}
                        {Math.min(endIndex, filteredAccounts.length)} trong tổng
                        số {filteredAccounts.length} mục
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trước
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded transition-colors ${
                                    currentPage === index + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Tiếp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankAccountViewer;
