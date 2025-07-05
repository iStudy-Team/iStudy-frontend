import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import ParentLayout from '@/layout/parent';
import FeeParent from '@/pages/parent/fee';
import ManageProfile from '@/components/manageProfile';
import ParentDashboard from '@/pages/parent/parentDashboard';

const _parentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/parent',
    component: () => <ParentLayout />,
});

export const parentRoute = _parentRoute.addChildren([
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/',
        component: () => <ParentDashboard />,
    }),
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/fee',
        component: () => <FeeParent />,
    }),
    createRoute({
        getParentRoute: () => _parentRoute,
        path: '/profile',
        component: () => <ManageProfile />, // Changed from ProfileAdmin to ManageProfile
    }),
]);
