import { useEffect, useMemo } from 'react';
import Schedule from '@/components/molecules/schedule';
import { useScheduleStore } from '@/store/useScheduleStore';
import { Loader2, AlertCircle } from 'lucide-react';

// Interface for the calendar component events
interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    description: string;
    end: string;
}

export default function TeacherSchedule() {
    const { schedules, loading, error, getSchedulesByTeacher } =
        useScheduleStore();

    // Fetch teacher schedules when component mounts
    useEffect(() => {
        getSchedulesByTeacher();
    }, [getSchedulesByTeacher]);

    // Map schedule data to calendar event format
    const calendarEvents: CalendarEvent[] = useMemo(() => {
        if (!schedules || !Array.isArray(schedules)) {
            return [];
        }

        return schedules.map((schedule) => {
            // Helper function to convert date/string to date string
            const getDateString = (
                dateValue: Date | string | undefined
            ): string => {
                if (!dateValue) return new Date().toISOString().split('T')[0];
                if (dateValue instanceof Date) {
                    return dateValue.toISOString().split('T')[0];
                }
                if (typeof dateValue === 'string') {
                    return dateValue.split('T')[0];
                }
                return new Date().toISOString().split('T')[0];
            };

            // Helper function to convert time to time string
            const getTimeString = (
                timeValue: Date | string | undefined,
                defaultTime: string
            ): string => {
                if (!timeValue) return defaultTime;
                if (timeValue instanceof Date) {
                    return timeValue.toTimeString().split(' ')[0];
                }
                if (typeof timeValue === 'string') {
                    // If it's an ISO string, extract time part
                    if (timeValue.includes('T')) {
                        const timePart = timeValue.split('T')[1];
                        if (timePart) {
                            // Remove timezone and milliseconds if present
                            return timePart.split('.')[0].split('Z')[0];
                        }
                    }
                    // If it's already a time string
                    return timeValue;
                }
                return defaultTime;
            };

            // Get date and time components
            const dayStr = getDateString(schedule.day);
            const startTimeStr = getTimeString(schedule.start_time, '08:00:00');
            const endTimeStr = getTimeString(schedule.end_time, '10:00:00');

            // Schedule-X accepts YYYY-MM-DD HH:MM format
            const startDateTime = `${dayStr} ${startTimeStr.substring(0, 5)}`; // Remove seconds
            let endDateTime = `${dayStr} ${endTimeStr.substring(0, 5)}`; // Remove seconds

            // Validate that end time is after start time
            const startDate = new Date(`${dayStr}T${startTimeStr}`);
            const endDate = new Date(`${dayStr}T${endTimeStr}`);

            if (endDate <= startDate) {
                // Add 2 hours to start time if end time is not valid
                const newEndDate = new Date(
                    startDate.getTime() + 2 * 60 * 60 * 1000
                );
                const newEndTimeStr = newEndDate
                    .toTimeString()
                    .split(' ')[0]
                    .substring(0, 5);
                endDateTime = `${dayStr} ${newEndTimeStr}`;
            }

            // Create event title from class information
            const title =
                schedule.class?.name ||
                schedule.class_name ||
                `Lớp học ${schedule.class_id}`;

            // Get teacher names from class information
            const teacherNames =
                schedule.class?.class_teachers
                    ?.map((ct) => ct.teacher.full_name)
                    .join(', ') || 'Chưa có thông tin';

            // Debug logging for development
            if (process.env.NODE_ENV === 'development') {
                console.log('Schedule transformation:', {
                    original: schedule,
                    transformed: {
                        id: schedule.id,
                        title,
                        start: startDateTime,
                        end: endDateTime,
                    },
                });
            }

            return {
                id: schedule.id,
                title,
                start: startDateTime,
                end: endDateTime,
                description: `Giáo viên: ${teacherNames}`,
            };
        });
    }, [schedules]);

    // Loading state
    if (loading && schedules.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="text-gray-600">Đang tải lịch dạy...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4 text-center max-w-md">
                        <AlertCircle className="w-16 h-16 text-red-500" />
                        <h2 className="text-xl font-bold text-gray-900">
                            Có lỗi xảy ra
                        </h2>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={() => getSchedulesByTeacher()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tải lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm h-full">
            {calendarEvents.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Chưa có lịch dạy
                        </h3>
                        <p className="text-gray-600">
                            Bạn chưa có lịch dạy nào được sắp xếp
                        </p>
                    </div>
                </div>
            ) : (
                <Schedule events={calendarEvents} />
            )}
        </div>
    );
}
