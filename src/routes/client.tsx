import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import ClientLayout from '@/layout/client';
import HomePage from '@/pages/home';
import JumpStartPage from '@/pages/jumpStart';
import SmartTeenPage from '@/pages/smartTeen';
import BusinessCoursePage from '@/pages/businessCourse';
import IeltsCourseCoursePage from '@/pages/ieltsCourse';

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
        component: () => <JumpStartPage />,
    }),
    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/tieng-anh-trung-hoc-11-16-tuoi',
        component: () => <SmartTeenPage />,
    }),
    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/tieng-anh-chuyen-nganh-cho-nguoi-di-lam',
        component: () => <BusinessCoursePage />,
    }),

    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/chuong-trinh-luyen-thi-ielts-sat',
        component: () => <IeltsCourseCoursePage />,
    }),
]);
