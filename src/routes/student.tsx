import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import NotificationCenter from '@/pages/teacher/notificationCenter';
import StudentDashboard from '@/pages/student/studentDashboard';
import StudentLayout from '@/layout/student';
import RollCallStudent from '@/pages/student/rollCallStudent';
import StudentSchedule from '@/pages/student/scheduleStudent';

const _studentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/student',
    component: () => <StudentLayout />,
});

export const studentRoute = _studentRoute.addChildren([
    createRoute({
        getParentRoute: () => _studentRoute,
        path: '/',
        component: () => <StudentDashboard />,
    }),
    createRoute({
        getParentRoute: () => _studentRoute,
        path: '/schedule',
        component: () => <StudentSchedule />,
    }),
    createRoute({
        getParentRoute: () => _studentRoute,
        path: '/rollcall',
        component: () => <RollCallStudent />,
    }),
]);
