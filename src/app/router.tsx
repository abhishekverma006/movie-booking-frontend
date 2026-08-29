import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ProtectedRoute } from "@/app/routes/ProtectedRoute";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { MovieListPage } from "@/features/movies/pages/MovieListPage";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <div>
            <h1>Dashboard</h1>

            <LogoutButton />
          </div>
        ),
      },
    ],
  },
  {
    path: "/movies",
    element: <MovieListPage />,
  },
]);

export default router;
