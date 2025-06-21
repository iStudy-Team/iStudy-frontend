import {
    Calendar,
    Check,
    X,
    BookOpen,
    Clock,
    Percent,
    User,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function RollCallStudent() {
    // Dữ liệu mẫu
    const attendanceData = {
        totalSessions: 30,
        attended: 25,
        absent: 5,
        attendanceRate: 83.3,
        recentSessions: [
            { date: '2023-10-15', status: 'attended', subject: 'Toán' },
            {
                date: '2023-10-14',
                status: 'absent',
                subject: 'Văn',
                reason: 'Bị ốm',
            },
            { date: '2023-10-12', status: 'attended', subject: 'Anh' },
            { date: '2023-10-10', status: 'attended', subject: 'Lý' },
            {
                date: '2023-10-08',
                status: 'absent',
                subject: 'Hóa',
                reason: 'Gia đình có việc',
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <User className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Thông tin điểm danh</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Thẻ tổng quan */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số buổi học
                        </CardTitle>
                        <BookOpen className="w-4 h-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {attendanceData.totalSessions}
                        </div>
                        <p className="text-xs text-gray-500">Buổi</p>
                    </CardContent>
                </Card>

                {/* Thẻ đã tham gia */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Đã tham gia
                        </CardTitle>
                        <Check className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {attendanceData.attended}
                        </div>
                        <p className="text-xs text-gray-500">Buổi</p>
                    </CardContent>
                </Card>

                {/* Thẻ vắng mặt */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Vắng mặt
                        </CardTitle>
                        <X className="w-4 h-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {attendanceData.absent}
                        </div>
                        <p className="text-xs text-gray-500">Buổi</p>
                    </CardContent>
                </Card>
            </div>

            {/* Thanh tiến trình */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Percent className="w-5 h-5" />
                        Tỷ lệ điểm danh
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Progress
                            value={attendanceData.attendanceRate}
                            className="h-3"
                        />
                        <span className="font-medium">
                            {attendanceData.attendanceRate}%
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Đạt {attendanceData.attended}/
                        {attendanceData.totalSessions} buổi
                    </p>
                </CardContent>
            </Card>

            {/* Lịch sử điểm danh */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Lịch sử điểm danh gần đây
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {attendanceData.recentSessions.map((session, index) => (
                            <div
                                key={index}
                                className="flex items-start p-4 border rounded-lg"
                            >
                                <div
                                    className={`p-2 rounded-full mr-4 ${
                                        session.status === 'attended'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    {session.status === 'attended' ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <X className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">
                                        {session.subject}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {new Date(
                                            session.date
                                        ).toLocaleDateString('vi-VN')}
                                    </div>
                                    {session.status === 'absent' &&
                                        session.reason && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                Lý do: {session.reason}
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
