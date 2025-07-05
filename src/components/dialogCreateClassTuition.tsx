import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, FileText, AlertCircle } from 'lucide-react';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useClassStore } from '@/store/useClassStore';
import { InvoiceStatusEnum } from '@/api/invoice';
import { toast } from 'sonner';

interface DialogCreateClassTuitionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const DialogCreateClassTuition = ({
    isOpen,
    onClose,
    onSuccess,
}: DialogCreateClassTuitionProps) => {
    const { createMultipleInvoices, loading } = useInvoiceStore();
    const { classes, getAllClasses } = useClassStore();

    // Form state
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [issueDate, setIssueDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [dueDate, setDueDate] = useState<string>(
        (() => {
            const date = new Date();
            date.setDate(date.getDate() + 30); // Default 30 days from now
            return date.toISOString().split('T')[0];
        })()
    );
    const [status, setStatus] = useState<InvoiceStatusEnum>(
        InvoiceStatusEnum.UNPAID
    );
    const [description, setDescription] = useState<string>('');

    // Load classes when dialog opens
    useEffect(() => {
        if (isOpen) {
            getAllClasses();
        }
    }, [isOpen, getAllClasses]);

    // Generate invoice number based on class and month/year
    const generateInvoiceNumber = () => {
        const selectedClass = classes.find((c) => c.id === selectedClassId);
        if (selectedClass) {
            const classCode = selectedClass.name.substring(0, 3).toUpperCase();
            const monthYear = `${String(month).padStart(2, '0')}${year}`;
            return `${classCode}-${monthYear}`;
        }
        return `INV-${String(month).padStart(2, '0')}${year}`;
    };

    // Get selected class info
    const selectedClass = classes.find((c) => c.id === selectedClassId);
    const studentCount = selectedClass?.class_enrollments?.length || 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!selectedClassId) {
            toast.error('Vui lòng chọn lớp học');
            return;
        }

        if (amount <= 0) {
            toast.error('Số tiền phải lớn hơn 0');
            return;
        }

        if (discountAmount < 0) {
            toast.error('Số tiền giảm giá không thể âm');
            return;
        }

        if (discountAmount > amount) {
            toast.error('Số tiền giảm giá không thể lớn hơn số tiền học phí');
            return;
        }

        if (month < 1 || month > 12) {
            toast.error('Tháng phải từ 1 đến 12');
            return;
        }

        if (year < 2020 || year > 2030) {
            toast.error('Năm phải từ 2020 đến 2030');
            return;
        }

        const issueDateObj = new Date(issueDate);
        const dueDateObj = new Date(dueDate);

        if (dueDateObj <= issueDateObj) {
            toast.error('Ngày đến hạn phải sau ngày phát hành');
            return;
        }

        try {
            const result = await createMultipleInvoices({
                class_id: selectedClassId,
                invoice_number: generateInvoiceNumber(),
                month,
                year,
                amount,
                discount_amount: discountAmount, // Use discount amount from state
                issue_date: issueDateObj,
                due_date: dueDateObj,
                status,
                description:
                    description.trim() ||
                    `Học phí tháng ${month}/${year} - ${selectedClass?.name}`,
            });

            if (result) {
                toast.success(
                    `Đã tạo thành công ${result.length} hóa đơn cho lớp ${selectedClass?.name}`
                );
                handleClose();
                onSuccess?.();
            }
        } catch (error) {
            console.error('Failed to create class tuition:', error);
            toast.error('Không thể tạo học phí cho lớp');
        }
    };

    const handleClose = () => {
        // Reset form
        setSelectedClassId('');
        setAmount(0);
        setDiscountAmount(0);
        setMonth(new Date().getMonth() + 1);
        setYear(new Date().getFullYear());
        setIssueDate(new Date().toISOString().split('T')[0]);
        const defaultDueDate = new Date();
        defaultDueDate.setDate(defaultDueDate.getDate() + 30);
        setDueDate(defaultDueDate.toISOString().split('T')[0]);
        setStatus(InvoiceStatusEnum.UNPAID);
        setDescription('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        Tạo học phí cho cả lớp
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Class Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="w-5 h-5" />
                                Thông tin lớp học
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="classId"
                                    className="text-sm font-medium"
                                >
                                    Chọn lớp học{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={selectedClassId}
                                    onValueChange={setSelectedClassId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn lớp học để tạo học phí" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((classItem) => (
                                            <SelectItem
                                                key={classItem.id}
                                                value={classItem.id}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {classItem.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {classItem
                                                            .class_enrollments
                                                            ?.length || 0}{' '}
                                                        học sinh
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedClass && (
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-800">
                                            Thông tin lớp được chọn
                                        </span>
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        <p>
                                            <strong>Tên lớp:</strong>{' '}
                                            {selectedClass.name}
                                        </p>
                                        <p>
                                            <strong>Số học sinh:</strong>{' '}
                                            {studentCount}
                                        </p>
                                        <p>
                                            <strong>
                                                Tổng số hóa đơn sẽ tạo:
                                            </strong>{' '}
                                            {studentCount}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Invoice Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="w-5 h-5" />
                                Thông tin học phí
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="month"
                                        className="text-sm font-medium"
                                    >
                                        Tháng{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={month.toString()}
                                        onValueChange={(value) =>
                                            setMonth(Number(value))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) => i + 1
                                            ).map((m) => (
                                                <SelectItem
                                                    key={m}
                                                    value={m.toString()}
                                                >
                                                    Tháng {m}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="year"
                                        className="text-sm font-medium"
                                    >
                                        Năm{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        min="2020"
                                        max="2030"
                                        value={year}
                                        onChange={(e) =>
                                            setYear(Number(e.target.value))
                                        }
                                        placeholder="2024"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="amount"
                                    className="text-sm font-medium"
                                >
                                    Số tiền học phí (VNĐ){' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(Number(e.target.value))
                                    }
                                    placeholder="Nhập số tiền học phí"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="discountAmount"
                                    className="text-sm font-medium"
                                >
                                    Số tiền giảm giá (VNĐ)
                                </Label>
                                <Input
                                    id="discountAmount"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={discountAmount}
                                    onChange={(e) =>
                                        setDiscountAmount(
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Nhập số tiền giảm giá"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="issueDate"
                                        className="text-sm font-medium"
                                    >
                                        Ngày phát hành{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="issueDate"
                                        type="date"
                                        value={issueDate}
                                        onChange={(e) =>
                                            setIssueDate(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="dueDate"
                                        className="text-sm font-medium"
                                    >
                                        Ngày đến hạn{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="dueDate"
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) =>
                                            setDueDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="status"
                                    className="text-sm font-medium"
                                >
                                    Trạng thái
                                </Label>
                                <Select
                                    value={status.toString()}
                                    onValueChange={(value) =>
                                        setStatus(
                                            Number(value) as InvoiceStatusEnum
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value={InvoiceStatusEnum.UNPAID.toString()}
                                        >
                                            Chưa thanh toán
                                        </SelectItem>
                                        <SelectItem
                                            value={InvoiceStatusEnum.PAID.toString()}
                                        >
                                            Đã thanh toán
                                        </SelectItem>
                                        <SelectItem
                                            value={InvoiceStatusEnum.OVERDUE.toString()}
                                        >
                                            Quá hạn
                                        </SelectItem>
                                        <SelectItem
                                            value={InvoiceStatusEnum.CANCELLED.toString()}
                                        >
                                            Đã hủy
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-sm font-medium"
                                >
                                    Mô tả (tùy chọn)
                                </Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Nhập mô tả cho hóa đơn học phí..."
                                    className="min-h-[80px]"
                                    maxLength={500}
                                />
                                <span className="text-xs text-gray-400">
                                    {description.length}/500
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    {selectedClassId && amount > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlertCircle className="w-5 h-5" />
                                    Xem trước
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="text-sm text-yellow-800">
                                        <p>
                                            <strong>Mã hóa đơn:</strong>{' '}
                                            {generateInvoiceNumber()}
                                        </p>
                                        <p>
                                            <strong>Lớp:</strong>{' '}
                                            {selectedClass?.name}
                                        </p>
                                        <p>
                                            <strong>Thời gian:</strong> Tháng{' '}
                                            {month}/{year}
                                        </p>
                                        <p>
                                            <strong>Số tiền:</strong>{' '}
                                            {amount.toLocaleString('vi-VN')}₫
                                        </p>
                                        {discountAmount > 0 && (
                                            <p>
                                                <strong>Giảm giá:</strong>{' '}
                                                {discountAmount.toLocaleString(
                                                    'vi-VN'
                                                )}
                                                ₫
                                            </p>
                                        )}
                                        <p>
                                            <strong>Số tiền thực:</strong>{' '}
                                            {(
                                                amount - discountAmount
                                            ).toLocaleString('vi-VN')}
                                            ₫
                                        </p>
                                        <p>
                                            <strong>Số hóa đơn tạo:</strong>{' '}
                                            {studentCount}
                                        </p>
                                        <p>
                                            <strong>Tổng giá trị:</strong>{' '}
                                            {(
                                                (amount - discountAmount) *
                                                studentCount
                                            ).toLocaleString('vi-VN')}
                                            ₫
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <DialogFooter className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                !selectedClassId ||
                                amount <= 0 ||
                                discountAmount < 0 ||
                                discountAmount > amount
                            }
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {loading
                                ? 'Đang tạo...'
                                : `Tạo ${studentCount} hóa đơn`}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
