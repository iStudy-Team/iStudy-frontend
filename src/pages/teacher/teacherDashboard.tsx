import { useState } from 'react';
import {
    Bookmark,
    Users,
    CheckCircle,
    Clock,
    Calendar,
    Clipboard,
    Bell,
    Award,
    MessageSquare,
    BookOpen,
} from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@tanstack/react-router';

// Types
interface StatItem {
    title: string;
    value: number;
    trend: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface ActivityItem {
    id: number;
    type: string;
    message: string;
    time: string;
    icon: React.ComponentType<{ className?: string }>;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface ClassItem {
    id: number;
    subject: string;
    time: string;
    room: string;
    students: number;
}

interface QuickAction {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'ghost';
}

// Components
const StatCard = ({ title, value, trend, icon: Icon, color }: StatItem) => {
    const trendColor = trend > 0 ? 'text-green-500' : 'text-red-500';
    const trendBg = trend > 0 ? 'bg-green-100' : 'bg-red-100';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend !== 0 && (
                    <div className={`flex items-center text-xs ${trendColor}`}>
                        <span className={`mr-1 ${trendBg} px-1 rounded`}>
                            {trend > 0 ? '+' : ''}
                            {trend}
                        </span>
                        <span>so với tuần trước</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const ActivityItem = ({ activity }: { activity: ActivityItem }) => (
    <div className="flex items-start gap-4">
        <Badge variant={activity.variant} className="h-8 w-8 p-0">
            <activity.icon className="h-4 w-4" />
        </Badge>
        <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
                {activity.message}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
        </div>
    </div>
);

const ClassItem = ({ classItem }: { classItem: ClassItem }) => (
    <div className="flex items-center gap-4 p-4 hover:bg-accent transition-colors rounded-lg">
        <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
                <BookOpen className="h-5 w-5" />
            </AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <h3 className="font-medium">{classItem.subject}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {classItem.time} • {classItem.room}
            </div>
        </div>
        <div className="text-right">
            <p className="font-medium">{classItem.students} HS</p>
            <Button variant="link" size="sm" className="h-auto p-0">
                Vào lớp
            </Button>
        </div>
    </div>
);

const QuickActionItem = ({ action }: { action: QuickAction }) => (
    <Button
        variant={action.variant}
        className="h-auto flex-col gap-2 w-full cursor-pointer"
    >
        <action.icon className="h-6 w-6" />
        <span>{action.label}</span>
    </Button>
);

// Main Component
export default function TeacherDashboard() {
    const stats: StatItem[] = [
        {
            title: 'Tổng số lớp',
            value: 4,
            trend: +2,
            icon: Bookmark,
            color: 'text-blue-500',
        },
        {
            title: 'Tổng học sinh',
            value: 25,
            trend: +3,
            icon: Users,
            color: 'text-green-500',
        },
        {
            title: 'Buổi đã dạy',
            value: 45,
            trend: +8,
            icon: CheckCircle,
            color: 'text-purple-500',
        },
        {
            title: 'Buổi sắp tới',
            value: 12,
            trend: -1,
            icon: Clock,
            color: 'text-orange-500',
        },
    ];

    const activities: ActivityItem[] = [
        {
            id: 1,
            type: 'attendance',
            message: 'Điểm danh lớp Toán 10A - 15/15 học sinh có mặt',
            time: '2 giờ trước',
            icon: CheckCircle,
            variant: 'default',
        },
        {
            id: 2,
            type: 'assignment',
            message: 'Bài tập mới đã được giao cho lớp Văn 11B',
            time: '4 giờ trước',
            icon: BookOpen,
            variant: 'secondary',
        },
        {
            id: 3,
            type: 'message',
            message: '3 tin nhắn mới từ phụ huynh',
            time: '6 giờ trước',
            icon: MessageSquare,
            variant: 'outline',
        },
        {
            id: 4,
            type: 'achievement',
            message: 'Học sinh Nguyễn Văn A đạt điểm cao nhất',
            time: '1 ngày trước',
            icon: Award,
            variant: 'default',
        },
    ];

    const classes: ClassItem[] = [
        {
            id: 1,
            subject: 'Toán 10A',
            time: '08:00 - 09:30',
            room: 'Phòng 101',
            students: 28,
        },
        {
            id: 2,
            subject: 'Văn 11B',
            time: '10:00 - 11:30',
            room: 'Phòng 205',
            students: 32,
        },
        {
            id: 3,
            subject: 'Toán 12C',
            time: '14:00 - 15:30',
            room: 'Phòng 301',
            students: 25,
        },
    ];

    const quickActions: QuickAction[] = [
        {
            href: '/teacher/schedule',
            icon: Calendar,
            label: 'Thời khóa biểu',
            variant: 'secondary',
        },
        {
            href: '/teacher/rollcall',
            icon: Clipboard,
            label: 'Điểm danh',
            variant: 'secondary',
        },
        {
            href: '/teacher/notifications',
            icon: Bell,
            label: 'Thông báo',
            variant: 'secondary',
        },
    ];

    return (
        <div className="space-y-6 p-4">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Schedule and Activities */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Today's Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lịch học hôm nay</CardTitle>
                        <CardDescription>
                            {classes.length} buổi học
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {classes.map((classItem) => (
                            <ClassItem
                                key={classItem.id}
                                classItem={classItem}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hoạt động gần đây</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {activities.map((activity) => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                            />
                        ))}
                        <Button variant="ghost" className="mt-2">
                            Xem tất cả hoạt động
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Truy cập nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid  grid-cols-3 gap-4 ">
                        {quickActions.map((action, index) => (
                            <Link to={action.href}>
                                <div>
                                    <QuickActionItem
                                        key={index}
                                        action={action}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
