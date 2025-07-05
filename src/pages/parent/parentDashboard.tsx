import {
    BookOpen,
    User,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    Download,
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserProfileStore } from '@/store/useUserProfileStore';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useAttendanceStore } from '@/store/useAttendanceStore';
import { useClassStore } from '@/store/useClassStore';
import { Student } from '@/api/userProfile';

const ParentDashboard = () => {
    const { user, getInfoMe } = useAuthStore();
    const {
        relations,
        getRelationsByParentId,
        getAllStudents,
        loading: profileLoading,
    } = useUserProfileStore();
    const {
        getAllClassSessions,
        classSessions,
        loading: classLoading,
    } = useClassSessionStore();
    const {
        getAllAttendance,
        attendances,
        loading: attendanceLoading,
    } = useAttendanceStore();
    const { getAllClasses, classes, loading: classesLoading } = useClassStore();

    const [selectedChildId, setSelectedChildId] = useState<string>('');
    const isInitializedRef = useRef(false);

    // Lấy thông tin user trước tiên
    useEffect(() => {
        console.log('Getting user info...');
        getInfoMe();
    }, [getInfoMe]);

    // Khởi tạo dữ liệu khi đã có user
    const initializeData = useCallback(async () => {
        if (!user?.id || isInitializedRef.current) return;

        isInitializedRef.current = true;

        try {
            await Promise.all([
                getRelationsByParentId(user.id.toString()),
                getAllStudents(),
                getAllClassSessions(),
                getAllAttendance(),
                getAllClasses(),
            ]);
            console.log('Data initialization completed');
        } catch (error) {
            console.error('Error initializing data:', error);
            isInitializedRef.current = false;
        }
    }, [
        user?.id,
        getRelationsByParentId,
        getAllStudents,
        getAllClassSessions,
        getAllAttendance,
        getAllClasses,
    ]);

    useEffect(() => {
        if (user?.id && !isInitializedRef.current) {
            initializeData();
        }
    }, [user?.id, initializeData]);

    // Get current user's parent data
    const currentParentId = user?.id;

    // Get children from relationships - memoize to prevent unnecessary re-renders
    const children = useMemo(() => {
        return relations
            .map((relation) => relation.student)
            .filter(Boolean) as Student[];
    }, [relations]);

    // Debug logs
    useEffect(() => {
        console.log('Current state:', {
            user: user?.id,
            currentParentId,
            relations: relations.length,
            children: children.length,
            classSessions: classSessions.length,
            attendances: attendances.length,
            classes: classes.length,
        });
    }, [
        user?.id,
        currentParentId,
        relations.length,
        children.length,
        classSessions.length,
        attendances.length,
        classes.length,
    ]);

    // Calculate attendance data for each child - use useMemo for performance
    const childrenData = useMemo(() => {
        if (
            !children.length ||
            !classSessions.length ||
            !attendances.length ||
            !classes.length
        ) {
            console.log('Missing data for calculation:', {
                children: children.length,
                classSessions: classSessions.length,
                attendances: attendances.length,
                classes: classes.length,
            });
            return {};
        }

        console.log('Calculating attendance data...');
        const newChildrenData: {
            [key: string]: {
                student: Student;
                totalSessions: number;
                presentSessions: number;
                absentSessions: number;
                lateSessions: number;
                attendanceRate: number;
                attendanceDetails: Array<{
                    date: string;
                    status: string;
                    teacher: string;
                    note: string;
                }>;
            };
        } = {};

        children.forEach((child: Student) => {
            // Find all class sessions for this student
            const studentSessions = classSessions.filter((session) =>
                session.class?.class_enrollments?.some(
                    (enrollment) => enrollment.student.id === child.id
                )
            );

            // Find all attendance records for this student
            const studentAttendances = attendances.filter(
                (attendance) => attendance.student_id === child.id
            );

            // Calculate attendance stats
            const presentCount = studentAttendances.filter(
                (att) => att.status === 0 || att.status === 2
            ).length; // present or late
            const absentCount = studentAttendances.filter(
                (att) => att.status === 1 || att.status === 3
            ).length; // absent or excused
            const lateCount = studentAttendances.filter(
                (att) => att.status === 2
            ).length; // late only
            const attendanceRate =
                studentSessions.length > 0
                    ? (presentCount / studentSessions.length) * 100
                    : 0;

            // Prepare detailed attendance records
            const attendanceDetails = studentAttendances
                .map((attendance) => {
                    const session = classSessions.find(
                        (s) => s.id === attendance.class_session_id
                    );

                    return {
                        date: session?.date || '',
                        status:
                            attendance.status === 0
                                ? 'present'
                                : attendance.status === 1
                                  ? 'absent'
                                  : attendance.status === 2
                                    ? 'late'
                                    : 'excused',
                        teacher: attendance.teacher?.full_name || 'N/A',
                        note: attendance.comment || '',
                    };
                })
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );

            newChildrenData[child.id] = {
                student: child,
                totalSessions: studentSessions.length,
                presentSessions: presentCount,
                absentSessions: absentCount,
                lateSessions: lateCount,
                attendanceRate,
                attendanceDetails,
            };

            console.log(`Child ${child.id} data:`, {
                totalSessions: studentSessions.length,
                attendances: studentAttendances.length,
                presentCount,
                absentCount,
                lateCount,
                attendanceRate,
            });
        });

        return newChildrenData;
    }, [children, classSessions, attendances, classes]);

    // Auto-select first child if none selected
    const hasAutoSelectedRef = useRef(false);

    useEffect(() => {
        if (
            children.length > 0 &&
            selectedChildId === '' &&
            !hasAutoSelectedRef.current
        ) {
            setSelectedChildId(children[0].id);
            hasAutoSelectedRef.current = true;
        }
    }, [children, selectedChildId]);

    const isLoading =
        profileLoading || classLoading || attendanceLoading || classesLoading;

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Đang tải dữ liệu...</CardTitle>
                        <CardDescription>
                            Vui lòng đợi trong giây lát.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-600">
                            <p>User: {user ? '✓' : '✗'}</p>
                            <p>Relations: {relations.length}</p>
                            <p>Children: {children.length}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // No user found
    if (!user) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Lỗi xác thực</CardTitle>
                        <CardDescription>
                            Không thể xác thực thông tin người dùng. Vui lòng
                            đăng nhập lại.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Tải lại trang
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // No children found
    if (children.length === 0) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Không tìm thấy thông tin học sinh</CardTitle>
                        <CardDescription>
                            Hiện không có học sinh nào được đăng ký dưới tài
                            khoản của bạn. Vui lòng liên hệ quản trị viên để
                            được hỗ trợ.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-600 mb-4">
                            <p>Parent ID: {currentParentId}</p>
                            <p>Relations found: {relations.length}</p>
                        </div>
                        <Button
                            onClick={() => {
                                isInitializedRef.current = false;
                                initializeData();
                            }}
                            className="w-full"
                        >
                            Thử lại
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const selectedChildData = selectedChildId
        ? childrenData[selectedChildId]
        : null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <Card className="overflow-hidden">
                    {/* Header */}
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                        <CardTitle className="text-3xl flex items-center">
                            <User className="inline mr-3" />
                            Phụ huynh: {user?.username || user?.email}
                        </CardTitle>
                        <CardDescription className="text-blue-100">
                            ID: {user?.id} | Số con: {children.length}
                        </CardDescription>
                    </CardHeader>

                    <div className="p-8">
                        {/* Chọn học sinh */}
                        <div className="mb-8">
                            <Label className="block mb-2">Chọn học sinh:</Label>
                            <Select
                                value={selectedChildId}
                                onValueChange={setSelectedChildId}
                            >
                                <SelectTrigger className="w-full md:w-1/3">
                                    <SelectValue placeholder="Chọn học sinh" />
                                </SelectTrigger>
                                <SelectContent>
                                    {children.map((child: Student) => (
                                        <SelectItem
                                            key={child.id}
                                            value={child.id}
                                        >
                                            {child.user?.username ||
                                                child.full_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedChildData && (
                            <>
                                {/* Thống kê điểm danh tổng quan */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Tổng số buổi học
                                            </CardTitle>
                                            <BookOpen className="w-4 h-4 text-gray-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {
                                                    selectedChildData.totalSessions
                                                }
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Buổi
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Có mặt
                                            </CardTitle>
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-green-600">
                                                {
                                                    selectedChildData.presentSessions
                                                }
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Buổi
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Vắng mặt
                                            </CardTitle>
                                            <XCircle className="w-4 h-4 text-red-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-red-600">
                                                {
                                                    selectedChildData.absentSessions
                                                }
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Buổi
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Đi muộn
                                            </CardTitle>
                                            <Clock className="w-4 h-4 text-yellow-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-yellow-600">
                                                {selectedChildData.lateSessions}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Buổi
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Tỷ lệ điểm danh */}
                                <Card className="mb-8">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            Tỷ lệ điểm danh
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <Progress
                                                value={
                                                    selectedChildData.attendanceRate
                                                }
                                                className="h-3"
                                            />
                                            <span className="font-medium">
                                                {selectedChildData.attendanceRate.toFixed(
                                                    1
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Đạt{' '}
                                            {selectedChildData.presentSessions}/
                                            {selectedChildData.totalSessions}{' '}
                                            buổi
                                        </p>
                                    </CardContent>
                                </Card>

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
                                        {selectedChildData.attendanceDetails
                                            .length > 0 ? (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Ngày
                                                        </TableHead>
                                                        <TableHead>
                                                            Trạng thái
                                                        </TableHead>
                                                        <TableHead>
                                                            Ghi chú
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedChildData.attendanceDetails.map(
                                                        (record, index) => (
                                                            <TableRow
                                                                key={index}
                                                            >
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
                                                                              : record.status ===
                                                                                  'late'
                                                                                ? 'Đi muộn'
                                                                                : 'Có phép'}
                                                                    </Badge>
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
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                Chưa có dữ liệu điểm danh
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ParentDashboard;
