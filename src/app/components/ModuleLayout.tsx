import { type ReactNode } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Home, UserCircle } from "lucide-react";
import { AppHeader } from "./AppHeader";

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>
      <AppHeader
        title={moduleTitle}
        subtitle={`Módulo ${moduleNumber}`}
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Voltar para o painel de estudos"
              className="inline-flex items-center gap-2 rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 sm:px-4"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Voltar</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/perfil")}
              aria-label="Abrir dashboard do aluno"
              className="inline-flex items-center gap-2 rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 sm:px-4"
            >
              <UserCircle className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Perfil</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Ir para o início"
              className="inline-flex items-center gap-2 rounded-lg bg-edtech-primary px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky sm:px-4"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Início</span>
            </button>
          </>
        }
      />

      <section className="border-b border-edtech-border/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-edtech-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-edtech-primary">
              Módulo {moduleNumber}
            </span>
            <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${moduleColor}`} />
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
