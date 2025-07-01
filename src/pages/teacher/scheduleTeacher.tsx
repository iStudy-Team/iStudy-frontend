import Schedule from '@/components/molecules/schedule';

const schedule = [
    {
        id: '1',
        title: 'Event 1',
        start: '2025-12-16 03:00',
        end: '2025-12-16 05:00',
    },
    {
        id: '2',
        title: 'Event 2',
        start: '2025-12-16 07:00',
        end: '2025-12-16 09:00',
    },
];

export default function TeacherSchedule() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <Schedule events={schedule} />
        </div>
    );
}
