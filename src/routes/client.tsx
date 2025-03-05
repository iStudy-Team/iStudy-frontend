import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root.tsx";

export const clientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client",
  component: () => {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});
