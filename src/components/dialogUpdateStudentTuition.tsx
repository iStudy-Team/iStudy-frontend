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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, FileText, User, DollarSign } from 'lucide-react';
import { Student } from '@/api/student';
import { useStudentStore } from '@/store/useStudentStore';
import { toast } from 'sonner';

interface DialogUpdateStudentTuitionProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

export const DialogUpdateStudentTuition = ({
    isOpen,
    onClose,
    student,
}: DialogUpdateStudentTuitionProps) => {
    const { updateStudent, loading } = useStudentStore();
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [discountReason, setDiscountReason] = useState<string>('');

    // Initialize form data when student changes
    useEffect(() => {
        if (student) {
            setDiscountPercentage(student.discount_percentage || 0);
            setDiscountReason(student.discount_reason || '');
        }
    }, [student]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!student) return;

        // Validate discount percentage
        if (discountPercentage < 0 || discountPercentage > 100) {
            toast.error('Tỷ lệ giảm giá phải từ 0% đến 100%');
            return;
        }

        // If discount percentage > 0, reason is required
        if (discountPercentage > 0 && !discountReason.trim()) {
            toast.error('Vui lòng nhập lý do giảm giá');
            return;
        }

        try {
            const result = await updateStudent(student.id, {
                discount_percentage: discountPercentage,
                discount_reason: discountReason.trim(),
            });

            if (result) {
                toast.success('Cập nhật học phí thành công');
                onClose();
            }
        } catch (error) {
            console.error('Failed to update student tuition:', error);
            toast.error('Không thể cập nhật học phí');
        }
    };

    const handleClose = () => {
        if (student) {
            setDiscountPercentage(student.discount_percentage || 0);
            setDiscountReason(student.discount_reason || '');
        }
        onClose();
    };

    if (!student) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        Cập nhật học phí - {student.full_name}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="w-5 h-5" />
                                Thông tin học sinh
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">
                                        Họ và tên
                                    </Label>
                                    <p className="text-gray-900 font-medium">
                                        {student.full_name}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">
                                        Mã học sinh
                                    </Label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {student.id}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tuition Discount Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Percent className="w-5 h-5" />
                                Thông tin giảm giá học phí
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Discount Percentage */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="discountPercentage"
                                    className="text-sm font-medium"
                                >
                                    Tỷ lệ giảm giá (%)
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="discountPercentage"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={discountPercentage}
                                        onChange={(e) =>
                                            setDiscountPercentage(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="pr-8"
                                        placeholder="Nhập tỷ lệ giảm giá"
                                    />
                                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Nhập từ 0% đến 100%. Ví dụ: 10 = 10%
                                </p>
                            </div>

                            {/* Discount Reason */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="discountReason"
                                    className="text-sm font-medium"
                                >
                                    Lý do giảm giá
                                    {discountPercentage > 0 && (
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    )}
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        id="discountReason"
                                        value={discountReason}
                                        onChange={(e) =>
                                            setDiscountReason(e.target.value)
                                        }
                                        placeholder="Nhập lý do giảm giá học phí..."
                                        className="min-h-[100px] resize-none"
                                        maxLength={500}
                                    />
                                    <FileText className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500">
                                        {discountPercentage > 0
                                            ? 'Lý do giảm giá là bắt buộc khi có giảm giá'
                                            : 'Tùy chọn nếu không có giảm giá'}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {discountReason.length}/500
                                    </span>
                                </div>
                            </div>

                            {/* Preview */}
                            {discountPercentage > 0 && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-800">
                                            Xem trước giảm giá
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-700">
                                        Học sinh sẽ được giảm{' '}
                                        <strong>{discountPercentage}%</strong>{' '}
                                        học phí
                                        {discountReason && (
                                            <span>
                                                {' '}
                                                với lý do: "{discountReason}"
                                            </span>
                                        )}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

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
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? 'Đang cập nhật...' : 'Cập nhật học phí'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
