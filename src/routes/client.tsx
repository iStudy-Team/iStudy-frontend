import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import ClientLayout from '@/layout/client';
import HomePage from '@/pages/home';
import JumpStartPage from '@/pages/jumpStart';
import SmartTeenPage from '@/pages/smartTeen';
import BusinessCoursePage from '@/pages/businessCourse';
import IeltsCourseCoursePage from '@/pages/ieltsCourse';
import AboutPage from '@/pages/about';
import FacilityPage from '@/pages/facility';
import TeacherPage from '@/pages/teacherPage';

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

    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/about',
        component: () => <AboutPage />,
    }),

    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/co-so-vat-chat',
        component: () => <FacilityPage />,
    }),

    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/giao-vien',
        component: () => <TeacherPage />,
    }),
]);
