import { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    Users,
    BookOpen,
    DollarSign,
    Calendar,
    PlusCircle,
    UserCheck,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
} from 'lucide-react';
import { useStudentStatisticStore } from '@/store/useStudentStatisticStore';
import { useStudentStore } from '@/store/useStudentStore';

export default function AdminDashboard() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const {
        statistics,
        loading: statisticsLoading,
        getAllStatistics,
        createStatistic,
    } = useStudentStatisticStore();

    const {
        students,
        loading: studentsLoading,
        getAllStudents,
    } = useStudentStore();

    console.log('AdminDashboard rendered with statistics:', statistics);
    console.log('AdminDashboard rendered with students:', students);

    useEffect(() => {
        // Fetch statistics for the selected year
        getAllStatistics({
            startYear: selectedYear,
            endYear: selectedYear,
        });

        // Fetch all students
        getAllStudents();
    }, [getAllStatistics, getAllStudents, selectedYear]);

    // Calculate real student statistics from actual data
    const realStudentStats = useMemo(() => {
        if (!students || students.length === 0)
            return {
                totalStudents: 0,
                activeStudents: 0,
                inactiveStudents: 0,
                newStudentsThisMonth: 0,
            };

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const activeStudents = students.filter(
            (student) => student.status === 1
        ).length;
        const inactiveStudents = students.filter(
            (student) => student.status === 0
        ).length;

        // Students enrolled this month
        const newStudentsThisMonth = students.filter((student) => {
            if (!student.enrollment_date) return false;
            const enrollmentDate = new Date(student.enrollment_date);
            return (
                enrollmentDate.getMonth() + 1 === currentMonth &&
                enrollmentDate.getFullYear() === currentYear
            );
        }).length;

        return {
            totalStudents: students.length,
            activeStudents,
            inactiveStudents,
            newStudentsThisMonth,
        };
    }, [students]);

    // Function to auto-generate statistics from real student data
    const generateStatisticsFromRealData = async () => {
        if (!students || students.length === 0) {
            console.log('No student data available to generate statistics');
            return;
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        // Calculate statistics for current month
        const newStudentsThisMonth = students.filter((student) => {
            if (!student.enrollment_date) return false;
            const enrollmentDate = new Date(student.enrollment_date);
            return (
                enrollmentDate.getMonth() + 1 === currentMonth &&
                enrollmentDate.getFullYear() === currentYear
            );
        }).length;

        const statisticData = {
            year: currentYear,
            month: currentMonth,
            total_students: students.length,
            new_students: newStudentsThisMonth,
            inactive_students: students.filter(
                (student) => student.status === 0
            ).length,
        };

        try {
            await createStatistic(statisticData);
            console.log('Generated statistics from real data:', statisticData);
        } catch (error) {
            console.log('Statistics may already exist for this period:', error);
        }
    };

    // Function to create sample data for testing
    const createSampleData = async () => {
        const currentYear = new Date().getFullYear();
        const sampleData = [
            {
                year: currentYear,
                month: 1,
                total_students: 180,
                new_students: 20,
                inactive_students: 5,
            },
            {
                year: currentYear,
                month: 2,
                total_students: 195,
                new_students: 18,
                inactive_students: 3,
            },
            {
                year: currentYear,
                month: 3,
                total_students: 210,
                new_students: 25,
                inactive_students: 10,
            },
            {
                year: currentYear,
                month: 4,
                total_students: 205,
                new_students: 10,
                inactive_students: 15,
            },
            {
                year: currentYear,
                month: 5,
                total_students: 220,
                new_students: 30,
                inactive_students: 15,
            },
            {
                year: currentYear,
                month: 6,
                total_students: 235,
                new_students: 25,
                inactive_students: 10,
            },
        ];

        for (const data of sampleData) {
            try {
                await createStatistic(data);
            } catch (error) {
                console.log('Sample data may already exist:', error);
            }
        }
    };

    // Transform API data to display format
    const monthlyStudentStats = useMemo(() => {
        return statistics
            .sort((a, b) => {
                if (a.year !== b.year) return a.year - b.year;
                return a.month - b.month;
            })
            .map((stat) => {
                const monthName = `Tháng ${stat.month}/${stat.year}`;
                const change = stat.new_students - stat.inactive_students;
                const status = change >= 0 ? 'increase' : 'decrease';

                return {
                    month: monthName,
                    total: stat.total_students,
                    newStudents: stat.new_students,
                    leftStudents: stat.inactive_students,
                    change: change,
                    status: status,
                };
            });
    }, [statistics]);

    // Calculate current total students from real data or fallback to statistics
    const currentTotalStudents = useMemo(() => {
        // Use real student data if available
        if (realStudentStats.totalStudents > 0) {
            return realStudentStats.totalStudents;
        }

        // Fallback to statistics data
        if (monthlyStudentStats.length === 0) return 245; // fallback
        return (
            monthlyStudentStats[monthlyStudentStats.length - 1]?.total || 245
        );
    }, [monthlyStudentStats, realStudentStats]);
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
                        <div className="text-2xl font-bold">
                            {statisticsLoading || studentsLoading
                                ? '...'
                                : currentTotalStudents}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {realStudentStats.activeStudents > 0 && (
                                <span className="text-green-600 mr-2">
                                    {realStudentStats.activeStudents} đang hoạt
                                    động
                                </span>
                            )}
                            {realStudentStats.newStudentsThisMonth > 0 && (
                                <span className="text-blue-600">
                                    +{realStudentStats.newStudentsThisMonth} mới
                                    tháng này
                                </span>
                            )}
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
                        <div className="flex items-center justify-between">
                            <CardTitle>Thống kê học sinh theo tháng</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={createSampleData}
                                    disabled={statisticsLoading}
                                >
                                    Tạo dữ liệu mẫu
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={generateStatisticsFromRealData}
                                    disabled={
                                        statisticsLoading || studentsLoading
                                    }
                                >
                                    Tính từ dữ liệu thật
                                </Button>
                                <select
                                    className="text-sm border border-gray-300 rounded px-2 py-1"
                                    value={selectedYear}
                                    onChange={(e) => {
                                        const year = parseInt(e.target.value);
                                        setSelectedYear(year);
                                    }}
                                >
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const year =
                                            new Date().getFullYear() - i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        getAllStatistics({
                                            startYear: selectedYear,
                                            endYear: selectedYear,
                                        });
                                    }}
                                    disabled={statisticsLoading}
                                >
                                    Làm mới
                                </Button>
                            </div>
                        </div>
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
                                {statisticsLoading || studentsLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center"
                                        >
                                            Đang tải dữ liệu...
                                        </TableCell>
                                    </TableRow>
                                ) : monthlyStudentStats.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center text-muted-foreground"
                                        >
                                            Chưa có dữ liệu thống kê
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    monthlyStudentStats.map((stat) => (
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
                                                    {stat.status ===
                                                    'increase' ? (
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
                                                        {stat.change > 0
                                                            ? '+'
                                                            : ''}
                                                        {stat.change}
                                                    </span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
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
