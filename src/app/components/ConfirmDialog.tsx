import { useEffect, useId } from "react";
import { AlertTriangle, X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-edtech-text/40 px-4 py-6 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-md rounded-lg border border-edtech-border bg-white p-5 shadow-[0_24px_70px_rgba(31,41,55,0.22)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-edtech-amber/20 text-edtech-text">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id={titleId} className="text-lg font-semibold leading-tight text-edtech-text">
                {title}
              </h2>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-edtech-muted">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fechar janela de confirmação"
            className="rounded-lg p-2 text-edtech-muted transition hover:bg-edtech-bg hover:text-edtech-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg border border-edtech-border bg-white px-4 py-2.5 text-sm font-semibold text-edtech-text transition hover:border-edtech-sky hover:bg-edtech-sky/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            aria-busy={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-edtech-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Saindo..." : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
