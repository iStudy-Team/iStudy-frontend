import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
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
import { Calendar, Clock, Users, TrendingUp, Search, Plus } from 'lucide-react';
import { useClassStore } from '@/store/useClassStore';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useAttendanceStore } from '@/store/useAttendanceStore';
import { ClassStatus } from '@/api/class';

const RollCall = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const { classes, getAllClasses, loading: classLoading } = useClassStore();
    const { classSessions, getAllClassSessions } = useClassSessionStore();
    const { stats } = useAttendanceStore();

    useEffect(() => {
        getAllClasses();
        getAllClassSessions();
    }, [getAllClasses, getAllClassSessions]);

    // Filter classes based on search term
    const filteredClasses = classes.filter(
        (cls) =>
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (cls.grade_level?.name &&
                cls.grade_level.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    const getClassSessionCount = (classId: string) => {
        return classSessions.filter((session) => session.classId === classId)
            .length;
    };

    const getAttendanceRate = () => {
        if (!stats || !stats.totalSessions) return 0;
        return Math.round(stats.attendanceRate);
    };

    const handleClassClick = (classId: string) => {
        navigate({ to: `/teacher/rollcall/${classId}` });
    };

    const handleCreateSession = (classId: string) => {
        // This could open a dialog to create a new session
        navigate({ to: `/teacher/rollcall/${classId}` });
    };

    if (classLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading classes...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Roll Call Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage attendance for your classes
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Classes
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {classes.length}
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
                            Active Classes
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                classes.filter(
                                    (cls) => cls.status === ClassStatus.OPEN
                                ).length
                            }
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg Attendance
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {getAttendanceRate()}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls) => {
                    const sessionCount = getClassSessionCount(cls.id);

                    return (
                        <Card
                            key={cls.id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleClassClick(cls.id)}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">
                                            {cls.name}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            {cls.grade_level?.name ||
                                                'No Grade'}{' '}
                                            •{' '}
                                            {cls.academic_year?.school_year ||
                                                'No Academic Year'}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant={
                                            cls.status === ClassStatus.OPEN
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className="capitalize"
                                    >
                                        {cls.status === ClassStatus.OPEN
                                            ? 'Open'
                                            : cls.status === ClassStatus.CLOSE
                                              ? 'Closed'
                                              : 'Completed'}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span>{sessionCount} sessions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span>
                                            {cls.capacity || 0} capacity
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>
                                            {cls.start_date
                                                ? new Date(
                                                      cls.start_date
                                                  ).toLocaleDateString()
                                                : 'No start date'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                        <span>
                                            {getAttendanceRate()}% attendance
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClassClick(cls.id);
                                        }}
                                    >
                                        View Roll Call
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCreateSession(cls.id);
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredClasses.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">
                        {searchTerm
                            ? 'No classes found matching your search.'
                            : 'No classes available.'}
                    </div>
                    {searchTerm && (
                        <Button
                            variant="outline"
                            onClick={() => setSearchTerm('')}
                            className="mt-4"
                        >
                            Clear Search
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default RollCall;
