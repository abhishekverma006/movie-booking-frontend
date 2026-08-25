import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/api/authApi";
import { useAppDispatch } from "@/app/hooks";
import { clearCredentials } from "@/features/auth/authSlice";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
    } catch {
      // Even if the server request fails,
      // clear the local authentication state.
    } finally {
      dispatch(clearCredentials());

      navigate("/auth/login", {
        replace: true,
      });

      setIsLoggingOut(false);
    }
  };

  return (
    <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};
