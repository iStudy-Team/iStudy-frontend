import { Check, X, BookOpen, Percent } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useClassSessionStore } from '@/store/useClassSessionStore';
import { useEffect } from 'react';
import { LOCALSTORAGE_KEY } from '@/types/localstorage';
import { useAttendanceStore } from '@/store/useAttendanceStore';

export default function RollCallStudent() {
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY.USER) || '{}'
    );
    const { getAllAttendance, attendances } = useAttendanceStore();
    const { getAllClassSessions, classSessions } = useClassSessionStore();

    useEffect(() => {
        getAllClassSessions();
        getAllAttendance();
    }, [getAllClassSessions, getAllAttendance]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
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
                            {
                                classSessions.filter((item) =>
                                    item.class?.class_enrollments?.map(
                                        (enrollment) =>
                                            enrollment.student.user_id ===
                                            user.id
                                    )
                                ).length
                            }
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
                            {
                                attendances.filter(
                                    (item) =>
                                        item.student?.user_id === user.id &&
                                        (item.status === 0 || item.status === 2)
                                ).length
                            }
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
                            {
                                attendances.filter(
                                    (item) =>
                                        item.student?.user_id === user.id &&
                                        (item.status === 1 || item.status === 3)
                                ).length
                            }
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
                            value={
                                (attendances.filter(
                                    (item) =>
                                        item.student?.user_id === user.id &&
                                        (item.status === 0 || item.status === 2)
                                ).length /
                                    classSessions.filter((item) =>
                                        item.class?.class_enrollments?.map(
                                            (enrollment) =>
                                                enrollment.student.user_id ===
                                                user.id
                                        )
                                    ).length) *
                                100
                            }
                            className="h-3"
                        />
                        <span className="font-medium">
                            {(attendances.filter(
                                (item) =>
                                    item.student?.user_id === user.id &&
                                    (item.status === 0 || item.status === 2)
                            ).length /
                                classSessions.filter((item) =>
                                    item.class?.class_enrollments?.map(
                                        (enrollment) =>
                                            enrollment.student.user_id ===
                                            user.id
                                    )
                                ).length) *
                                100}
                            %
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Đạt{' '}
                        {
                            attendances.filter(
                                (item) =>
                                    item.student?.user_id === user.id &&
                                    (item.status === 0 || item.status === 2)
                            ).length
                        }
                        /
                        {
                            classSessions.filter((item) =>
                                item.class?.class_enrollments?.map(
                                    (enrollment) =>
                                        enrollment.student.user_id === user.id
                                )
                            ).length
                        }{' '}
                        buổi
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
