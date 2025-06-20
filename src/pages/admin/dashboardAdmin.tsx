import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Home,
    Users,
    BookOpen,
    DollarSign,
    BarChart2,
    Calendar,
    PlusCircle,
    Bell,
    UserCheck,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
} from 'lucide-react';

const monthlyStudentStats = [
    {
        month: 'Tháng 1/2024',
        total: 180,
        newStudents: 20,
        leftStudents: 5,
        change: +15,
        status: 'increase',
    },
    {
        month: 'Tháng 2/2024',
        total: 195,
        newStudents: 18,
        leftStudents: 3,
        change: +15,
        status: 'increase',
    },
    {
        month: 'Tháng 3/2024',
        total: 210,
        newStudents: 25,
        leftStudents: 10,
        change: +15,
        status: 'increase',
    },
    {
        month: 'Tháng 4/2024',
        total: 205,
        newStudents: 10,
        leftStudents: 15,
        change: -5,
        status: 'decrease',
    },
    {
        month: 'Tháng 5/2024',
        total: 220,
        newStudents: 30,
        leftStudents: 15,
        change: +15,
        status: 'increase',
    },
    {
        month: 'Tháng 6/2024',
        total: 235,
        newStudents: 25,
        leftStudents: 10,
        change: +15,
        status: 'increase',
    },
];

export default function AdminDashboard() {
    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Thống kê nhanh */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số lớp
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                            12 lớp đang hoạt động
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Giáo viên
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            <Button
                                variant="link"
                                className="h-auto p-0 text-xs"
                            >
                                Xem danh sách
                            </Button>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Học sinh
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">
                            <Button
                                variant="link"
                                className="h-auto p-0 text-xs"
                            >
                                Thêm học sinh mới
                            </Button>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Doanh thu tháng
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18,500,000đ</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            <span>21.7% so với tháng trước</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Biểu đồ và thống kê học sinh */}
            <div className=" gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 w-full">
                    <CardHeader>
                        <CardTitle>Thống kê học sinh theo tháng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tháng</TableHead>
                                    <TableHead className="text-right">
                                        Tổng số
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Học sinh mới
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Học sinh nghỉ
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Thay đổi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {monthlyStudentStats.map((stat) => (
                                    <TableRow key={stat.month}>
                                        <TableCell>{stat.month}</TableCell>
                                        <TableCell className="text-right">
                                            {stat.total}
                                        </TableCell>
                                        <TableCell className="text-right text-green-600">
                                            +{stat.newStudents}
                                        </TableCell>
                                        <TableCell className="text-right text-red-600">
                                            -{stat.leftStudents}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end">
                                                {stat.status === 'increase' ? (
                                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                                )}
                                                <span
                                                    className={
                                                        stat.status ===
                                                        'increase'
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                    }
                                                >
                                                    {stat.change > 0 ? '+' : ''}
                                                    {stat.change}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Lớp học và sự kiện */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Lớp học gần đây</CardTitle>
                        <Button size="sm" className="ml-auto gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Thêm lớp mới
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Lớp</TableHead>
                                    <TableHead>Giáo viên</TableHead>
                                    <TableHead>Học sinh</TableHead>
                                    <TableHead className="text-right">
                                        Trạng thái
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Lớp 3.1 - 2024</TableCell>
                                    <TableCell>Nguyễn Thị A</TableCell>
                                    <TableCell>20</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="default">
                                            Đang hoạt động
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Lớp 5.2 - 2024</TableCell>
                                    <TableCell>Trần Văn B</TableCell>
                                    <TableCell>18</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="default">
                                            Đang hoạt động
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Lớp 4.3 - 2024</TableCell>
                                    <TableCell>Lê Thị C</TableCell>
                                    <TableCell>22</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="default">
                                            Đang hoạt động
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Lớp 6.1 - 2023</TableCell>
                                    <TableCell>Phạm Văn D</TableCell>
                                    <TableCell>15</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="secondary">
                                            Đã đóng
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Sự kiện sắp tới</CardTitle>
                        <Button size="sm" className="ml-auto gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Thêm sự kiện
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        Mở đăng ký lớp mới 2025
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        15/08/2024
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        Họp giáo viên tháng 8
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        20/08/2024
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        Kiểm tra chất lượng học kỳ
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        05/09/2024
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg border bg-indigo-50 p-4">
                            <h4 className="font-medium text-indigo-800 mb-2">
                                Quảng cáo lớp mới
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                                Chuẩn bị mở lớp mới cho năm học 2025. Thiết lập
                                thông tin quảng cáo để phụ huynh đăng ký sớm.
                            </p>
                            <Button className="w-full" variant="default">
                                Thiết lập quảng cáo
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
