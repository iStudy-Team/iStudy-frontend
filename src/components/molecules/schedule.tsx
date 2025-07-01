import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { vi } from 'date-fns/locale';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import { useState, useEffect } from 'react';

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
}

interface CalendarProps {
    events: Event[];
}

export default function Schedule({ events }: CalendarProps) {
    const eventsService = useState(() => createEventsServicePlugin())[0];

    const calendar = useCalendarApp({
        views: [
            createViewMonthGrid(),
            createViewMonthAgenda(),
            createViewWeek(),
            createViewDay(),
        ],
        events, // sử dụng props
        plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
        defaultView: 'monthGrid',
    });

    return <ScheduleXCalendar calendarApp={calendar} />;
}
