import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  LogOut,
  Mail,
  Trophy,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../auth";
import { COURSE_MODULES, getCourseProgress, getModuleAccess, getModuleProgress, getNextAvailableModule } from "../data/module-catalog";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const displayName = user?.displayName ?? user?.email.split("@")[0] ?? "Aluno";
  const email = user?.email ?? "E-mail não informado";
  const courseProgress = getCourseProgress(user?.progress);
  const nextModule = getNextAvailableModule(user?.progress);
  const lastVisitedModule = COURSE_MODULES.find((module) => module.path === user?.lastVisited);

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
          <button type="button" onClick={() => navigate("/home")} aria-label="Voltar para a trilha de estudos" className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-edtech-primary text-white shadow-sm">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-edtech-muted">TextLab</p>
              <p className="text-base font-semibold text-edtech-text">Dashboard do aluno</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Módulos
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
        <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-[0_16px_38px_rgba(31,41,55,0.06)]" aria-labelledby="student-profile-title">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-edtech-primary text-white shadow-sm">
                <UserCircle className="h-9 w-9" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">Área do aluno</p>
                <h1 id="student-profile-title" className="mt-1 text-3xl font-semibold leading-tight text-edtech-text">{displayName}</h1>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-edtech-muted">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {email}
                </p>
              </div>
            </div>

            {nextModule ? (
              <button
                type="button"
                onClick={() => navigate(nextModule.path)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-edtech-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky"
              >
                Continuar em {nextModule.title}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-edtech-mint/20 px-4 py-3 text-sm font-semibold text-edtech-text">
                <Trophy className="h-4 w-4 text-edtech-mint" aria-hidden="true" />
                Curso concluído
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]" aria-labelledby="student-progress-title">
          <div className="rounded-2xl border border-edtech-primary/20 bg-gradient-to-br from-edtech-primary to-edtech-sky p-6 text-white shadow-[0_18px_46px_rgba(59,76,202,0.2)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">Progresso geral</p>
                <h2 id="student-progress-title" className="mt-3 text-5xl font-semibold">{courseProgress.percent}%</h2>
              </div>
              <Trophy className="h-10 w-10 text-edtech-mint" aria-hidden="true" />
            </div>
            <div
              className="mt-6 h-2 rounded-full bg-white/20"
              role="progressbar"
              aria-label="Progresso geral do curso"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={courseProgress.percent}
            >
              <div className="h-2 rounded-full bg-edtech-mint" style={{ width: `${courseProgress.percent}%` }} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm text-white/70">Tópicos concluídos</p>
                <p className="mt-2 text-2xl font-semibold">{courseProgress.completedTopics}/{courseProgress.totalTopics}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm text-white/70">Módulos iniciados</p>
                <p className="mt-2 text-2xl font-semibold">{courseProgress.startedModules}/{courseProgress.totalModules}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm text-white/70">Módulos concluídos</p>
                <p className="mt-2 text-2xl font-semibold">{courseProgress.completedModules}/{courseProgress.totalModules}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-6" aria-label="Histórico do aluno">
            <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-edtech-primary" aria-hidden="true" />
                <h2 className="text-base font-semibold text-edtech-text">Histórico</h2>
              </div>

              {user?.lastVisited ? (
                <button
                  type="button"
                  onClick={() => navigate(user.lastVisited ?? "/home")}
                  aria-label={`Ir para a última página acessada: ${user.lastVisited}`}
                  className="mt-5 flex w-full items-center justify-between gap-4 border-t border-edtech-border pt-4 text-left text-sm"
                >
                  <span>
                    <span className="block font-medium text-edtech-text">Última página acessada</span>
                    <span className="mt-1 block text-edtech-muted">{lastVisitedModule?.title ?? user.lastVisited}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-edtech-primary" aria-hidden="true" />
                </button>
              ) : (
                <p className="mt-5 border-t border-edtech-border pt-4 text-sm leading-6 text-edtech-muted">
                  Seu histórico aparecerá aqui depois do primeiro módulo acessado.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-5 shadow-sm">
              <h2 className="text-base font-semibold text-edtech-text">Sequência da trilha</h2>
              <p className="mt-2 text-sm leading-6 text-edtech-muted">
                Cada módulo libera o próximo quando todos os tópicos forem concluídos.
              </p>
            </section>
          </aside>
        </section>

        <section className="mt-6 rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-sm" aria-labelledby="module-summary-title">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="module-summary-title" className="text-xl font-semibold text-edtech-text">Resumo por módulo</h2>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="inline-flex items-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text transition hover:border-edtech-sky hover:bg-edtech-sky/10"
            >
              Ver trilha
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {COURSE_MODULES.map((module) => {
              const progress = getModuleProgress(user?.progress, module.key);
              const access = getModuleAccess(user?.progress, module.key);
              const Icon = access.isLocked ? LockKeyhole : progress.isComplete ? CheckCircle2 : module.icon;
              const statusLabel = access.isLocked ? "Bloqueado" : progress.isComplete ? "Concluído" : progress.completed > 0 ? "Em andamento" : "Disponível";

              return (
                <div key={module.key} className={`rounded-2xl border ${access.isLocked ? "border-edtech-border" : module.borderClass} bg-white p-5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${access.isLocked ? "bg-edtech-bg text-edtech-muted" : module.softClass}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${access.isLocked ? "bg-edtech-bg text-edtech-muted" : progress.isComplete ? "bg-edtech-mint/20 text-edtech-text" : "bg-edtech-sky/15 text-edtech-primary"}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-edtech-text">Módulo {module.number}: {module.title}</h3>
                  <p className="mt-2 text-sm text-edtech-muted">
                    {access.isLocked && access.requiredModule ? `Libera após concluir ${access.requiredModule.title}.` : `${progress.completed} de ${progress.total} tópicos concluídos.`}
                  </p>
                  <div
                    className="mt-4 h-2 rounded-full bg-edtech-bg"
                    role="progressbar"
                    aria-label={`Progresso em ${module.title}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress.percent}
                  >
                    <div className={`h-2 rounded-full ${access.isLocked ? "bg-edtech-muted/40" : module.accentClass}`} style={{ width: `${progress.percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
