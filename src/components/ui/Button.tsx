import { ButtonHTMLAttributes, ReactNode } from "react";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  isLoading = false,
  loadingText,
  variant = "primary",
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<string, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark",
    secondary:
      "border border-border bg-surface text-ink hover:bg-bg active:bg-bg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && <Loader size={16} />}
      <span>{isLoading && loadingText ? loadingText : children}</span>
    </button>
  );
}
