import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import NotificationCenter from '@/pages/teacher/notificationCenter';
import StudentDashboard from '@/pages/student/studentDashboard';
import StudentLayout from '@/layout/student';
import RollCallStudent from '@/pages/student/rollCallStudent';
import StudentSchedule from '@/pages/student/scheduleStudent';
import ErnollmentClass from '@/pages/student/enrollmentClass';
import ManageProfile from '@/components/manageProfile';

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
        path: '/profile',
        component: () => <ManageProfile />, // Changed from ProfileAdmin to ManageProfile
    }),
    createRoute({
        getParentRoute: () => _studentRoute,
        path: '/rollcall',
        component: () => <RollCallStudent />,
    }),
    createRoute({
        getParentRoute: () => _studentRoute,
        path: '/erollment-class',
        component: () => <ErnollmentClass />,
    }),
]);
