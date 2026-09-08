import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { otpSchema } from "../schemas/otpSchema";
import AuthLayout from "../components/auth/AuthLayout";
import OTPInput from "../components/auth/OTPInput";
import Button from "../components/ui/Button";

const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError(undefined);
  };

  const handleVerify = async () => {
    const result = otpSchema.safeParse({ otp });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid code");
      return;
    }

    setIsVerifying(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsVerifying(false);
    navigate("/reset-password");
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setIsResending(true);
    // Placeholder for future backend integration.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsResending(false);
    setOtp("");
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <AuthLayout
      title="Enter verification code"
      subtitle="We've sent a 6-digit code to your email address."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </Link>
      }
    >
      <div className="flex flex-col gap-5">
        <OTPInput value={otp} onChange={handleOtpChange} error={error} />

        <Button
          type="button"
          onClick={handleVerify}
          isLoading={isVerifying}
          loadingText="Verifying..."
        >
          Verify code
        </Button>

        <p className="text-center text-sm text-muted">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="font-medium text-primary hover:text-primary-dark disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
          >
            {isResending
              ? "Resending..."
              : cooldown > 0
                ? `Resend code in ${cooldown}s`
                : "Resend code"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
