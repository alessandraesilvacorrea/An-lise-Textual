import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowRight, BookOpen, CheckCircle2, LockKeyhole, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../auth";
import { COURSE_MODULES, getModuleAccess, getModuleProgress, getNextAvailableModule } from "../data/module-catalog";

type LockedRouteState = {
  lockedModuleTitle?: string;
  requiredModuleTitle?: string;
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const lockedRouteState = location.state as LockedRouteState | null;

  useEffect(() => {
    if (isLoggingOut && !user) {
      navigate("/", { replace: true });
    }
  }, [isLoggingOut, user, navigate]);

  const handleLogout = async () => {
    if (!confirm("Tem certeza que deseja sair da sua conta?")) return;

    try {
      setIsLoggingOut(true);
      await signOut();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error", err);
      alert("Erro ao sair. Tente novamente.");
      setIsLoggingOut(false);
    }
  };

  const firstName = user?.displayName ?? user?.email.split("@")[0] ?? "Aluno";
  const nextModule = getNextAvailableModule(user?.progress);

  return (
    <div className="min-h-screen bg-edtech-bg text-edtech-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>

      <header className="border-b border-edtech-border bg-edtech-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigate("/home")} aria-label="Ir para o painel inicial" className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-edtech-primary text-white shadow-sm">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-edtech-muted">TextLab</p>
              <p className="text-base font-semibold text-edtech-text">Trilha de estudos</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/perfil")}
              aria-label="Abrir dashboard do aluno"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
            >
              <UserCircle className="h-4 w-4" aria-hidden="true" />
              Perfil
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {lockedRouteState?.lockedModuleTitle && lockedRouteState.requiredModuleTitle ? (
          <div className="mb-6 rounded-2xl border border-edtech-amber/50 bg-edtech-amber/15 p-4 text-sm leading-6 text-edtech-text" role="status">
            <div className="flex gap-3">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-edtech-primary" aria-hidden="true" />
              <p>
                <strong>{lockedRouteState.lockedModuleTitle}</strong> ainda está bloqueado. Conclua <strong>{lockedRouteState.requiredModuleTitle}</strong> para liberar o próximo módulo.
              </p>
            </div>
          </div>
        ) : null}

        <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-[0_16px_38px_rgba(31,41,55,0.06)]" aria-labelledby="home-title">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">Olá, {firstName}</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 id="home-title" className="text-3xl font-semibold leading-tight text-edtech-text md:text-4xl">
                Continue sua trilha textual
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-edtech-muted">
                Os módulos agora seguem uma sequência: conclua cada etapa para desbloquear a próxima.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/perfil")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-3 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
              >
                Ver dashboard
                <UserCircle className="h-4 w-4" aria-hidden="true" />
              </button>

              {nextModule ? (
                <button
                  type="button"
                  onClick={() => navigate(nextModule.path)}
                  aria-label={`Continuar estudos em ${nextModule.title}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-edtech-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky focus:outline-none focus:ring-2 focus:ring-edtech-sky/30"
                >
                  Continuar estudos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-6" aria-labelledby="modules-title">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id="modules-title" className="text-xl font-semibold text-edtech-text">Módulos</h2>
            <p className="text-sm text-edtech-muted">{COURSE_MODULES.length} módulos na trilha</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {COURSE_MODULES.map((module) => {
              const Icon = module.icon;
              const progress = getModuleProgress(user?.progress, module.key);
              const access = getModuleAccess(user?.progress, module.key);
              const lockHintId = `${module.key}-lock-hint`;
              const descriptionId = `${module.key}-description`;
              const progressLabelId = `${module.key}-progress-label`;
              const statusLabel = access.isLocked ? "Bloqueado" : progress.isComplete ? "Completo" : "Disponível";

              return (
                <button
                  type="button"
                  key={module.key}
                  onClick={() => navigate(module.path)}
                  disabled={access.isLocked}
                  aria-disabled={access.isLocked}
                  aria-describedby={`${descriptionId} ${progressLabelId}${access.isLocked ? ` ${lockHintId}` : ""}`}
                  aria-label={`${module.title}. ${statusLabel}. ${access.isLocked && access.requiredModule ? `Conclua ${access.requiredModule.title} para desbloquear.` : ""}`}
                  className={`group rounded-2xl border ${access.isLocked ? "border-edtech-border" : module.borderClass} bg-edtech-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-edtech-sky hover:shadow-[0_18px_38px_rgba(31,41,55,0.08)] disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0 disabled:hover:border-edtech-border disabled:hover:shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${access.isLocked ? "bg-edtech-bg text-edtech-muted" : module.softClass}`}>
                      {access.isLocked ? <LockKeyhole className="h-5 w-5" aria-hidden="true" /> : <Icon className="h-5 w-5" aria-hidden="true" />}
                    </div>

                    {progress.isComplete ? (
                      <div className="inline-flex items-center gap-1 rounded-full bg-edtech-mint/20 px-2.5 py-1 text-xs font-semibold text-edtech-text">
                        <CheckCircle2 className="h-3.5 w-3.5 text-edtech-mint" aria-hidden="true" />
                        Completo
                      </div>
                    ) : access.isLocked ? (
                      <span className="rounded-full bg-edtech-bg px-2.5 py-1 text-xs font-semibold text-edtech-muted">Bloqueado</span>
                    ) : (
                      <span className="rounded-full bg-edtech-bg px-2.5 py-1 text-xs font-semibold text-edtech-muted">
                        Módulo {module.number}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-edtech-text">{module.title}</h3>
                  <p id={descriptionId} className="mt-2 min-h-[72px] text-sm leading-6 text-edtech-muted">{module.description}</p>

                  {access.isLocked && access.requiredModule ? (
                    <p id={lockHintId} className="mt-4 rounded-xl bg-edtech-amber/15 p-3 text-sm font-medium leading-6 text-edtech-text">
                      Conclua {access.requiredModule.title} para desbloquear.
                    </p>
                  ) : null}

                  <div className="mt-5">
                    <div id={progressLabelId} className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-edtech-text">Progresso</span>
                      <span className="text-edtech-muted">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full bg-edtech-bg"
                      role="progressbar"
                      aria-label={`Progresso em ${module.title}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress.percent}
                    >
                      <div className={`h-2 rounded-full ${access.isLocked ? "bg-edtech-muted/40" : module.accentClass}`} style={{ width: `${progress.percent}%` }} />
                    </div>
                  </div>

                  <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition ${access.isLocked ? "text-edtech-muted" : "text-edtech-primary group-hover:gap-3 group-hover:text-edtech-sky"}`}>
                    {access.isLocked ? "Bloqueado" : progress.completed ? "Retomar" : "Começar"}
                    {access.isLocked ? <LockKeyhole className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
