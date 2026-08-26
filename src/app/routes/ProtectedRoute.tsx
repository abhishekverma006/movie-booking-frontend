import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

export const ProtectedRoute = () => {
  const location = useLocation();

  const { status } = useAppSelector((state) => state.auth);

  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
};
