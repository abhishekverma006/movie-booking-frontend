import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register as registerUser } from "@/features/auth/api/authApi";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/validation/authSchemas";
import { normalizeApiError } from "@/services/api/errors";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
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
    try {
      await registerUser(data);

      navigate("/auth/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please login.",
        },
      });
    } catch (error) {
      const apiError = normalizeApiError(error);

      setError("root", {
        message: apiError.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {errors.root && <p role="alert">{errors.root.message}</p>}

      <div>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
        />

        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

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
          autoComplete="new-password"
          {...register("password")}
        />

        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};
