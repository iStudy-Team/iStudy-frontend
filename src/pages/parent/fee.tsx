import {
    DollarSign,
    Percent,
    Clipboard,
    Download,
    Loader2,
    QrCode,
    Copy,
    CheckCircle,
    Loader,
} from 'lucide-react';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserProfileStore } from '@/store/useUserProfileStore';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { usePaymentStore } from '@/store/usePaymentStore';
import { InvoiceStatusEnum } from '@/api/invoice';
import { CreatePaymentCredentials, Payment } from '@/api/payment';
import { Button } from '@/components/ui/button';

export default function FeeParent() {
    const { user, getInfoMe } = useAuthStore();
    const {
        relations,
        loading: relationsLoading,
        getRelationsByParentId,
        getAllStudents,
        students,
    } = useUserProfileStore();
    const {
        invoices,
        loading: invoicesLoading,
        getInvoicesByStudent,
        getInvoiceById,
    } = useInvoiceStore();
    const { createPayment, loading: paymentLoading } = usePaymentStore();

    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
        null
    );
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

    // Payment states
    const [paymentStep, setPaymentStep] = useState<
        'confirm' | 'qr' | 'success'
    >('confirm');
    const [createdPayment, setCreatedPayment] = useState<Payment | null>(null);
    const [paymentReference, setPaymentReference] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [checkingPayment, setCheckingPayment] = useState(false);

    // Ref for payment section to maintain scroll position
    const paymentSectionRef = useRef<HTMLDivElement>(null);
    const scrollLockRef = useRef<number | null>(null);
    const isScrollLockedRef = useRef<boolean>(false);
    const scrollCleanupRef = useRef<(() => void) | null>(null);

    // Stable scroll management function with throttling
    const maintainScrollPosition = useCallback(() => {
        if (isScrollLockedRef.current && scrollLockRef.current !== null) {
            const currentScroll =
                window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(currentScroll - scrollLockRef.current) > 3) {
                // Use requestAnimationFrame for smooth, non-blocking scroll correction
                requestAnimationFrame(() => {
                    if (
                        isScrollLockedRef.current &&
                        scrollLockRef.current !== null
                    ) {
                        window.scrollTo({
                            top: scrollLockRef.current,
                            behavior: 'auto',
                        });
                    }
                });
            }
        }
    }, []);

    // Memoize the unpaid invoices to prevent unnecessary re-renders
    const unpaidInvoices = useMemo(() => {
        return invoices.filter(
            (invoice) =>
                invoice.status === InvoiceStatusEnum.UNPAID ||
                invoice.status === InvoiceStatusEnum.OVERDUE
        );
    }, [invoices]);

    // Memoize selected invoice data to prevent re-renders
    const selectedInvoiceData = useMemo(() => {
        return selectedInvoice
            ? unpaidInvoices.find((invoice) => invoice.id === selectedInvoice)
            : null;
    }, [selectedInvoice, unpaidInvoices]);

    // Get current student data
    const currentStudent = students.find((s) => s.id === selectedStudentId);

    // Generate payment reference when starting payment
    useEffect(() => {
        if (paymentStep === 'qr' && selectedInvoice) {
            const reference = `PAY-${Date.now()}-${selectedInvoice.slice(-6)}`;
            setPaymentReference(reference);
        }
    }, [paymentStep, selectedInvoice]);

    // Check payment status with stable scroll management
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;
        let scrollHandler: (() => void) | null = null;

        if (paymentStep === 'qr' && selectedInvoiceData && createdPayment) {
            setCheckingPayment(true);

            // Lock scroll position once when QR step starts
            if (paymentSectionRef.current && !isScrollLockedRef.current) {
                const rect = paymentSectionRef.current.getBoundingClientRect();
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                scrollLockRef.current = scrollTop + rect.top - 100;
                isScrollLockedRef.current = true;

                window.scrollTo({
                    top: scrollLockRef.current,
                    behavior: 'smooth',
                });

                // Add scroll event listener with throttling
                scrollHandler = () => maintainScrollPosition();
                window.addEventListener('scroll', scrollHandler, {
                    passive: true,
                });

                // Store cleanup function in ref
                scrollCleanupRef.current = () => {
                    if (scrollHandler) {
                        window.removeEventListener('scroll', scrollHandler);
                    }
                    isScrollLockedRef.current = false;
                    scrollLockRef.current = null;
                };
            }

            const checkPaymentStatus = async () => {
                try {
                    // Maintain scroll position before API call
                    maintainScrollPosition();

                    const updatedInvoice = await getInvoiceById(
                        selectedInvoiceData.id,
                        selectedInvoiceData.student_id
                    );

                    // Immediately restore position after API call
                    requestAnimationFrame(() => maintainScrollPosition());

                    if (
                        updatedInvoice &&
                        updatedInvoice.status === InvoiceStatusEnum.PAID
                    ) {
                        setCheckingPayment(false);
                        setPaymentStep('success');

                        // Release scroll lock
                        if (scrollCleanupRef.current) {
                            scrollCleanupRef.current();
                            scrollCleanupRef.current = null;
                        }

                        // Scroll to success message
                        setTimeout(() => {
                            if (paymentSectionRef.current) {
                                paymentSectionRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                });
                            }
                        }, 100);

                        // Auto-reset after 3 seconds
                        setTimeout(() => {
                            setPaymentStep('confirm');
                            setCreatedPayment(null);
                            setSelectedInvoice(null);
                            // Refresh invoices from server
                            if (selectedStudentId) {
                                getInvoicesByStudent(selectedStudentId);
                            }
                        }, 3000);
                    }
                } catch (error) {
                    console.error('❌ Error checking payment status:', error);
                    // Maintain position even on error
                    requestAnimationFrame(() => maintainScrollPosition());
                }
            };

            timeoutId = setTimeout(() => {
                checkPaymentStatus();
                intervalId = setInterval(checkPaymentStatus, 5000);
            }, 3000);
        } else {
            setCheckingPayment(false);
            // Clean up scroll lock when leaving QR step
            if (paymentStep !== 'qr' && scrollCleanupRef.current) {
                scrollCleanupRef.current();
                scrollCleanupRef.current = null;
            }
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
            // Clean up scroll lock on unmount
            if (scrollCleanupRef.current) {
                scrollCleanupRef.current();
                scrollCleanupRef.current = null;
            }
        };
    }, [
        paymentStep,
        selectedInvoice,
        getInvoiceById,
        createdPayment,
        selectedInvoiceData,
        selectedStudentId,
        getInvoicesByStudent,
        maintainScrollPosition,
    ]);

    // Fetch user info on component mount
    useEffect(() => {
        if (!user) {
            getInfoMe();
        }
    }, [user, getInfoMe]);

    // Get parent relations and students data on component mount
    useEffect(() => {
        if (user?.id) {
            // Find parent profile first
            const loadParentData = async () => {
                await getRelationsByParentId(user.id.toString());
                await getAllStudents();
            };
            loadParentData();
        }
    }, [user?.id, getRelationsByParentId, getAllStudents]);

    // Get invoices for the first student by default or selected student
    useEffect(() => {
        if (relations.length > 0 && !selectedStudentId) {
            const firstStudentId = relations[0]?.student_id;
            if (firstStudentId) {
                setSelectedStudentId(firstStudentId);
                getInvoicesByStudent(firstStudentId);
            }
        } else if (selectedStudentId) {
            getInvoicesByStudent(selectedStudentId);
            // Clear selections when switching students
            setSelectedInvoice(null);
        }
    }, [relations, selectedStudentId, getInvoicesByStudent]);

    // Helper functions
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + '₫';
    };

    const extractTransferContent = (qrUrl: string) => {
        try {
            const url = new URL(qrUrl);
            const desParam = url.searchParams.get('des');
            return desParam || 'Không có nội dung chuyển khoản';
        } catch {
            const match = qrUrl.match(/des=([^&]+)/);
            return match
                ? decodeURIComponent(match[1])
                : 'Không có nội dung chuyển khoản';
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Get paid invoices for display
    const paidInvoicesList = invoices.filter(
        (invoice) => invoice.status === InvoiceStatusEnum.PAID
    );

    // Handle radio button selection (only one bill at a time)
    const handleInvoiceSelection = (invoiceId: string) => {
        setSelectedInvoice(invoiceId);
        // Reset payment step when selecting different invoice
        if (paymentStep !== 'confirm') {
            setPaymentStep('confirm');
            setCreatedPayment(null);
        }
    };

    // Handle clear selection
    const handleClearSelection = () => {
        setSelectedInvoice(null);
        setPaymentStep('confirm');
        setCreatedPayment(null);
        // Reset scroll lock when canceling payment
        if (scrollCleanupRef.current) {
            scrollCleanupRef.current();
            scrollCleanupRef.current = null;
        }
    };

    // Handle confirm payment
    const handleConfirmPayment = async () => {
        const selectedInvoiceData = selectedInvoice
            ? unpaidInvoices.find((invoice) => invoice.id === selectedInvoice)
            : null;

        if (!selectedInvoiceData) return;

        try {
            setPaymentStep('qr');

            const paymentData: CreatePaymentCredentials = {
                invoice_id: selectedInvoiceData.id,
                payment_date: new Date(),
                amount:
                    selectedInvoiceData.final_amount ||
                    selectedInvoiceData.amount,
                reference_number: paymentReference,
                received_by: user?.id?.toString() || '',
                notes: `Payment for invoice ${selectedInvoiceData.invoice_number} - ${currentStudent?.full_name}`,
            };

            const newPayment = await createPayment(paymentData);
            if (newPayment) {
                setCreatedPayment(newPayment);
            } else {
                setPaymentStep('confirm');
                console.error('Failed to create payment: No payment returned');
            }
        } catch (error) {
            console.error('Failed to create payment record:', error);
            setPaymentStep('confirm');
        }
    };

    // Calculate totals for selected invoice
    const selectedTotal = selectedInvoiceData
        ? Number(selectedInvoiceData.final_amount || selectedInvoiceData.amount)
        : 0;

    // Calculate totals
    const totalDue = unpaidInvoices.reduce(
        (sum, invoice) => sum + Number(invoice.final_amount || invoice.amount),
        0
    );

    const loading = relationsLoading || invoicesLoading;

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Đang tải dữ liệu...</span>
                </div>
            </div>
        );
    }

    if (!currentStudent) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">
                        Không tìm thấy thông tin học sinh
                    </p>
                </div>
            </div>
        );
    }

    const monthlyFee = unpaidInvoices.length > 0 ? unpaidInvoices[0].amount : 0;
    const discountPercentage = currentStudent.discount_percentage || 0;
    const finalFee = monthlyFee * (1 - discountPercentage / 100);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <h1 className="text-2xl font-bold flex items-center">
                            <DollarSign className="w-6 h-6 mr-3" />
                            Thông tin học phí
                        </h1>
                        <div className="mt-1 opacity-90">
                            {relations.length > 1 && (
                                <select
                                    value={selectedStudentId || ''}
                                    onChange={(e) =>
                                        setSelectedStudentId(e.target.value)
                                    }
                                    className="bg-white/20 text-white rounded px-3 py-1 mr-4"
                                >
                                    {relations.map((relation) => {
                                        const student = students.find(
                                            (s) => s.id === relation.student_id
                                        );
                                        return (
                                            <option
                                                key={relation.id}
                                                value={relation.student_id}
                                                className="text-black"
                                            >
                                                {student?.full_name ||
                                                    'Không rõ tên'}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            <span>Học sinh: {currentStudent.full_name}</span>
                        </div>
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
                                        {monthlyFee.toLocaleString('vi-VN')}₫
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                        <Percent className="w-4 h-4 mr-1" />
                                        Giảm giá
                                    </div>
                                    <div className="text-xl font-bold text-red-600">
                                        {discountPercentage}% (-
                                        {(
                                            (monthlyFee * discountPercentage) /
                                            100
                                        ).toLocaleString('vi-VN')}
                                        ₫)
                                    </div>
                                    {currentStudent.discount_reason && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            {currentStudent.discount_reason}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                                    <div className="text-sm text-gray-600 mb-1">
                                        Học phí thực tế
                                    </div>
                                    <div className="text-xl font-bold text-green-600">
                                        {finalFee.toLocaleString('vi-VN')}₫
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Các tháng chưa đóng */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                    Các tháng chưa thanh toán
                                </h2>
                                <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {selectedInvoice
                                        ? 'Đã chọn: 1 hóa đơn'
                                        : 'Chưa chọn hóa đơn nào'}
                                </div>
                            </div>

                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">Lưu ý:</span>{' '}
                                    Bạn chỉ có thể chọn 1 hóa đơn để thanh toán
                                    mỗi lần.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Chọn
                                            </th>
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
                                        {unpaidInvoices.map((invoice) => (
                                            <tr
                                                key={invoice.id}
                                                className={
                                                    selectedInvoice ===
                                                    invoice.id
                                                        ? 'bg-blue-50 border-l-4 border-blue-400'
                                                        : ''
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="radio"
                                                        name="selectedInvoice"
                                                        checked={
                                                            selectedInvoice ===
                                                            invoice.id
                                                        }
                                                        onChange={() =>
                                                            handleInvoiceSelection(
                                                                invoice.id
                                                            )
                                                        }
                                                        className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    Tháng {invoice.month}/
                                                    {invoice.year}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {invoice.amount.toLocaleString(
                                                        'vi-VN'
                                                    )}
                                                    ₫
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                                    -{discountPercentage}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                    {(
                                                        invoice.final_amount ||
                                                        invoice.amount
                                                    ).toLocaleString('vi-VN')}
                                                    ₫
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            invoice.status ===
                                                            InvoiceStatusEnum.OVERDUE
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {invoice.status ===
                                                        InvoiceStatusEnum.OVERDUE
                                                            ? 'Quá hạn'
                                                            : 'Chưa thanh toán'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {unpaidInvoices.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="px-6 py-4 text-center text-gray-500"
                                                >
                                                    Không có hóa đơn chưa thanh
                                                    toán
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Các tháng đã thanh toán */}
                        {paidInvoicesList.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="text-green-600 mr-2">
                                        ✓
                                    </span>
                                    Các tháng đã thanh toán
                                </h2>

                                <div className="bg-green-50 rounded-lg overflow-hidden border border-green-200 shadow-sm">
                                    <table className="min-w-full divide-y divide-green-200">
                                        <thead className="bg-green-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Tháng
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Học phí gốc
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Giảm giá
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Thành tiền
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Trạng thái
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">
                                                    Ngày thanh toán
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-green-100">
                                            {paidInvoicesList.map((invoice) => (
                                                <tr
                                                    key={invoice.id}
                                                    className="bg-green-25"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        Tháng {invoice.month}/
                                                        {invoice.year}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {invoice.amount.toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-red-600">
                                                        -{discountPercentage}%
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                        {(
                                                            invoice.final_amount ||
                                                            invoice.amount
                                                        ).toLocaleString(
                                                            'vi-VN'
                                                        )}
                                                        ₫
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                                                            <span className="mr-1">
                                                                ✓
                                                            </span>
                                                            Đã thanh toán
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {new Date().toLocaleDateString(
                                                            'vi-VN'
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tổng kết */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-gray-700">
                                        {selectedInvoice ? (
                                            <>
                                                Số tiền cần thanh toán cho hóa
                                                đơn đã chọn:
                                            </>
                                        ) : (
                                            <>Tổng số tiền cần thanh toán:</>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {selectedInvoice ? (
                                            <>Hóa đơn đã chọn</>
                                        ) : (
                                            <>
                                                Bao gồm {unpaidInvoices.length}{' '}
                                                tháng chưa đóng
                                            </>
                                        )}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {selectedInvoice ? (
                                            <>
                                                {selectedTotal.toLocaleString(
                                                    'vi-VN'
                                                )}
                                                ₫
                                            </>
                                        ) : (
                                            <>
                                                {totalDue.toLocaleString(
                                                    'vi-VN'
                                                )}
                                                ₫
                                            </>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Đã giảm:{' '}
                                        {selectedInvoice &&
                                        selectedInvoiceData ? (
                                            <>
                                                {(
                                                    selectedInvoiceData.discount_amount ||
                                                    0
                                                ).toLocaleString('vi-VN')}
                                                ₫
                                            </>
                                        ) : (
                                            <>
                                                {unpaidInvoices
                                                    .reduce(
                                                        (sum, invoice) =>
                                                            sum +
                                                            Number(
                                                                invoice.discount_amount ||
                                                                    0
                                                            ),
                                                        0
                                                    )
                                                    .toLocaleString('vi-VN')}
                                                ₫
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                {selectedInvoice && (
                                    <Button
                                        onClick={handleClearSelection}
                                        variant="outline"
                                        className="flex items-center"
                                    >
                                        Bỏ chọn
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    className="flex items-center"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Xuất hoá đơn
                                </Button>
                                {selectedInvoice &&
                                    selectedInvoiceData &&
                                    paymentStep === 'confirm' && (
                                        <Button
                                            onClick={handleConfirmPayment}
                                            disabled={paymentLoading}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {paymentLoading && (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            )}
                                            Thanh toán hóa đơn
                                        </Button>
                                    )}
                                {!selectedInvoice && (
                                    <Button
                                        disabled
                                        variant="outline"
                                        className="flex items-center opacity-50 cursor-not-allowed"
                                    >
                                        Chọn hóa đơn để thanh toán
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Payment Section */}
                        {selectedInvoice &&
                            selectedInvoiceData &&
                            paymentStep !== 'confirm' && (
                                <div
                                    ref={paymentSectionRef}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6 mb-8"
                                    style={{ scrollMarginTop: '20px' }}
                                >
                                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                                        <h2 className="text-xl font-bold flex items-center">
                                            <QrCode className="w-6 h-6 mr-3" />
                                            {paymentStep === 'qr' &&
                                                'Quét mã QR để thanh toán'}
                                            {paymentStep === 'success' &&
                                                'Thanh toán thành công'}
                                        </h2>
                                        <div className="mt-1 opacity-90">
                                            Học sinh:{' '}
                                            {currentStudent?.full_name} - Tháng{' '}
                                            {selectedInvoiceData.month}/
                                            {selectedInvoiceData.year}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* QR Code Step */}
                                        {paymentStep === 'qr' && (
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-x-6">
                                                    <div className="text-center">
                                                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                                                            {createdPayment
                                                                ?.dataQR?.QR ? (
                                                                <img
                                                                    src={
                                                                        createdPayment
                                                                            .dataQR
                                                                            .QR
                                                                    }
                                                                    alt="QR Code"
                                                                    className="w-48 h-48 mx-auto"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.src =
                                                                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hIFFSPC90ZXh0Pjwvc3ZnPg==';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-48 h-48 flex items-center justify-center">
                                                                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {createdPayment?.dataQR
                                                        ?.bank && (
                                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex-1">
                                                            <h3 className="font-medium text-blue-900 mb-3">
                                                                Thông tin ngân
                                                                hàng nhận
                                                            </h3>
                                                            <div className="space-y-2 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-blue-700">
                                                                        Ngân
                                                                        hàng:
                                                                    </span>
                                                                    <span className="font-medium text-blue-900">
                                                                        {
                                                                            createdPayment
                                                                                .dataQR
                                                                                .bank
                                                                                .bank_full_name
                                                                        }{' '}
                                                                        (
                                                                        {
                                                                            createdPayment
                                                                                .dataQR
                                                                                .bank
                                                                                .bank_short_name
                                                                        }
                                                                        )
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-blue-700">
                                                                        Số tài
                                                                        khoản:
                                                                    </span>
                                                                    <span className="font-medium text-blue-900">
                                                                        {
                                                                            createdPayment
                                                                                .dataQR
                                                                                .bank
                                                                                .account_number
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-blue-700">
                                                                        Chủ tài
                                                                        khoản:
                                                                    </span>
                                                                    <span className="font-medium text-blue-900">
                                                                        {
                                                                            createdPayment
                                                                                .dataQR
                                                                                .bank
                                                                                .account_holder_name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-700">
                                                                Số tiền:
                                                            </label>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <input
                                                                    type="text"
                                                                    value={formatCurrency(
                                                                        selectedInvoiceData.final_amount ||
                                                                            selectedInvoiceData.amount
                                                                    )}
                                                                    readOnly
                                                                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded font-bold text-green-600"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        copyToClipboard(
                                                                            (
                                                                                selectedInvoiceData.final_amount ||
                                                                                selectedInvoiceData.amount
                                                                            ).toString()
                                                                        )
                                                                    }
                                                                    className="shrink-0"
                                                                >
                                                                    {copied ? (
                                                                        <CheckCircle className="w-4 h-4" />
                                                                    ) : (
                                                                        <Copy className="w-4 h-4" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {createdPayment?.dataQR
                                                            ?.QR && (
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-700">
                                                                    Nội dung
                                                                    chuyển
                                                                    khoản:
                                                                </label>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <input
                                                                        type="text"
                                                                        value={extractTransferContent(
                                                                            createdPayment
                                                                                .dataQR
                                                                                .QR
                                                                        )}
                                                                        readOnly
                                                                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            if (
                                                                                createdPayment
                                                                                    ?.dataQR
                                                                                    ?.QR
                                                                            ) {
                                                                                copyToClipboard(
                                                                                    extractTransferContent(
                                                                                        createdPayment
                                                                                            .dataQR
                                                                                            .QR
                                                                                    )
                                                                                );
                                                                            }
                                                                        }}
                                                                        className="shrink-0"
                                                                    >
                                                                        {copied ? (
                                                                            <CheckCircle className="w-4 h-4" />
                                                                        ) : (
                                                                            <Copy className="w-4 h-4" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                    <p className="text-sm text-yellow-800">
                                                        <span className="font-medium">
                                                            ⚠️ Lưu ý quan trọng:
                                                        </span>{' '}
                                                        Vui lòng nhập chính xác
                                                        số tiền và nội dung
                                                        chuyển khoản như hiển
                                                        thị ở trên để hệ thống
                                                        có thể xác nhận thanh
                                                        toán tự động.
                                                    </p>
                                                </div>

                                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                    <p className="text-sm text-blue-800">
                                                        <span className="font-medium">
                                                            Hướng dẫn:
                                                        </span>{' '}
                                                        Mở ứng dụng ngân hàng,
                                                        quét mã QR hoặc chuyển
                                                        khoản với thông tin
                                                        trên. Hệ thống sẽ tự
                                                        động phát hiện thanh
                                                        toán và cập nhật trạng
                                                        thái.
                                                    </p>
                                                </div>

                                                <div className="text-center mx-auto w-fit">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Loader className="animate-spin w-6 h-6 text-blue-600" />
                                                        <p className="text-sm text-gray-600">
                                                            {checkingPayment
                                                                ? 'Đang kiểm tra trạng thái thanh toán...'
                                                                : 'Đang khởi tạo kiểm tra thanh toán...'}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Vị trí trang đã được cố
                                                        định để theo dõi thanh
                                                        toán
                                                    </p>
                                                </div>

                                                <div className="flex justify-end">
                                                    <Button
                                                        onClick={
                                                            handleClearSelection
                                                        }
                                                        variant="outline"
                                                    >
                                                        Hủy thanh toán
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Success Step */}
                                        {paymentStep === 'success' && (
                                            <div className="text-center space-y-4">
                                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        Thanh toán thành công!
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Hóa đơn tháng{' '}
                                                        {
                                                            selectedInvoiceData.month
                                                        }
                                                        /
                                                        {
                                                            selectedInvoiceData.year
                                                        }{' '}
                                                        đã được thanh toán.
                                                    </p>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-lg">
                                                    <p className="text-sm text-green-800">
                                                        Trang sẽ tự động cập
                                                        nhật sau vài giây...
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
