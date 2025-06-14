import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root.tsx';
import AuthLayout from '@/layout/auth';
import LoginInterface from '@/pages/auth/login';
import RegisterLayout from '@/pages/auth/register';
import ForgotPassword from '@/pages/auth/forgot-pasword';

const _authRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'auth',
    component: () => <AuthLayout />,
});

export const authRoute = _authRoute.addChildren([
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/login',
        component: () => <LoginInterface />,
    }),
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/register',
        component: () => <RegisterLayout />,
    }),
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/forgot-password',
        component: () => <ForgotPassword />,
    }),
]);
