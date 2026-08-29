import { Link } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Sign in to continue booking your favourite movies."
      footer={
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};
