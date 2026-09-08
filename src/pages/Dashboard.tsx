import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Placeholder for future backend integration (token/session clearing).
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#3452FF" />
            <path
              d="M9 21l7-12 7 12"
              stroke="white"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-base font-semibold text-ink">
            LoginUser
          </span>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleLogout}
          className="w-auto px-3.5 py-2"
        >
          <LogOut size={16} aria-hidden="true" />
          Log out
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <ShieldCheck size={26} aria-hidden="true" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Welcome
          </h1>
          <p className="mt-2 text-base text-muted">Authentication system</p>
          <p className="mt-6 text-sm text-muted">You are logged in.</p>
        </div>
      </main>
    </div>
  );
}
