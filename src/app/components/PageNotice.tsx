import { type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

type PageNoticeVariant = "info" | "success" | "warning" | "error";

type PageNoticeProps = {
  variant?: PageNoticeVariant;
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

const noticeStyles: Record<PageNoticeVariant, string> = {
  info: "border-edtech-sky/40 bg-edtech-sky/10",
  success: "border-edtech-mint/50 bg-edtech-mint/15",
  warning: "border-edtech-amber/55 bg-edtech-amber/15",
  error: "border-category-argumentativo/45 bg-category-argumentativo/10",
};

const iconStyles: Record<PageNoticeVariant, string> = {
  info: "text-edtech-primary",
  success: "text-edtech-mint",
  warning: "text-edtech-primary",
  error: "text-category-argumentativo",
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export function PageNotice({ variant = "info", title, children, action }: PageNoticeProps) {
  const Icon = icons[variant];

  return (
    <div className={`rounded-lg border p-4 text-sm leading-6 text-edtech-text ${noticeStyles[variant]}`} role="status">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconStyles[variant]}`} aria-hidden="true" />
          <div>
            <p className="font-semibold text-edtech-text">{title}</p>
            <div className="mt-1 text-edtech-muted">{children}</div>
          </div>
        </div>
        {action ? <div className="shrink-0 sm:pl-4">{action}</div> : null}
      </div>
    </div>
  );
}
