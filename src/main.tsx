import { StrictMode } from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { clientRoute } from '@/routes/client';
import { rootRoute } from '@/routes/__root.tsx';
import { authRoute } from './routes/auth';
import { admintRoute } from './routes/admin';
import { teacherRoute } from './routes/teacher';
import { parentRoute } from './routes/parent';
import { studentRoute } from './routes/student';

const routeTree = rootRoute.addChildren([
    clientRoute,
    authRoute,
    admintRoute,
    teacherRoute,
    parentRoute,
    studentRoute,
]);

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => (
        <div className="p-2">
            <h3>Not Found</h3>
        </div>
    ),
});

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}
