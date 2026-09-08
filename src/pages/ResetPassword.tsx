import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/resetPasswordSchema";
import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (_data: ResetPasswordSchema) => {
    setIsSubmitting(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Re-enter new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <ul className="mt-1 flex flex-col gap-1 text-xs text-muted">
          <li>At least 8 characters</li>
          <li>One uppercase and one lowercase letter</li>
          <li>At least one number</li>
        </ul>

        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Resetting password..."
          className="mt-1"
        >
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}
