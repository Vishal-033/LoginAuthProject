# LoginSystem — Authentication Frontend

A frontend-only, production-style authentication UI built with React, TypeScript, Vite, and Tailwind CSS.

This project implements the complete authentication *UI* — login, registration, forgot password, OTP verification,
reset password, and a placeholder dashboard — with no real backend, no JWT, and no OAuth. All submit handlers are
wired to local, simulated async behavior so the flows can be reviewed end to end before backend integration.

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router v6
- React Hook Form + Zod (`@hookform/resolvers/zod`)
- Axios (installed, ready for the future `services/` layer — not yet used)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # type-check (tsc -b) and production build
npm run preview   # preview the production build locally
npm run lint       # ESLint
```

## Project structure

```
src/
├── assets/
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # primary/secondary, loading & disabled states
│   │   ├── Input.tsx         # labeled text input with error state
│   │   └── Loader.tsx        # small spinner used inside Button
│   └── auth/
│       ├── AuthLayout.tsx    # split branding/form layout, responsive
│       ├── PasswordInput.tsx # show/hide toggle, accessible
│       ├── GoogleButton.tsx  # Google login UI only (no OAuth)
│       └── OTPInput.tsx      # 6-digit numeric OTP, paste + keyboard nav
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ForgotPassword.tsx
│   ├── VerifyOTP.tsx
│   ├── ResetPassword.tsx
│   └── Dashboard.tsx
├── routes/
│   └── AppRoutes.tsx
├── schemas/
│   ├── loginSchema.ts
│   ├── registerSchema.ts
│   ├── forgotPasswordSchema.ts
│   ├── resetPasswordSchema.ts
│   └── otpSchema.ts
├── types/
│   └── auth.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Routes

| Route              | Page              |
|---------------------|-------------------|
| `/`                 | redirects to `/login` |
| `/login`             | Login             |
| `/register`          | Register          |
| `/forgot-password`   | Forgot Password   |
| `/verify-otp`        | OTP Verification  |
| `/reset-password`    | Reset Password    |
| `/dashboard`         | Dashboard         |

Routes are not protected yet — that belongs to backend integration.

## Features implemented

- Email/password login with Zod validation, show/hide password, "Forgot password?" link, Google login UI, link to Register
- Registration with full name, email, password + confirm password, password-strength rules, Google sign-up UI
- Forgot password with email validation and a confirmation state
- 6-digit OTP input: numeric-only, auto-advances focus, backspace navigates back, full paste support, resend cooldown timer
- Reset password with strength + match validation
- Placeholder dashboard with a logout button that returns to `/login`
- Loading states on every async action (disabled + spinner + label change, e.g. "Sign in" → "Signing in...")
- Inline, accessible error messages (`role="alert"`, `aria-invalid`, `aria-describedby`)
- Fully responsive `AuthLayout` (stacked branding panel on mobile, split-screen on desktop)
- Visible focus states throughout, labeled inputs, `aria-label`s on the OTP digits and password toggle

## Manual testing checklist

**Login (`/login`)**
- [ ] Submitting with empty fields shows "Email is required" / "Password is required"
- [ ] Invalid email format shows "Please enter a valid email address"
- [ ] Valid input shows a loading state on the button, then navigates to `/dashboard`
- [ ] Password show/hide toggle works and is keyboard-accessible
- [ ] "Forgot password?" and "Create one" links navigate correctly

**Register (`/register`)**
- [ ] Full name under 2 characters is rejected
- [ ] Password missing uppercase/lowercase/number is rejected with a specific message
- [ ] Mismatched confirm password shows "Passwords do not match"
- [ ] Valid submission navigates to `/verify-otp`

**Forgot Password (`/forgot-password`)**
- [ ] Invalid/empty email is rejected
- [ ] Valid submission shows the "check your email" confirmation state
- [ ] "Back to login" link works

**Verify OTP (`/verify-otp`)**
- [ ] Only numeric characters can be entered
- [ ] Typing a digit auto-focuses the next box
- [ ] Backspace on an empty box moves focus to and clears the previous box
- [ ] Pasting a 6-digit code fills all boxes at once
- [ ] Verifying an incomplete code shows an error
- [ ] "Resend code" is disabled during the cooldown and re-enables after it elapses

**Reset Password (`/reset-password`)**
- [ ] Weak passwords are rejected with specific messages
- [ ] Mismatched confirmation is rejected
- [ ] Valid submission navigates to `/login`

**Dashboard (`/dashboard`)**
- [ ] Displays welcome copy and a logout button
- [ ] Logout navigates back to `/login`

**Responsive / accessibility (all pages)**
- [ ] No horizontal scrolling at 320px, 768px, 1024px, 1440px widths
- [ ] All inputs and buttons are comfortably tappable on mobile
- [ ] Tab order is logical; focus ring is visible on every interactive element
- [ ] Screen reader announces field labels and validation errors

## Known limitations (pre-backend)

- No real authentication: all form submissions simulate a network delay and then navigate
- Google login/sign-up buttons are UI only — no OAuth flow is wired up
- OTP verification always accepts any complete 6-digit code — there is no real code check
- Routes are not protected — visiting `/dashboard` directly works without logging in
- No token storage, refresh logic, or session persistence
- No `services/`, `context/`, or `hooks/useAuth.ts` yet — these are intentionally deferred to the backend-integration phase described in the architecture doc

ProjectLinke -https://login-auth-project-ten.vercel.app
