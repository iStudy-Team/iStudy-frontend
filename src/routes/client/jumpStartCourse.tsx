import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import JumpStartLayout from '@/layout/jumpStart';

const _jumpstartRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'client/tieng-anh-mam-non-3-6-tuoi',
    component: () => <JumpStartLayout />,
});

export const jumpstartRoute = _jumpstartRoute.addChildren([
    createRoute({
        getParentRoute: () => _jumpstartRoute,
        path: '/tieng-anh-mam-non-3-6-tuoi',
        component: () => <div className="p-2"></div>,
    }),
]);
