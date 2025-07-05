export type CreateMultipleInvoiceCredentials = Pick<
    Invoice,
    | 'class_id'
    | 'invoice_number'
    | 'month'
    | 'year'
    | 'amount'
    | 'discount_amount'
    | 'final_amount'
    | 'issue_date'
    | 'due_date'
    | 'status'
    | 'description'
>;
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState, useEffect } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import { useClassStore } from '@/store/useClassStore';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { Invoice, InvoiceStatusEnum } from '@/api/invoice';

interface DialogInvoiceProps {
    children: ReactNode;
    editData?: Invoice | null;
    onSuccess?: () => void;
}

export function DialogInvoice({
    children,
    editData,
    onSuccess,
}: DialogInvoiceProps) {
    const { students, getAllStudents } = useStudentStore();
    const { classes, getAllClasses } = useClassStore();
    const { createInvoice, updateInvoice, loading, createMultipleInvoices } =
        useInvoiceStore();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        class_id: '',
        invoice_number: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 0,
        discount_amount: 0,
        final_amount: 0,
        issue_date: '',
        due_date: '',
        status: InvoiceStatusEnum.UNPAID,
        description: '',
    });

    // Fetch classes when component mounts
    useEffect(() => {
        getAllClasses();
    }, [getAllClasses]);

    // Set form data when editData changes
    useEffect(() => {
        if (editData) {
            setFormData({
                class_id: editData.class_id,
                invoice_number: editData.invoice_number,
                month: editData.month,
                year: editData.year,
                amount: editData.amount,
                discount_amount: editData.discount_amount || 0,
                final_amount: editData.final_amount || editData.amount,
                issue_date: editData.issue_date
                    ? new Date(editData.issue_date).toISOString().split('T')[0]
                    : '',
                due_date: editData.due_date
                    ? new Date(editData.due_date).toISOString().split('T')[0]
                    : '',
                status: editData.status,
                description: editData.description || '',
            });
        } else {
            setFormData({
                class_id: '',
                invoice_number: '',
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                amount: 0,
                discount_amount: 0,
                final_amount: 0,
                issue_date: '',
                due_date: '',
                status: InvoiceStatusEnum.UNPAID,
                description: '',
            });
        }
    }, [editData]);

    // Calculate final amount when amount or discount changes
    useEffect(() => {
        const finalAmount = formData.amount - formData.discount_amount;
        setFormData((prev) => ({
            ...prev,
            final_amount: Math.max(0, finalAmount),
        }));
    }, [formData.amount, formData.discount_amount]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const invoiceData: CreateMultipleInvoiceCredentials = {
            ...formData,
            issue_date: formData.issue_date
                ? new Date(formData.issue_date)
                : undefined,
            due_date: formData.due_date
                ? new Date(formData.due_date)
                : undefined,
        };

        try {
            if (editData) {
                // Update existing invoice (still works with single invoice)
                await updateInvoice(editData.id, invoiceData);
            } else {
                // Create invoices for all students in the selected class
                await createMultipleInvoices(invoiceData);
            }

            // Close dialog and trigger success callback
            setOpen(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error saving invoice:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {editData
                            ? 'Chỉnh Sửa Hóa Đơn'
                            : 'Tạo Hóa Đơn Cho Lớp Học'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl px-1 w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-auto mb-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lớp học *
                                </label>
                                <select
                                    required
                                    value={formData.class_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            class_id: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                >
                                    <option value="">Chọn lớp học</option>
                                    {(classes || []).map((classItem) => (
                                        <option
                                            key={classItem.id}
                                            value={classItem.id}
                                        >
                                            {classItem.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số hóa đơn *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.invoice_number}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            invoice_number: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="Nhập số hóa đơn"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tháng *
                                    </label>
                                    <select
                                        required
                                        value={formData.month}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                month: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                Tháng {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Năm *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.year}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                year: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số tiền gốc *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                amount:
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giảm giá
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.discount_amount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                discount_amount:
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Thành tiền
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.final_amount}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày phát hành
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.issue_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                issue_date: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hạn thanh toán
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.due_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                due_date: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: Number(
                                                e.target.value
                                            ) as InvoiceStatusEnum,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                >
                                    <option value={InvoiceStatusEnum.UNPAID}>
                                        Chưa thanh toán
                                    </option>
                                    <option value={InvoiceStatusEnum.PAID}>
                                        Đã thanh toán
                                    </option>
                                    <option value={InvoiceStatusEnum.OVERDUE}>
                                        Quá hạn
                                    </option>
                                    <option value={InvoiceStatusEnum.CANCELLED}>
                                        Đã hủy
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ghi chú
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="Nhập ghi chú..."
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#00c2ad] cursor-pointer"
                            disabled={loading}
                        >
                            {editData ? 'Cập Nhật' : 'Tạo Hóa Đơn Cho Cả Lớp'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
