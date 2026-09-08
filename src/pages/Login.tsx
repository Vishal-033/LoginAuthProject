import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../schemas/loginSchema";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";
import GoogleButton from "../components/auth/GoogleButton";

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (_data: LoginSchema) => {
    setIsSubmitting(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const handleGoogleSignIn = () => {
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
      footer={
        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Signing in..."
          className="mt-1"
        >
          Sign in
        </Button>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton onClick={handleGoogleSignIn} />
      </form>
    </AuthLayout>
  );
}
