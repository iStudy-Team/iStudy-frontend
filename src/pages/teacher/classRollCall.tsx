import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Calendar,
    Clock,
    Users,
    Download,
    ChevronLeft,
    Search,
} from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useAttendanceStore } from '@/store/useAttendanceStore';
import { getStudentsByClassIdApi } from '@/api/classEnrollment';
import { ClassStatus } from '@/api/class';

interface ClassStudent {
    id: string;
    full_name: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    user?: {
        id: string;
        email: string;
        phone: string;
        avatar?: string;
    };
}

const ClassRollCall = () => {
    const navigate = useNavigate();
    const { classId } = useParams({ from: '/teacher/rollcall/$classId' });
    const [students, setStudents] = useState<ClassStudent[]>([]);
    const [selectedSession, setSelectedSession] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceFilter, setAttendanceFilter] = useState<string>('all');
    const [loadingStudents, setLoadingStudents] = useState(true);
    const {
        currentClass,
        getClassById,
        loading: classLoading,
    } = useClassStore();
    const { classSessions, getClassSessionsByClass } = useClassSessionStore();
    const {
        attendances,
        getAttendanceByClassSession,
        createAttendance,
        updateAttendance,
        loading: attendanceLoading,
    } = useAttendanceStore();

    const fetchStudents = useCallback(async () => {
        if (!classId) return;

        try {
            setLoadingStudents(true);
            const response = await getStudentsByClassIdApi(classId);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudents([]);
        } finally {
            setLoadingStudents(false);
        }
    }, [classId]);

    useEffect(() => {
        if (classId) {
            getClassById(classId);
            getClassSessionsByClass(classId);
            fetchStudents();
        }
    }, [classId, getClassById, getClassSessionsByClass, fetchStudents]);

    useEffect(() => {
        if (selectedSession) {
            getAttendanceByClassSession(selectedSession);
        }
    }, [selectedSession, getAttendanceByClassSession]);

    const handleAttendanceChange = async (
        studentId: string,
        status: 0 | 1 | 2 | 3
    ) => {
        if (!selectedSession) return;

        const existingAttendance = attendances.find(
            (a) => a.student_id === studentId
        );

        if (existingAttendance) {
            await updateAttendance(existingAttendance.id, { status });
        } else {
            await createAttendance({
                class_session_id: selectedSession,
                student_id: studentId,
                status,
                comment: '',
            });
        }

        getAttendanceByClassSession(selectedSession);
    };

    const getStudentAttendanceStatus = (studentId: string): string => {
        const attendance = attendances.find((a) => a.student_id === studentId);
        if (!attendance) return 'unmarked';

        switch (attendance.status) {
            case 0:
                return 'present';
            case 1:
                return 'absent';
            case 2:
                return 'late';
            case 3:
                return 'excused';
            default:
                return 'unmarked';
        }
    };

    // Tìm session được chọn từ danh sách classSessions
    const getSelectedSessionData = () => {
        return classSessions.find((session) => session.id === selectedSession);
    };

    const exportToCSV = () => {
        const selectedSessionData = getSelectedSessionData();
        if (!selectedSessionData || !students.length) return;

        const headers = [
            'Tên học sinh',
            'Mã học sinh',
            'Trạng thái điểm danh',
            'Ngày',
            'Phiên học',
        ];
        const data = students.map((student) => [
            student.full_name || 'N/A',
            student.id,
            getStudentAttendanceStatus(student.id),
            selectedSessionData.date,
            `${selectedSessionData.start_time} - ${selectedSessionData.end_time}`,
        ]);

        const csvContent = [headers, ...data]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `diem_danh_${currentClass?.name}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const filteredStudents = students.filter((student) => {
        const nameMatch =
            student.full_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) || false;
        const attendanceStatus = getStudentAttendanceStatus(student.id);
        const attendanceMatch =
            attendanceFilter === 'all' || attendanceStatus === attendanceFilter;

        return nameMatch && attendanceMatch;
    });

    const getAttendanceStats = () => {
        const total = students.length;
        const present = students.filter(
            (s) => getStudentAttendanceStatus(s.id) === 'present'
        ).length;
        const absent = students.filter(
            (s) => getStudentAttendanceStatus(s.id) === 'absent'
        ).length;
        const late = students.filter(
            (s) => getStudentAttendanceStatus(s.id) === 'late'
        ).length;
        const excused = students.filter(
            (s) => getStudentAttendanceStatus(s.id) === 'excused'
        ).length;
        const unmarked = total - present - absent - late - excused;

        return { total, present, absent, late, excused, unmarked };
    };

    const stats = getAttendanceStats();

    if (classLoading || loadingStudents) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Đang tải thông tin lớp...</div>
                </div>
            </div>
        );
    }

    if (!currentClass) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-red-600">
                        Không tìm thấy lớp học
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    className="cursor-pointer"
                    variant="link"
                    onClick={() => navigate({ to: '/teacher/rollcall' })}
                >
                    <ChevronLeft className="size-10" />
                </Button>
                <div className="-ml-4">
                    <p className="text-xl font-bold text-gray-900">
                        {currentClass.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                        {currentClass.grade_level?.name} •{' '}
                        {currentClass.academic_year?.school_year}
                    </p>
                </div>
            </div>

            {/* Class Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số học sinh
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {students.length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số phiên học
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {classSessions.length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Trạng thái lớp học
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Badge
                            variant={
                                currentClass.status === ClassStatus.OPEN
                                    ? 'outline'
                                    : 'destructive'
                            }
                        >
                            {currentClass.status === ClassStatus.OPEN
                                ? 'Mở (M)'
                                : currentClass.status === ClassStatus.CLOSE
                                  ? 'Đóng (D)'
                                  : 'Hoàn thành (C)'}
                        </Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Số học sinh có mặt
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.present}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Session Selection and Actions */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>Quản lý điểm danh</CardTitle>
                            <CardDescription>
                                Chọn một phiên học và đánh dấu điểm danh
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            {selectedSession && (
                                <Button onClick={exportToCSV} variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Xuất CSV
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Session Selector */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">
                                Chọn phiên học
                            </label>
                            <Select
                                value={selectedSession}
                                onValueChange={setSelectedSession}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn một phiên để điểm danh" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classSessions.map((session) => (
                                        <SelectItem
                                            key={session.id}
                                            value={session.id}
                                        >
                                            {new Date(
                                                session.date
                                            ).toLocaleDateString('vi-VN')}{' '}
                                            -{' '}
                                            {new Date(session.start_time)
                                                .getHours()
                                                .toString()
                                                .padStart(2, '0')}
                                            :
                                            {new Date(session.start_time)
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, '0')}{' '}
                                            tới{' '}
                                            {new Date(session.end_time)
                                                .getHours()
                                                .toString()
                                                .padStart(2, '0')}
                                            :
                                            {new Date(session.end_time)
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, '0')}
                                            {session.status &&
                                                ` (${session.status})`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Filters */}
                    {selectedSession && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Tìm kiếm học sinh..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="sm:w-48">
                                <Select
                                    value={attendanceFilter}
                                    onValueChange={setAttendanceFilter}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Tất cả học sinh
                                        </SelectItem>
                                        <SelectItem value="present">
                                            Có mặt
                                        </SelectItem>
                                        <SelectItem value="absent">
                                            Vắng mặt
                                        </SelectItem>
                                        <SelectItem value="late">
                                            Đi muộn
                                        </SelectItem>
                                        <SelectItem value="excused">
                                            Có phép
                                        </SelectItem>
                                        <SelectItem value="unmarked">
                                            Chưa điểm danh
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Attendance Stats */}
                    {selectedSession && (
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
                            <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="font-semibold">
                                    {stats.total}
                                </div>
                                <div className="text-gray-600">Tổng</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                                <div className="font-semibold text-green-700">
                                    {stats.present}
                                </div>
                                <div className="text-green-600">Có mặt</div>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded">
                                <div className="font-semibold text-red-700">
                                    {stats.absent}
                                </div>
                                <div className="text-red-600">Vắng mặt</div>
                            </div>
                            <div className="text-center p-2 bg-yellow-50 rounded">
                                <div className="font-semibold text-yellow-700">
                                    {stats.late}
                                </div>
                                <div className="text-yellow-600">Đi muộn</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded">
                                <div className="font-semibold text-blue-700">
                                    {stats.excused}
                                </div>
                                <div className="text-blue-600">Có phép</div>
                            </div>
                            <div className="text-center p-2 bg-gray-100 rounded">
                                <div className="font-semibold text-gray-700">
                                    {stats.unmarked}
                                </div>
                                <div className="text-gray-600">
                                    Chưa điểm danh
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Students Table */}
            {selectedSession && (
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách điểm danh</CardTitle>
                        <CardDescription>
                            Điểm danh cho {filteredStudents.length} học sinh
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {attendanceLoading ? (
                            <div className="flex items-center justify-center h-32">
                                <div className="text-lg">
                                    Đang tải dữ liệu điểm danh...
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên học sinh</TableHead>
                                        <TableHead>Mã học sinh</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student) => {
                                        const attendanceStatus =
                                            getStudentAttendanceStatus(
                                                student.id
                                            );

                                        return (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">
                                                    {student.full_name ||
                                                        'Không rõ tên'}
                                                </TableCell>
                                                <TableCell>
                                                    {student.id}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            attendanceStatus ===
                                                            'present'
                                                                ? 'default'
                                                                : attendanceStatus ===
                                                                    'absent'
                                                                  ? 'destructive'
                                                                  : attendanceStatus ===
                                                                      'late'
                                                                    ? 'secondary'
                                                                    : attendanceStatus ===
                                                                        'excused'
                                                                      ? 'outline'
                                                                      : 'secondary'
                                                        }
                                                    >
                                                        {attendanceStatus ===
                                                        'unmarked'
                                                            ? 'Chưa điểm danh'
                                                            : attendanceStatus ===
                                                                'present'
                                                              ? 'Có mặt'
                                                              : attendanceStatus ===
                                                                  'absent'
                                                                ? 'Vắng mặt'
                                                                : attendanceStatus ===
                                                                    'late'
                                                                  ? 'Đi muộn'
                                                                  : attendanceStatus ===
                                                                      'excused'
                                                                    ? 'Có phép'
                                                                    : attendanceStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                attendanceStatus ===
                                                                'present'
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            onClick={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    0 // Có mặt
                                                                )
                                                            }
                                                        >
                                                            Có mặt
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                attendanceStatus ===
                                                                'absent'
                                                                    ? 'destructive'
                                                                    : 'outline'
                                                            }
                                                            onClick={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    1 // Vắng mặt
                                                                )
                                                            }
                                                        >
                                                            Vắng mặt
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                attendanceStatus ===
                                                                'late'
                                                                    ? 'secondary'
                                                                    : 'outline'
                                                            }
                                                            onClick={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    2 // Đi muộn
                                                                )
                                                            }
                                                        >
                                                            Đi muộn
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                attendanceStatus ===
                                                                'excused'
                                                                    ? 'outline'
                                                                    : 'outline'
                                                            }
                                                            onClick={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    3 // Có phép
                                                                )
                                                            }
                                                        >
                                                            Có phép
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}

                        {filteredStudents.length === 0 &&
                            !attendanceLoading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        {searchTerm ||
                                        attendanceFilter !== 'all'
                                            ? 'Không có học sinh nào phù hợp với bộ lọc hiện tại.'
                                            : 'Không có học sinh nào trong lớp này.'}
                                    </p>
                                </div>
                            )}
                    </CardContent>
                </Card>
            )}

            {!selectedSession && (
                <Card>
                    <CardContent className="flex items-center justify-center h-32">
                        <p className="text-gray-500">
                            Vui lòng chọn một phiên học để xem và điểm danh
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ClassRollCall;
