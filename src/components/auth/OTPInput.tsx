import {
  ClipboardEvent,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useId,
} from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
  error,
  disabled = false,
}: OTPInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const groupId = useId();
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digit = raw.replace(/\D/g, "").slice(-1);

    if (!digit) {
      setDigit(index, "");
      return;
    }

    setDigit(index, digit);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigit(index, "");
        return;
      }
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    onChange(pasted.padEnd(length, "").slice(0, length));

    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div
        role="group"
        aria-label="6-digit verification code"
        className="flex justify-between gap-2 sm:gap-3"
      >
        {digits.map((digit, index) => (
          <input
            key={`${groupId}-${index}`}
            ref={(el) => (inputsRef.current[index] = el)}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            pattern="\d*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={Boolean(error)}
            className={`h-12 w-11 flex-1 rounded-md border bg-surface text-center text-lg font-semibold text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-bg disabled:text-muted sm:h-14 sm:w-14 ${
              error
                ? "border-danger focus-visible:ring-danger/20"
                : "border-border focus-visible:border-primary"
            }`}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
