import { type ReactNode } from "react";
import { useNavigate } from "react-router";
import { BookOpenCheck } from "lucide-react";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function AppHeader({ title, subtitle = "TextLab", actions }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-edtech-border bg-edtech-surface/90 shadow-[0_10px_30px_rgba(31,41,55,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Ir para a página inicial do TextLab"
          className="flex min-w-0 items-center gap-3 rounded-lg text-left transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-edtech-primary text-white shadow-sm">
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-edtech-muted">{subtitle}</p>
            <p className="truncate text-base font-semibold text-edtech-text">{title}</p>
          </div>
        </button>

        {actions ? <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
