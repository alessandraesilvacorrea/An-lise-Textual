import { createBrowserRouter, Navigate, useLocation } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Module1 from "./pages/Module1";
import Module2 from "./pages/Module2";
import Module3 from "./pages/Module3";
import Module4 from "./pages/Module4";
import { useAuth } from "./auth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.ready) {
    return null;
  }

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/modulo-1",
    element: (
      <RequireAuth>
        <Module1 />
      </RequireAuth>
    ),
  },
  {
    path: "/modulo-2",
    element: (
      <RequireAuth>
        <Module2 />
      </RequireAuth>
    ),
  },
  {
    path: "/modulo-3",
    element: (
      <RequireAuth>
        <Module3 />
      </RequireAuth>
    ),
  },
  {
    path: "/modulo-4",
    element: (
      <RequireAuth>
        <Module4 />
      </RequireAuth>
    ),
  },
]);
