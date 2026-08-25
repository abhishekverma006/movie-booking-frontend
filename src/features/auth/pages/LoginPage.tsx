import { useLocation } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";

interface LocationState {
  message?: string;
}

export const LoginPage = () => {
  const location = useLocation();

  const state = location.state as LocationState | null;

  return (
    <main>
      <section>
        <header>
          <h1>Login</h1>
          <p>Login to your account to continue.</p>
        </header>

        {state?.message && (
          <div role="status" aria-live="polite">
            {state.message}
          </div>
        )}

        <LoginForm />
      </section>
    </main>
  );
};
