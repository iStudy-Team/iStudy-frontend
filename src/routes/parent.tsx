import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import ParentLayout from '@/layout/parent';
import FeeParent from '@/pages/parent/fee';
import StudentDashboard from '@/pages/student/studentDashboard';
import StudentSchedule from '@/pages/student/scheduleStudent';

const _parentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/parent',
    component: () => <ParentLayout />,
});

export const parentRoute = _parentRoute.addChildren([
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/',
        component: () => <StudentDashboard />,
    }),
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/fee',
        component: () => <FeeParent />,
    }),
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/child-schedule',
        component: () => <StudentSchedule />,
    }),
]);
