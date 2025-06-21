import {
    BookOpen,
    User,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    DollarSign,
    CreditCard,
    FileText,
    Download,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';

const ParentDashboard = () => {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        monthlyFee: 0,
        unpaidMonths: 0,
        totalDue: 0,
        unpaidSessions: [],
    });

    // Lấy dữ liệu con cái và thông tin thanh toán

    // Lấy thông tin chi tiết khi chọn học sinh
    useEffect(() => {
        if (!selectedChild) return;

        const fetchChildDetails = async () => {
            // Thông tin điểm danh
            const attendanceResponse = await fetch(
                `/api/students/${selectedChild}/attendance`
            );
            const attendanceData = await attendanceResponse.json();

            // Thông tin thanh toán
            const paymentResponse = await fetch(
                `/api/students/${selectedChild}/payments`
            );
            const paymentData = await paymentResponse.json();

            setPaymentDetails({
                monthlyFee: paymentData.monthlyFee,
                unpaidMonths: paymentData.unpaidMonths.length,
                totalDue:
                    paymentData.monthlyFee * paymentData.unpaidMonths.length,
                unpaidSessions: paymentData.unpaidMonths,
            });
        };

        fetchChildDetails();
    }, [selectedChild]);

    if (children.length === 0) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Không tìm thấy thông tin học sinh</CardTitle>
                        <CardDescription>
                            Hiện không có học sinh nào được đăng ký dưới tài
                            khoản của bạn.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <Card className="overflow-hidden">
                    {/* Header */}
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                        <CardTitle className="text-3xl flex items-center">
                            <User className="inline mr-3" />
                            Phụ huynh: {session?.user?.name}
                        </CardTitle>
                    </CardHeader>

                    <div className="p-8">
                        {/* Chọn học sinh */}
                        <div className="mb-8">
                            <Label className="block mb-2">Chọn học sinh:</Label>
                            <Select
                                value={selectedChild}
                                onValueChange={setSelectedChild}
                            >
                                <SelectTrigger className="w-full md:w-1/3">
                                    <SelectValue placeholder="Chọn học sinh" />
                                </SelectTrigger>
                                <SelectContent>
                                    {children.map((child) => (
                                        <SelectItem
                                            key={child.id}
                                            value={child.id}
                                        >
                                            {child.name} - {child.className}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Thông tin lớp học và điểm danh */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center space-y-0">
                                    <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                                    <CardTitle>Thông tin lớp học</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p>
                                            <span className="font-medium">
                                                Lớp:
                                            </span>{' '}
                                            {selectedChild?.className}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Môn học:
                                            </span>{' '}
                                            {selectedChild?.subject}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Giáo viên:
                                            </span>{' '}
                                            {selectedChild?.teacher}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                Học phí/tháng:
                                            </span>
                                            {paymentDetails.monthlyFee.toLocaleString(
                                                'vi-VN'
                                            )}
                                            ₫
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center space-y-0">
                                    <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                                    <CardTitle>Thống kê điểm danh</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">
                                                {selectedChild?.attendance
                                                    ?.present || 0}
                                            </div>
                                            <div className="text-sm text-gray-600 flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 mr-1" />{' '}
                                                Có mặt
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">
                                                {selectedChild?.attendance
                                                    ?.absent || 0}
                                            </div>
                                            <div className="text-sm text-gray-600 flex items-center justify-center">
                                                <XCircle className="w-4 h-4 mr-1" />{' '}
                                                Vắng mặt
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-600">
                                                {selectedChild?.attendance
                                                    ?.late || 0}
                                            </div>
                                            <div className="text-sm text-gray-600 flex items-center justify-center">
                                                <Clock className="w-4 h-4 mr-1" />{' '}
                                                Đi muộn
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Thông tin thanh toán */}
                        <div className="mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center space-y-0">
                                    <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                                    <CardTitle>Thông tin thanh toán</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <Card className="bg-yellow-50 border-yellow-200">
                                            <CardHeader className="p-4">
                                                <CardDescription>
                                                    Tháng chưa đóng
                                                </CardDescription>
                                                <CardTitle className="text-2xl">
                                                    {
                                                        paymentDetails.unpaidMonths
                                                    }
                                                </CardTitle>
                                            </CardHeader>
                                        </Card>

                                        <Card className="bg-red-50 border-red-200">
                                            <CardHeader className="p-4">
                                                <CardDescription>
                                                    Tổng nợ
                                                </CardDescription>
                                                <CardTitle className="text-2xl">
                                                    {paymentDetails.totalDue.toLocaleString(
                                                        'vi-VN'
                                                    )}
                                                    ₫
                                                </CardTitle>
                                            </CardHeader>
                                        </Card>

                                        <Button className="h-full">
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Thanh toán ngay
                                        </Button>
                                    </div>

                                    {/* Danh sách tháng chưa đóng */}
                                    {paymentDetails.unpaidSessions.length >
                                        0 && (
                                        <div className="mt-6">
                                            <h3 className="font-medium text-gray-700 mb-3">
                                                Chi tiết các tháng chưa đóng:
                                            </h3>
                                            <div className="space-y-2">
                                                {paymentDetails.unpaidSessions.map(
                                                    (month, index) => (
                                                        <Card
                                                            key={index}
                                                            className="bg-gray-50"
                                                        >
                                                            <CardContent className="p-3 flex justify-between items-center">
                                                                <span>
                                                                    Tháng{' '}
                                                                    {
                                                                        month.month
                                                                    }
                                                                    /
                                                                    {month.year}
                                                                </span>
                                                                <span className="font-medium">
                                                                    {paymentDetails.monthlyFee.toLocaleString(
                                                                        'vi-VN'
                                                                    )}
                                                                    ₫
                                                                </span>
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Lịch sử điểm danh chi tiết */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <FileText className="w-6 h-6 text-indigo-600 mr-3" />
                                    <CardTitle>
                                        Lịch sử điểm danh chi tiết
                                    </CardTitle>
                                </div>
                                <Button variant="outline">
                                    <Download className="w-4 h-4 mr-1" />
                                    Xuất file
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ngày</TableHead>
                                            <TableHead>Trạng thái</TableHead>
                                            <TableHead>Giáo viên</TableHead>
                                            <TableHead>Ghi chú</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedChild?.attendanceDetails?.map(
                                            (record, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {new Date(
                                                            record.date
                                                        ).toLocaleDateString(
                                                            'vi-VN'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                record.status ===
                                                                'present'
                                                                    ? 'default'
                                                                    : record.status ===
                                                                        'absent'
                                                                      ? 'destructive'
                                                                      : 'secondary'
                                                            }
                                                        >
                                                            {record.status ===
                                                            'present'
                                                                ? 'Có mặt'
                                                                : record.status ===
                                                                    'absent'
                                                                  ? 'Vắng mặt'
                                                                  : 'Đi muộn'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {record.teacher}
                                                    </TableCell>
                                                    <TableCell>
                                                        {record.note ||
                                                            'Không có ghi chú'}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ParentDashboard;
