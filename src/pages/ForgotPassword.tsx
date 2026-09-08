import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../schemas/forgotPasswordSchema";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsSubmitting(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmittedEmail(data.email);
  };

  if (submittedEmail) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a verification code to continue."
      >
        <div className="flex flex-col items-start gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
            <MailCheck size={20} aria-hidden="true" />
          </span>
          <p className="text-sm text-muted">
            If an account exists for <span className="font-medium text-ink">{submittedEmail}</span>,
            a 6-digit verification code is on its way.
          </p>
          <Link
            to="/verify-otp"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Enter verification code
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a verification code."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to login
        </Link>
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

        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Sending code..."
          className="mt-1"
        >
          Send verification code
        </Button>
      </form>
    </AuthLayout>
  );
}
