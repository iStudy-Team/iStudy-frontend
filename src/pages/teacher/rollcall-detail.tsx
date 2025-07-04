import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
    ArrowLeft, 
    Plus, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    Save,
    Search
} from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useAttendanceStore } from '@/store/useAttendanceStore';
import { getStudentsByClassIdApi } from '@/api/classEnrollment';
import { AttendanceStatus } from '@/api/attendance';
import { format } from 'date-fns';

interface Student {
    id: string;
    full_name: string;
    user?: {
        email: string;
        phone: string;
        avatar?: string;
    };
}

interface AttendanceRecord {
    student_id: string;
    status: number;
    comment?: string;
}

const RollCallDetail = () => {
    const navigate = useNavigate();
    const { classId } = useParams({ strict: false });
    const [students, setStudents] = useState<Student[]>([]);

    const [selectedSession, setSelectedSession] = useState<string>('');
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
    const [newSessionData, setNewSessionData] = useState({
        date: '',
        start_time: '',
        end_time: '',
        topic: '',
        note: '',
    });

    const { currentClass, getClassById, loading: classLoading } = useClassStore();
    const { 
        classSessions, 
        createClassSession, 
        getClassSessionsByClass,
        loading: sessionLoading 
    } = useClassSessionStore();
    const { 
        attendances, 
        createBulkAttendance, 
        getAttendanceByClassSession,
        loading: attendanceLoading 
    } = useAttendanceStore();

    // Load students for the class
    const loadStudents = useCallback(async () => {
        if (!classId) return;
        
        try {
            const response = await getStudentsByClassIdApi(classId);
            setStudents(response.data);
            
            // Initialize attendance records for all students
            const initialRecords = response.data.map(student => ({
                student_id: student.id,
                status: AttendanceStatus.PRESENT,
                comment: '',
            }));
            setAttendanceRecords(initialRecords);
        } catch (error) {
            console.error('Failed to load students:', error);
        }
    }, [classId]);

    // Load class data
    useEffect(() => {
        if (classId) {
            getClassById(classId);
            getClassSessionsByClass(classId);
            loadStudents();
        }
    }, [classId, getClassById, getClassSessionsByClass, loadStudents]);

    // Load attendance for selected session
    useEffect(() => {
        if (selectedSession) {
            getAttendanceByClassSession(selectedSession);
        }
    }, [selectedSession, getAttendanceByClassSession]);

    // Update attendance records when existing attendance is loaded
    useEffect(() => {
        if (attendances.length > 0 && selectedSession) {
            const existingAttendance = attendances.filter(a => a.class_session_id === selectedSession);
            const updatedRecords = attendanceRecords.map(record => {
                const existing = existingAttendance.find(a => a.student_id === record.student_id);
                return existing ? {
                    student_id: record.student_id,
                    status: existing.status,
                    comment: existing.comment || '',
                } : record;
            });
            setAttendanceRecords(updatedRecords);
        }
    }, [attendances, selectedSession, attendanceRecords]);

    const handleBack = () => {
        navigate({ to: '/teacher/rollcall' });
    };

    const handleCreateSession = async () => {
        if (!classId) return;

        const sessionData = {
            class_id: classId,
            date: newSessionData.date,
            start_time: `${newSessionData.date}T${newSessionData.start_time}:00.000Z`,
            end_time: `${newSessionData.date}T${newSessionData.end_time}:00.000Z`,
            topic: newSessionData.topic,
            note: newSessionData.note,
            status: 0, // Scheduled
        };

        const session = await createClassSession(sessionData);
        if (session) {
            setIsCreateSessionOpen(false);
            setNewSessionData({
                date: '',
                start_time: '',
                end_time: '',
                topic: '',
                note: '',
            });
            getClassSessionsByClass(classId);
        }
    };

    const handleAttendanceChange = (studentId: string, field: 'status' | 'comment', value: number | string) => {
        setAttendanceRecords(prev => 
            prev.map(record => 
                record.student_id === studentId 
                    ? { ...record, [field]: value }
                    : record
            )
        );
    };

    const handleSaveAttendance = async () => {
        if (!selectedSession) {
            alert('Please select a class session first');
            return;
        }

        const result = await createBulkAttendance(selectedSession, attendanceRecords);
        if (result && result.errors.length === 0) {
            // Refresh attendance data
            getAttendanceByClassSession(selectedSession);
        }
    };

    const getStatusIcon = (status: number) => {
        switch (status) {
            case AttendanceStatus.PRESENT:
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case AttendanceStatus.ABSENT:
                return <XCircle className="h-4 w-4 text-red-500" />;
            case AttendanceStatus.LATE:
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case AttendanceStatus.EXCUSED:
                return <AlertCircle className="h-4 w-4 text-blue-500" />;
            default:
                return <CheckCircle className="h-4 w-4 text-green-500" />;
        }
    };



    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.user?.email && student.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (classLoading || !currentClass) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading class details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Classes
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {currentClass.name} - Roll Call
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage attendance for class sessions
                    </p>
                </div>
            </div>

            {/* Class Info & Session Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Class Name</label>
                            <p className="text-lg">{currentClass.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Total Students</label>
                            <p className="text-lg">{students.length}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Total Sessions</label>
                            <p className="text-lg">{classSessions.length}</p>
                        </div>
                        
                        <Dialog open={isCreateSessionOpen} onOpenChange={setIsCreateSessionOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Class Session</DialogTitle>
                                    <DialogDescription>
                                        Add a new session for attendance tracking
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Date</label>
                                        <Input
                                            type="date"
                                            value={newSessionData.date}
                                            onChange={(e) => setNewSessionData(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Start Time</label>
                                            <Input
                                                type="time"
                                                value={newSessionData.start_time}
                                                onChange={(e) => setNewSessionData(prev => ({ ...prev, start_time: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">End Time</label>
                                            <Input
                                                type="time"
                                                value={newSessionData.end_time}
                                                onChange={(e) => setNewSessionData(prev => ({ ...prev, end_time: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Topic</label>
                                        <Input
                                            value={newSessionData.topic}
                                            onChange={(e) => setNewSessionData(prev => ({ ...prev, topic: e.target.value }))}
                                            placeholder="Session topic"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Note</label>
                                        <Textarea
                                            value={newSessionData.note}
                                            onChange={(e) => setNewSessionData(prev => ({ ...prev, note: e.target.value }))}
                                            placeholder="Additional notes"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateSessionOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateSession} disabled={sessionLoading}>
                                        Create Session
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Select Session</CardTitle>
                        <CardDescription>Choose a session to take attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select value={selectedSession} onValueChange={setSelectedSession}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a class session" />
                            </SelectTrigger>
                            <SelectContent>
                                {classSessions.map((session) => (
                                    <SelectItem key={session.id} value={session.id}>
                                        {format(new Date(session.date), 'PPP')} - {session.topic || 'No topic'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance Table */}
            {selectedSession && (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Take Attendance</CardTitle>
                                <CardDescription>
                                    Mark attendance for selected session
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search students..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-64"
                                    />
                                </div>
                                <Button onClick={handleSaveAttendance} disabled={attendanceLoading}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Attendance
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Comment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student) => {
                                        const attendanceRecord = attendanceRecords.find(
                                            record => record.student_id === student.id
                                        );
                                        
                                        return (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">
                                                    {student.full_name}
                                                </TableCell>
                                                <TableCell>
                                                    {student.user?.email || 'No email'}
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={attendanceRecord?.status.toString()}
                                                        onValueChange={(value) => 
                                                            handleAttendanceChange(student.id, 'status', parseInt(value))
                                                        }
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <div className="flex items-center gap-2">
                                                                {getStatusIcon(attendanceRecord?.status || AttendanceStatus.PRESENT)}
                                                                <SelectValue />
                                                            </div>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={AttendanceStatus.PRESENT.toString()}>
                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                                    Present
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value={AttendanceStatus.ABSENT.toString()}>
                                                                <div className="flex items-center gap-2">
                                                                    <XCircle className="h-4 w-4 text-red-500" />
                                                                    Absent
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value={AttendanceStatus.LATE.toString()}>
                                                                <div className="flex items-center gap-2">
                                                                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                                                                    Late
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value={AttendanceStatus.EXCUSED.toString()}>
                                                                <div className="flex items-center gap-2">
                                                                    <AlertCircle className="h-4 w-4 text-blue-500" />
                                                                    Excused
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={attendanceRecord?.comment || ''}
                                                        onChange={(e) => 
                                                            handleAttendanceChange(student.id, 'comment', e.target.value)
                                                        }
                                                        placeholder="Add comment..."
                                                        className="w-48"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        
                        {filteredStudents.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                {searchTerm ? 'No students found matching your search.' : 'No students enrolled in this class.'}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
            
            {!selectedSession && (
                <Card>
                    <CardContent className="flex items-center justify-center h-32">
                        <p className="text-gray-500">Please select a class session to take attendance</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default RollCallDetail;
