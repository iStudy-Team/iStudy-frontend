import { Scheduler } from '@aldabil/react-scheduler';
import { vi } from 'date-fns/locale';

interface ScheduleProps {
    events: ProcessedEvent[];
}

export default function Schedule({ events }: ScheduleProps) {
    return (
        <Scheduler
            view="month"
            locale={vi}
            events={events}
            translations={{
                navigation: {
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày',
                    today: 'Hôm nay',
                    agenda: 'Lịch trình',
                },
                form: {
                    addTitle: 'Thêm lịch',
                    editTitle: 'Sửa lịch',
                    confirm: 'Xác nhận',
                    delete: 'Xóa',
                    cancel: 'Hủy',
                },
                event: {
                    title: 'Tiêu đề',
                    start: 'Bắt đầu',
                    end: 'Kết thúc',
                },
            }}
        />
    );
}
