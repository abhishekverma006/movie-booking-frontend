import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ProtectedRoute } from "@/app/routes/ProtectedRoute";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

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
]);

export default router;
