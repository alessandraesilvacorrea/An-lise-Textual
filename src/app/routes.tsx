import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router";
import Login from "./pages/Login";
import { useAuth } from "./auth";

const Home = lazy(() => import("./pages/Home"));
const Module1 = lazy(() => import("./pages/Module1"));
const Module2 = lazy(() => import("./pages/Module2"));
const Module3 = lazy(() => import("./pages/Module3"));
const Module4 = lazy(() => import("./pages/Module4"));

function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-edtech-bg px-4 text-center text-edtech-muted">
      Carregando...
    </div>
  );
}

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.ready) {
    return <PageLoader />;
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
      <LazyPage>
        <RequireAuth>
          <Home />
        </RequireAuth>
      </LazyPage>
    ),
  },
  {
    path: "/modulo-1",
    element: (
      <LazyPage>
        <RequireAuth>
          <Module1 />
        </RequireAuth>
      </LazyPage>
    ),
  },
  {
    path: "/modulo-2",
    element: (
      <LazyPage>
        <RequireAuth>
          <Module2 />
        </RequireAuth>
      </LazyPage>
    ),
  },
  {
    path: "/modulo-3",
    element: (
      <LazyPage>
        <RequireAuth>
          <Module3 />
        </RequireAuth>
      </LazyPage>
    ),
  },
  {
    path: "/modulo-4",
    element: (
      <LazyPage>
        <RequireAuth>
          <Module4 />
        </RequireAuth>
      </LazyPage>
    ),
  },
]);
