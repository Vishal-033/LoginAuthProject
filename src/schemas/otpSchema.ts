import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the complete 6-digit code")
    .regex(/^\d{6}$/, "The code must contain numbers only"),
});

export type OTPSchema = z.infer<typeof otpSchema>;
