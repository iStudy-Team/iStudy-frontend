import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import AdminLayout from '@/layout/admin';
import ProfileAdmin from '@/pages/admin/adminProfile';
import ClassManagementAdmin from '@/pages/admin/classManagement';
import AdminDashboard from '@/pages/admin/dashboardAdmin';
import ParentManagement from '@/pages/admin/parentManagement';
import StudentManagement from '@/pages/admin/studentManagement';
import FeeManage from '@/pages/admin/feeManage';
import BankAccountViewer from '@/pages/admin/bankAccount';
import CourseGradeManagement from '@/pages/admin/academicManagement';

const _admintRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: () => <AdminLayout />,
});

export const admintRoute = _admintRoute.addChildren([
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/',
        component: () => <AdminDashboard />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/class-management',
        component: () => <ClassManagementAdmin />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/academic-management',
        component: () => <CourseGradeManagement />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/parent-management',
        component: () => <ParentManagement />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/student-management',
        component: () => <StudentManagement />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/teacher-management',
        component: () => <StudentManagement />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/fee-management',
        component: () => <FeeManage />,
    }),
    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/bank-account',
        component: () => <BankAccountViewer />,
    }),

    createRoute({
        getParentRoute: () => _admintRoute,
        path: '/profile',
        component: () => <ProfileAdmin />,
    }),
]);
