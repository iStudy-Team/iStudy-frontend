import Schedule from '@/components/molecules/schedule';

const schedule = [
    {
        id: '1',
        title: 'Event 1',
        start: '2025-12-16',
        end: '2025-12-16',
    },
];

export default function StudentSchedule() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <Schedule events={schedule} />
        </div>
    );
}
