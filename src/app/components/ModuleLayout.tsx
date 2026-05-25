import { type ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, Home, UserCircle } from "lucide-react";

interface ModuleLayoutProps {
  moduleNumber: number;
  moduleTitle: string;
  moduleColor: string;
  children: ReactNode;
}

export function ModuleLayout({ moduleNumber, moduleTitle, moduleColor, children }: ModuleLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-edtech-bg text-edtech-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>
      <header className="border-b border-edtech-border bg-edtech-surface/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-edtech-primary text-white shadow-sm">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-edtech-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-edtech-primary">
                    Módulo {moduleNumber}
                  </span>
                  <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${moduleColor}`} />
                </div>
                <h1 className="mt-3 text-2xl font-semibold leading-tight text-edtech-text md:text-3xl">
                  {moduleTitle}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigate("/home")}
                aria-label="Voltar para o painel de estudos"
                className="inline-flex items-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar
              </button>

              <button
                type="button"
                onClick={() => navigate("/perfil")}
                aria-label="Abrir dashboard do aluno"
                className="inline-flex items-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
              >
                <UserCircle className="h-4 w-4" aria-hidden="true" />
                Perfil
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                aria-label="Ir para o início"
                className="inline-flex items-center gap-2 rounded-xl bg-edtech-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Início
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
