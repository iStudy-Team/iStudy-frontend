import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import ClientLayout from '@/layout/client';
import HomePage from '@/pages/home';
import JumpStartLayout from '@/pages/jumpStart';

const _clientRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'client',
    component: () => <ClientLayout />,
});

export const clientRoute = _clientRoute.addChildren([
    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/',
        component: () => <HomePage />,
    }),
    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/tieng-anh-mam-non-3-6-tuoi',
        component: () => <JumpStartLayout />,
    }),
]);
