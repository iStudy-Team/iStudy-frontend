import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root.tsx";
import ClientLayout from "@/layout/client";

const _clientRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'client',
  component: () => <ClientLayout />,
});

export const clientRoute = _clientRoute.addChildren([
    createRoute({
        getParentRoute: () => _clientRoute,
        path: '/',
        component: () => <div className="p-2"><h3>Hẹ hẹ hẹ</h3></div>,
    })
]);
