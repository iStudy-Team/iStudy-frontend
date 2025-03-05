import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRoute,
} from "@tanstack/react-router";
import { clientRoute } from "@/routes/client";
import { rootRoute } from "@/routes/__root.tsx";

const redirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    window.location.href = "/client/";
    return null;
  },
});

const routeTree = rootRoute.addChildren([clientRoute, redirectRoute]);

declare module "@tanstack/react-router" {
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

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
