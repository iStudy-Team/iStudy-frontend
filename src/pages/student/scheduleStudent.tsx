import Schedule from '@/components/molecules/schedule';
import { Scheduler } from '@aldabil/react-scheduler';

const schedule = [
    {
        event_id: 1,
        title: 'TA lớp 3B',
        start: new Date('2025/6/2 09:30'),
        end: new Date('2025/6/2 10:30'),
        color: '#3f51b5',
    },
    {
        event_id: 2,
        title: 'TA lớp 4A',
        start: new Date('2025/6/4 10:00'),
        end: new Date('2025/6/4 11:00'),
        color: '#4caf50',
    },
];

export default function StudentSchedule() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <Schedule view="month" events={schedule} />
        </div>
    );
}
