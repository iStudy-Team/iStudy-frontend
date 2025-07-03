import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import TeacherLayout from '@/layout/teacher';
import TeacherDashboard from '@/pages/teacher/teacherDashboard';
import RollCall from '@/pages/teacher/rollcall';
import ClassRollCall from '@/pages/teacher/classRollCall';
import TeacherSchedule from '@/pages/teacher/scheduleTeacher';
import NotificationCenter from '@/pages/teacher/notificationCenter';

const _teacherRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/teacher',
    component: () => <TeacherLayout />,
});

export const teacherRoute = _teacherRoute.addChildren([
    createRoute({
        getParentRoute: () => _teacherRoute,
        path: '/',
        component: () => <TeacherDashboard />,
    }),
    createRoute({
        getParentRoute: () => _teacherRoute,
        path: '/notification-center',
        component: () => <NotificationCenter />,
    }),
    createRoute({
        getParentRoute: () => _teacherRoute,
        path: '/rollcall',
        component: () => <RollCall />,
    }),
    createRoute({
        getParentRoute: () => _teacherRoute,
        path: '/rollcall/$classId',
        component: () => <ClassRollCall />,
    }),
    createRoute({
        getParentRoute: () => _teacherRoute,
        path: '/schedule',
        component: () => <TeacherSchedule />,
    }),
]);
