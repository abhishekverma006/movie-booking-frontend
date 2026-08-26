import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

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

      navigate("/dashboard");
    } catch (error) {
      const normalizedError = normalizeApiError(error);

      setApiError(normalizedError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {apiError && <p role="alert">{apiError}</p>}

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />

        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
