import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/features/auth/api/authApi";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/validation/authSchemas";

import { normalizeApiError } from "@/services/api/errors";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);

    try {
      const response = await login(data);

      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );

      navigate("/dashboard", {
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
      className="w-full space-y-6"
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
          {...register("email")}
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
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
            className={`w-full rounded-lg border px-4 py-3 pr-20 text-sm outline-none transition focus:ring-2 ${
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

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};
