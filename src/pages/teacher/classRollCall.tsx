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
    Plus,
    ArrowLeft,
    Search,
} from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useAttendanceStore } from '@/store/useAttendanceStore';
import { getStudentsByClassIdApi } from '@/api/classEnrollment';
import { ClassStatus } from '@/api/class';

interface ClassStudent {
    id: string;
    user_id: string;
    full_name: string;
    gender: number;
    date_of_birth?: Date;
    address?: string;
    enrollment_date?: Date;
    status: number;
    user?: {
        id: string;
        username?: string;
        email: string;
        phone?: string;
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
    const {
        classSessions,
        currentClassSession,
        getClassSessionsByClass,
        createClassSession,
        loading: sessionLoading,
    } = useClassSessionStore();
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
            // Extract students from the response structure
            const studentList = response.data.map((item) => item.student);
            setStudents(studentList);
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

    const handleCreateSession = async () => {
        if (!classId) return;

        const today = new Date();
        const sessionData = {
            date: today.toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '10:30',
            classId: classId,
            scheduleId: '', // This should come from the class schedule
            status: 'scheduled' as const,
            note: `Session for ${today.toLocaleDateString()}`,
        };

        const newSession = await createClassSession(sessionData);
        if (newSession) {
            setSelectedSession(newSession.id);
            // Refresh sessions
            getClassSessionsByClass(classId);
        }
    };

    const handleAttendanceChange = async (
        studentId: string,
        status: 'present' | 'absent' | 'late' | 'excused'
    ) => {
        if (!selectedSession) return;

        const existingAttendance = attendances.find(
            (a) => a.studentId === studentId
        );

        if (existingAttendance) {
            await updateAttendance(existingAttendance.id, { status });
        } else {
            await createAttendance({
                classSessionId: selectedSession,
                studentId,
                status,
                note: '',
            });
        }

        // Refresh attendance data
        getAttendanceByClassSession(selectedSession);
    };

    const getStudentAttendanceStatus = (studentId: string): string => {
        const attendance = attendances.find((a) => a.studentId === studentId);
        return attendance?.status || 'unmarked';
    };

    const exportToCSV = () => {
        if (!currentClassSession || !students.length) return;

        const headers = [
            'Student Name',
            'Student ID',
            'Attendance Status',
            'Date',
            'Session',
        ];
        const data = students.map((student) => [
            student.user?.username || 'N/A',
            student.id,
            getStudentAttendanceStatus(student.id),
            currentClassSession.date,
            `${currentClassSession.startTime} - ${currentClassSession.endTime}`,
        ]);

        const csvContent = [headers, ...data]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `attendance_${currentClass?.name}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    // Filter students based on search and attendance filter
    const filteredStudents = students.filter((student) => {
        const nameMatch =
            student.user?.username
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
                    <div className="text-lg">Loading class details...</div>
                </div>
            </div>
        );
    }

    if (!currentClass) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-red-600">Class not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate({ to: '/teacher/rollcall' })}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Classes
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {currentClass.name}
                    </h1>
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
                            Total Students
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
                            Total Sessions
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
                            Class Status
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Badge
                            variant={
                                currentClass.status === ClassStatus.OPEN
                                    ? 'default'
                                    : 'secondary'
                            }
                        >
                            {currentClass.status === ClassStatus.OPEN
                                ? 'Open'
                                : currentClass.status === ClassStatus.CLOSE
                                  ? 'Closed'
                                  : 'Completed'}
                        </Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Present Today
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
                            <CardTitle>Attendance Management</CardTitle>
                            <CardDescription>
                                Select a session and mark attendance
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCreateSession}
                                disabled={sessionLoading}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Session
                            </Button>
                            {selectedSession && (
                                <Button onClick={exportToCSV} variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export CSV
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
                                Select Session
                            </label>
                            <Select
                                value={selectedSession}
                                onValueChange={setSelectedSession}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a session to mark attendance" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classSessions.map((session) => (
                                        <SelectItem
                                            key={session.id}
                                            value={session.id}
                                        >
                                            {new Date(
                                                session.date
                                            ).toLocaleDateString()}{' '}
                                            - {session.startTime} to{' '}
                                            {session.endTime}
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
                                        placeholder="Search students..."
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
                                            All Students
                                        </SelectItem>
                                        <SelectItem value="present">
                                            Present
                                        </SelectItem>
                                        <SelectItem value="absent">
                                            Absent
                                        </SelectItem>
                                        <SelectItem value="late">
                                            Late
                                        </SelectItem>
                                        <SelectItem value="excused">
                                            Excused
                                        </SelectItem>
                                        <SelectItem value="unmarked">
                                            Unmarked
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
                                <div className="text-gray-600">Total</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                                <div className="font-semibold text-green-700">
                                    {stats.present}
                                </div>
                                <div className="text-green-600">Present</div>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded">
                                <div className="font-semibold text-red-700">
                                    {stats.absent}
                                </div>
                                <div className="text-red-600">Absent</div>
                            </div>
                            <div className="text-center p-2 bg-yellow-50 rounded">
                                <div className="font-semibold text-yellow-700">
                                    {stats.late}
                                </div>
                                <div className="text-yellow-600">Late</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded">
                                <div className="font-semibold text-blue-700">
                                    {stats.excused}
                                </div>
                                <div className="text-blue-600">Excused</div>
                            </div>
                            <div className="text-center p-2 bg-gray-100 rounded">
                                <div className="font-semibold text-gray-700">
                                    {stats.unmarked}
                                </div>
                                <div className="text-gray-600">Unmarked</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Students Table */}
            {selectedSession && (
                <Card>
                    <CardHeader>
                        <CardTitle>Student Attendance</CardTitle>
                        <CardDescription>
                            Mark attendance for {filteredStudents.length}{' '}
                            student(s)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {attendanceLoading ? (
                            <div className="flex items-center justify-center h-32">
                                <div className="text-lg">
                                    Loading attendance data...
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Student ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
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
                                                    {student.user?.username ||
                                                        'Unknown Student'}
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
                                                            ? 'Not Marked'
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
                                                                    'present'
                                                                )
                                                            }
                                                        >
                                                            Present
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
                                                                    'absent'
                                                                )
                                                            }
                                                        >
                                                            Absent
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
                                                                    'late'
                                                                )
                                                            }
                                                        >
                                                            Late
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
                                                                    'excused'
                                                                )
                                                            }
                                                        >
                                                            Excused
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
                                            ? 'No students match the current filters.'
                                            : 'No students enrolled in this class.'}
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
                            Select a session to view and mark attendance
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ClassRollCall;
