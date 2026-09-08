import { ReactNode } from "react";

interface AuthLayoutProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const brandCopy = {
  headline: "Built for teams who move fast.",
  body: "LoginUser keeps every login, invite, and permission in one place — so your team spends less time managing access and more time shipping.",
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Branding panel */}
      <div className="relative flex shrink-0 items-center overflow-hidden bg-primary px-6 py-10 lg:w-[42%] lg:px-14 lg:py-0">
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-20 lg:h-[28rem] lg:w-[28rem]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="99" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="41" stroke="white" strokeWidth="1" fill="none" />
        </svg>

        <div className="relative w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:mb-16">
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="white" />
              <path
                d="M9 21l7-12 7 12"
                stroke="#3452FF"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-lg font-semibold text-white">
              LoginUser
            </span>
          </div>

          <h1 className="font-display text-2xl font-semibold leading-snug text-white lg:text-3xl">
            {brandCopy.headline}
          </h1>
          <p className="mt-4 hidden text-sm leading-relaxed text-white/75 lg:block">
            {brandCopy.body}
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold text-ink">{title}</h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
          )}
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-7">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
