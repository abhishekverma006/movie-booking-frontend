import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { register } from "@/features/auth/api/authApi";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/validation/authSchemas";

import { normalizeApiError } from "@/services/api/errors";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null);

    try {
      await register(data);

      navigate("/auth/login", {
        replace: true,
      });
    } catch (error) {
      const normalizedError = normalizeApiError(error);

      setApiError(normalizedError.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-5"
    >
      {/* API Error */}
      {apiError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {apiError}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...registerField("name")}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
          }`}
        />

        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...registerField("email")}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
          }`}
        />

        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...registerField("password")}
            className={`w-full rounded-lg border px-4 py-3 pr-16 text-sm outline-none transition focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-gray-900"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p id="password-error" role="alert" className="text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm your password"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
            {...registerField("confirmPassword")}
            className={`w-full rounded-lg border px-4 py-3 pr-16 text-sm outline-none transition focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-gray-900"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.confirmPassword && (
          <p
            id="confirm-password-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      {/* Login */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-gray-900 underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
