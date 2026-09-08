import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../schemas/registerSchema";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";
import GoogleButton from "../components/auth/GoogleButton";

export default function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (_data: RegisterSchema) => {
    setIsSubmitting(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    navigate("/verify-otp");
  };

  const handleGoogleSignUp = () => {
    navigate("/verify-otp");
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing access for your team in minutes."
      footer={
        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Sign in
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
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Cooper"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Creating account..."
          className="mt-1"
        >
          Create account
        </Button>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton label="Sign up with Google" onClick={handleGoogleSignUp} />
      </form>
    </AuthLayout>
  );
}
