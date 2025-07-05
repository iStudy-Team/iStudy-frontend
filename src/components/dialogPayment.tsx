import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { QrCode, Copy, CheckCircle, Loader2, Loader } from 'lucide-react';
import { usePaymentStore } from '@/store/usePaymentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { Invoice, InvoiceStatusEnum } from '@/api/invoice';
import { CreatePaymentCredentials, Payment } from '@/api/payment';

interface DialogPaymentProps {
    children: ReactNode;
    invoice: Invoice;
    studentName: string;
    onPaymentSuccess?: () => void;
}

export function DialogPayment({
    children,
    invoice,
    studentName,
    onPaymentSuccess,
}: DialogPaymentProps) {
    const { createPayment, loading } = usePaymentStore();
    const { getInvoiceById } = useInvoiceStore();
    const { user } = useAuthStore();

    // Tạo key ổn định cho dialog
    const dialogKey = useMemo(() => `dialog-${invoice.id}`, [invoice.id]);

    // Sử dụng useRef để theo dõi trạng thái dialog
    const dialogStateRef = useRef({
        isInitialized: false,
        shouldStayOpen: false,
    });

    const [open, setOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState<
        'confirm' | 'qr' | 'success'
    >('confirm');
    const [createdPayment, setCreatedPayment] = useState<Payment | null>(null);
    const [paymentReference, setPaymentReference] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [checkingPayment, setCheckingPayment] = useState(false);

    // Generate payment reference when dialog opens
    useEffect(() => {
        if (open && paymentStep === 'confirm') {
            const reference = `PAY-${Date.now()}-${invoice.id.slice(-6)}`;
            setPaymentReference(reference);
        }
    }, [open, paymentStep, invoice.id]);

    // Check payment status - Tối ưu hóa để tránh re-render
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        if (
            paymentStep === 'qr' &&
            invoice.id &&
            invoice.student_id &&
            createdPayment
        ) {
            setCheckingPayment(true);
            dialogStateRef.current.shouldStayOpen = true;

            const checkPaymentStatus = async () => {
                try {
                    const updatedInvoice = await getInvoiceById(
                        invoice.id,
                        invoice.student_id
                    );

                    if (
                        updatedInvoice &&
                        updatedInvoice.status === InvoiceStatusEnum.PAID
                    ) {
                        dialogStateRef.current.shouldStayOpen = false;
                        setCheckingPayment(false);
                        setPaymentStep('success');

                        // Auto-close dialog after 3 seconds
                        setTimeout(() => {
                            setOpen(false);
                            setPaymentStep('confirm');
                            setCreatedPayment(null);
                            onPaymentSuccess?.();
                        }, 3000);
                    }
                } catch (error) {
                    console.error('❌ Error checking payment status:', error);
                }
            };

            timeoutId = setTimeout(() => {
                checkPaymentStatus();
                intervalId = setInterval(checkPaymentStatus, 5000);
            }, 3000);
        } else {
            setCheckingPayment(false);
            dialogStateRef.current.shouldStayOpen = false;
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [
        paymentStep,
        invoice.id,
        invoice.student_id,
        getInvoiceById,
        onPaymentSuccess,
        createdPayment,
    ]);

    const handleOpenChange = (isOpen: boolean) => {
        // Ngăn dialog đóng khi đang kiểm tra thanh toán
        if (!isOpen && dialogStateRef.current.shouldStayOpen) {
            return;
        }

        setOpen(isOpen);

        if (!isOpen) {
            // Reset state when dialog closes
            setPaymentStep('confirm');
            setCreatedPayment(null);
            setCheckingPayment(false);
            setCopied(false);
            dialogStateRef.current.shouldStayOpen = false;
        }
    };

    const handleConfirmPayment = async () => {
        try {
            setPaymentStep('qr');

            const paymentData: CreatePaymentCredentials = {
                invoice_id: invoice.id,
                payment_date: new Date(),
                amount: invoice.final_amount || invoice.amount,
                reference_number: paymentReference,
                received_by: user?.id?.toString() || '',
                notes: `Payment for invoice ${invoice.invoice_number} - ${studentName}`,
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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

    return (
        <Dialog key={dialogKey} open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="max-w-6xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 p-4 pr-2"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        {paymentStep === 'confirm' && 'Xác nhận thanh toán'}
                        {paymentStep === 'qr' && 'Quét mã QR để thanh toán'}
                        {paymentStep === 'success' && 'Thanh toán thành công'}
                    </DialogTitle>
                </DialogHeader>

                {/* Confirmation Step */}
                {paymentStep === 'confirm' && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="font-medium text-blue-900 mb-2">
                                Thông tin thanh toán
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-blue-700">
                                        Học sinh:
                                    </span>
                                    <span className="font-medium text-blue-900">
                                        {studentName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-700">
                                        Tháng:
                                    </span>
                                    <span className="font-medium text-blue-900">
                                        {invoice.month}/{invoice.year}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-700">
                                        Số hóa đơn:
                                    </span>
                                    <span className="font-medium text-blue-900">
                                        {invoice.invoice_number}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-700">
                                        Học phí gốc:
                                    </span>
                                    <span className="font-medium text-blue-900">
                                        {formatCurrency(invoice.amount)}
                                    </span>
                                </div>
                                {invoice.discount_amount && (
                                    <div className="flex justify-between">
                                        <span className="text-blue-700">
                                            Giảm giá:
                                        </span>
                                        <span className="font-medium text-red-600">
                                            -
                                            {formatCurrency(
                                                invoice.discount_amount
                                            )}
                                        </span>
                                    </div>
                                )}
                                <hr className="border-blue-200" />
                                <div className="flex justify-between text-base">
                                    <span className="text-blue-700 font-medium">
                                        Tổng thanh toán:
                                    </span>
                                    <span className="font-bold text-blue-900 text-lg">
                                        {formatCurrency(
                                            invoice.final_amount ||
                                                invoice.amount
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                                <span className="font-medium">Lưu ý:</span> Sau
                                khi xác nhận, bạn sẽ được chuyển đến trang thanh
                                toán qua QR code.
                            </p>
                        </div>
                    </div>
                )}

                {/* QR Code Step */}
                {paymentStep === 'qr' && (
                    <div className="space-y-4">
                        <div className="flex items-start gap-x-3">
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                                    {createdPayment?.dataQR?.QR ? (
                                        <img
                                            src={createdPayment.dataQR.QR}
                                            alt="QR Code"
                                            className="w-48 h-48 mx-auto"
                                            onError={(e) => {
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

                            {createdPayment?.dataQR?.bank && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h3 className="font-medium text-blue-900 mb-2">
                                        Thông tin ngân hàng nhận
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">
                                                Ngân hàng:
                                            </span>
                                            <span className="font-medium text-blue-900">
                                                {
                                                    createdPayment.dataQR.bank
                                                        .bank_full_name
                                                }{' '}
                                                (
                                                {
                                                    createdPayment.dataQR.bank
                                                        .bank_short_name
                                                }
                                                )
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">
                                                Số tài khoản:
                                            </span>
                                            <span className="font-medium text-blue-900">
                                                {
                                                    createdPayment.dataQR.bank
                                                        .account_number
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-700">
                                                Chủ tài khoản:
                                            </span>
                                            <span className="font-medium text-blue-900">
                                                {
                                                    createdPayment.dataQR.bank
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
                                                invoice.final_amount ||
                                                    invoice.amount
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
                                                        invoice.final_amount ||
                                                        invoice.amount
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

                                {createdPayment?.dataQR?.QR && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Nội dung chuyển khoản:
                                        </label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <input
                                                type="text"
                                                value={extractTransferContent(
                                                    createdPayment.dataQR.QR
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
                                                        createdPayment?.dataQR
                                                            ?.QR
                                                    ) {
                                                        copyToClipboard(
                                                            extractTransferContent(
                                                                createdPayment
                                                                    .dataQR.QR
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
                                Vui lòng nhập chính xác số tiền và nội dung
                                chuyển khoản như hiển thị ở trên để hệ thống có
                                thể xác nhận thanh toán tự động.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">Hướng dẫn:</span>{' '}
                                Mở ứng dụng ngân hàng, quét mã QR hoặc chuyển
                                khoản với thông tin trên. Hệ thống sẽ tự động
                                phát hiện thanh toán và cập nhật trạng thái.
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
                                Hóa đơn tháng {invoice.month}/{invoice.year} đã
                                được thanh toán.
                            </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800">
                                Cửa sổ này sẽ tự động đóng sau vài giây...
                            </p>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {paymentStep === 'confirm' && (
                        <>
                            <DialogClose asChild>
                                <Button variant="outline">Hủy</Button>
                            </DialogClose>
                            <Button
                                onClick={handleConfirmPayment}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {loading && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Xác nhận thanh toán
                            </Button>
                        </>
                    )}

                    {paymentStep === 'qr' && (
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
