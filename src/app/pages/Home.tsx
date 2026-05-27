import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  LockKeyhole,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../auth";
import { AppHeader } from "../components/AppHeader";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageNotice } from "../components/PageNotice";
import {
  COURSE_MODULES,
  getCourseProgress,
  getModuleAccess,
  getModuleProgress,
  getNextAvailableModule,
} from "../data/module-catalog";

type LockedRouteState = {
  lockedModuleTitle?: string;
  requiredModuleTitle?: string;
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const lockedRouteState = location.state as LockedRouteState | null;

  useEffect(() => {
    if (isLoggingOut && !user) {
      navigate("/", { replace: true });
    }
  }, [isLoggingOut, user, navigate]);

  const handleLogout = async () => {
    try {
      setLogoutError(null);
      setIsLoggingOut(true);
      await signOut();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error", err);
      setLogoutError("Não foi possível encerrar a sessão agora. Tente novamente.");
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const firstName = user?.displayName ?? user?.email.split("@")[0] ?? "Aluno";
  const nextModule = getNextAvailableModule(user?.progress);
  const courseProgress = getCourseProgress(user?.progress);

  return (
    <div className="min-h-screen bg-edtech-bg text-edtech-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>

      <AppHeader
        title="Trilha de estudos"
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/perfil")}
              aria-label="Abrir dashboard do aluno"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 sm:px-4"
            >
              <UserCircle className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Perfil</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLogoutDialog(true)}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{isLoggingOut ? "Saindo..." : "Sair"}</span>
            </button>
          </>
        }
      />

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {lockedRouteState?.lockedModuleTitle && lockedRouteState.requiredModuleTitle ? (
          <div className="mb-5">
            <PageNotice variant="warning" title="Módulo bloqueado">
              <strong>{lockedRouteState.lockedModuleTitle}</strong> será liberado depois que você concluir{" "}
              <strong>{lockedRouteState.requiredModuleTitle}</strong>.
            </PageNotice>
          </div>
        ) : null}

        {logoutError ? (
          <div className="mb-5">
            <PageNotice variant="error" title="Não foi possível sair">
              {logoutError}
            </PageNotice>
          </div>
        ) : null}

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]" aria-labelledby="home-title">
          <div className="rounded-lg border border-edtech-primary/15 bg-white p-6 shadow-[0_16px_38px_rgba(31,41,55,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">Olá, {firstName}</p>
            <h1 id="home-title" className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-edtech-text md:text-4xl">
              Continue sua jornada de análise textual
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-edtech-muted">
              Avance módulo por módulo, pratique com exercícios e acompanhe seus resultados no dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {nextModule ? (
                <button
                  type="button"
                  onClick={() => navigate(nextModule.path)}
                  aria-label={`Continuar estudos em ${nextModule.title}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-edtech-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky focus:outline-none focus:ring-2 focus:ring-edtech-sky/30"
                >
                  Continuar estudos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => navigate("/perfil")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-edtech-border bg-white px-4 py-3 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
              >
                Ver dashboard
                <UserCircle className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <aside className="rounded-lg border border-edtech-border bg-gradient-to-br from-edtech-primary to-edtech-sky p-5 text-white shadow-[0_18px_46px_rgba(59,76,202,0.18)]" aria-label="Resumo do progresso">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/70">Progresso geral</p>
                <p className="mt-3 text-4xl font-semibold">{courseProgress.percent}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-edtech-mint" aria-hidden="true" />
            </div>
            <div
              className="mt-5 h-2 rounded-full bg-white/20"
              role="progressbar"
              aria-label="Progresso geral da trilha"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={courseProgress.percent}
            >
              <div className="h-2 rounded-full bg-edtech-mint" style={{ width: `${courseProgress.percent}%` }} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                <p className="text-xs text-white/70">Tópicos</p>
                <p className="mt-1 text-lg font-semibold">
                  {courseProgress.completedTopics}/{courseProgress.totalTopics}
                </p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                <p className="text-xs text-white/70">Módulos</p>
                <p className="mt-1 text-lg font-semibold">
                  {courseProgress.completedModules}/{courseProgress.totalModules}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-white/20 bg-white/10 p-3">
              <p className="text-xs text-white/70">Próxima etapa</p>
              <p className="mt-1 text-sm font-semibold">{nextModule?.title ?? "Trilha concluída"}</p>
            </div>
          </aside>
        </section>

        <section className="mt-7" aria-labelledby="modules-title">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-edtech-muted">Sequência de aprendizagem</p>
              <h2 id="modules-title" className="mt-1 text-xl font-semibold text-edtech-text">
                Módulos da trilha
              </h2>
            </div>
            <p className="text-sm text-edtech-muted">{COURSE_MODULES.length} módulos organizados por pré-requisito</p>
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
                  aria-label={`${module.title}. ${statusLabel}. ${
                    access.isLocked && access.requiredModule ? `Conclua ${access.requiredModule.title} para desbloquear.` : ""
                  }`}
                  className={`group rounded-lg border ${
                    access.isLocked ? "border-edtech-border" : module.borderClass
                  } bg-edtech-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-edtech-sky hover:shadow-[0_18px_38px_rgba(31,41,55,0.08)] disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0 disabled:hover:border-edtech-border disabled:hover:shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${access.isLocked ? "bg-edtech-bg text-edtech-muted" : module.softClass}`}>
                      {access.isLocked ? <LockKeyhole className="h-5 w-5" aria-hidden="true" /> : <Icon className="h-5 w-5" aria-hidden="true" />}
                    </div>

                    <div className="flex flex-col items-end gap-2">
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
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-edtech-muted">
                        <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                        {progress.total} tópicos
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-edtech-text">{module.title}</h3>
                  <p id={descriptionId} className="mt-2 min-h-[72px] text-sm leading-6 text-edtech-muted">
                    {module.description}
                  </p>

                  {access.isLocked && access.requiredModule ? (
                    <p id={lockHintId} className="mt-4 rounded-lg bg-edtech-amber/15 p-3 text-sm font-medium leading-6 text-edtech-text">
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

                  <div
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition ${
                      access.isLocked ? "text-edtech-muted" : "text-edtech-primary group-hover:gap-3 group-hover:text-edtech-sky"
                    }`}
                  >
                    {access.isLocked ? "Bloqueado" : progress.completed ? "Retomar módulo" : "Começar módulo"}
                    {access.isLocked ? <LockKeyhole className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <ConfirmDialog
        open={showLogoutDialog}
        title="Encerrar sessão?"
        description="Seu progresso já salvo continuará vinculado à sua conta. Você poderá voltar depois pelo mesmo e-mail."
        confirmLabel="Sair da conta"
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
        onClose={() => setShowLogoutDialog(false)}
      />
    </div>
  );
}
