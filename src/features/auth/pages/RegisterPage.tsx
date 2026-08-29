import { Link } from "react-router-dom";

import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      description="Join MovieBook and start booking your favourite movies."
      footer={
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};
