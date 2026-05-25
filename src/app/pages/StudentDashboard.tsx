import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  LogOut,
  Mail,
  Trophy,
  UserCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../auth";
import { COURSE_MODULES, getCourseProgress, getModuleAccess, getModuleProgress, getNextAvailableModule } from "../data/module-catalog";
import type { ExerciseAttempt } from "../types/auth";

type PerformanceGroup = {
  id: string;
  label: string;
  moduleTitle?: string;
  total: number;
  correct: number;
  wrong: number;
  percent: number;
};

function getModuleTitle(moduleId: string) {
  return COURSE_MODULES.find((module) => module.key === moduleId)?.title ?? moduleId;
}

function summarizePerformanceGroup(group: Omit<PerformanceGroup, "percent">): PerformanceGroup {
  return {
    ...group,
    percent: group.total ? Math.round((group.correct / group.total) * 100) : 0,
  };
}

function getLatestExerciseAttempts(attempts: ExerciseAttempt[]) {
  const latestByExercise = new Map<string, ExerciseAttempt>();

  [...attempts]
    .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
    .forEach((attempt) => {
      if (!latestByExercise.has(attempt.exerciseId)) {
        latestByExercise.set(attempt.exerciseId, attempt);
      }
    });

  return Array.from(latestByExercise.values());
}

function getExerciseAnalytics(attempts: ExerciseAttempt[]) {
  const latestAttempts = getLatestExerciseAttempts(attempts);
  const moduleGroups = new Map<string, Omit<PerformanceGroup, "percent">>();
  const topicGroups = new Map<string, Omit<PerformanceGroup, "percent">>();

  latestAttempts.forEach((attempt) => {
    const moduleGroup = moduleGroups.get(attempt.moduleId) ?? {
      id: attempt.moduleId,
      label: getModuleTitle(attempt.moduleId),
      total: 0,
      correct: 0,
      wrong: 0,
    };
    moduleGroup.total += 1;
    moduleGroup.correct += attempt.isCorrect ? 1 : 0;
    moduleGroup.wrong += attempt.isCorrect ? 0 : 1;
    moduleGroups.set(attempt.moduleId, moduleGroup);

    const topicKey = `${attempt.moduleId}:${attempt.topicId}`;
    const topicGroup = topicGroups.get(topicKey) ?? {
      id: topicKey,
      label: attempt.topicName,
      moduleTitle: getModuleTitle(attempt.moduleId),
      total: 0,
      correct: 0,
      wrong: 0,
    };
    topicGroup.total += 1;
    topicGroup.correct += attempt.isCorrect ? 1 : 0;
    topicGroup.wrong += attempt.isCorrect ? 0 : 1;
    topicGroups.set(topicKey, topicGroup);
  });

  const byModule = Array.from(moduleGroups.values()).map(summarizePerformanceGroup);
  const byTopic = Array.from(topicGroups.values()).map(summarizePerformanceGroup);
  const latestCorrect = latestAttempts.filter((attempt) => attempt.isCorrect).length;
  const latestWrong = latestAttempts.length - latestCorrect;
  const totalCorrectAttempts = attempts.filter((attempt) => attempt.isCorrect).length;
  const recentMistakes = [...attempts]
    .filter((attempt) => !attempt.isCorrect)
    .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
    .slice(0, 5);

  const sortedTopics = [...byTopic].sort((a, b) => b.percent - a.percent || b.total - a.total);
  const topicsWithAnswers = byTopic.filter((topic) => topic.total > 0);

  return {
    accuracy: latestAttempts.length ? Math.round((latestCorrect / latestAttempts.length) * 100) : 0,
    bestModule: [...byModule].sort((a, b) => b.percent - a.percent || b.total - a.total)[0],
    bestTopic: sortedTopics[0],
    byModule,
    byTopic: [...byTopic].sort((a, b) => a.percent - b.percent || b.wrong - a.wrong),
    latestCorrect,
    latestWrong,
    recentMistakes,
    totalAttempts: attempts.length,
    totalCorrectAttempts,
    totalWrongAttempts: attempts.length - totalCorrectAttempts,
    uniqueExercises: latestAttempts.length,
    worstModule: [...byModule].sort((a, b) => a.percent - b.percent || b.wrong - a.wrong)[0],
    worstTopic: topicsWithAnswers.sort((a, b) => a.percent - b.percent || b.wrong - a.wrong)[0],
  };
}

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
  const exerciseAnalytics = useMemo(
    () => getExerciseAnalytics(user?.exerciseAttempts ?? []),
    [user?.exerciseAttempts]
  );

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

        <section className="mt-6 rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-sm" aria-labelledby="exercise-analytics-title">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">Avaliação dos exercícios</p>
              <h2 id="exercise-analytics-title" className="mt-2 text-xl font-semibold text-edtech-text">Desempenho por questão, módulo e tópico</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-edtech-muted">
                Os indicadores consideram a resposta mais recente de cada questão para mostrar o desempenho atual do aluno.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-edtech-bg px-3 py-2 text-sm font-semibold text-edtech-muted">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              {exerciseAnalytics.totalAttempts} tentativas registradas
            </div>
          </div>

          {exerciseAnalytics.uniqueExercises === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-edtech-border bg-edtech-bg p-6 text-sm leading-6 text-edtech-muted">
              As estatísticas aparecerão aqui depois que o aluno responder os exercícios. Se esta área continuar vazia após responder questões, execute o SQL atualizado de configuração do banco.
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-edtech-border bg-white p-4">
                  <p className="text-sm text-edtech-muted">Questões avaliadas</p>
                  <p className="mt-2 text-2xl font-semibold text-edtech-text">{exerciseAnalytics.uniqueExercises}</p>
                </div>
                <div className="rounded-2xl border border-edtech-mint/40 bg-edtech-mint/15 p-4">
                  <p className="text-sm text-edtech-muted">Acertos atuais</p>
                  <p className="mt-2 text-2xl font-semibold text-edtech-text">{exerciseAnalytics.latestCorrect}</p>
                </div>
                <div className="rounded-2xl border border-category-argumentativo/40 bg-category-argumentativo/10 p-4">
                  <p className="text-sm text-edtech-muted">Questões com erro</p>
                  <p className="mt-2 text-2xl font-semibold text-edtech-text">{exerciseAnalytics.latestWrong}</p>
                </div>
                <div className="rounded-2xl border border-edtech-sky/40 bg-edtech-sky/10 p-4">
                  <p className="text-sm text-edtech-muted">Aproveitamento</p>
                  <p className="mt-2 text-2xl font-semibold text-edtech-text">{exerciseAnalytics.accuracy}%</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-edtech-border bg-white p-5">
                  <h3 className="text-base font-semibold text-edtech-text">Melhor e pior desempenho</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-edtech-mint/15 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-edtech-muted">Melhor tópico</p>
                      <p className="mt-2 font-semibold text-edtech-text">{exerciseAnalytics.bestTopic?.label ?? "Sem dados"}</p>
                      <p className="mt-1 text-sm text-edtech-muted">{exerciseAnalytics.bestTopic?.moduleTitle ?? ""}</p>
                      <p className="mt-3 text-lg font-semibold text-edtech-text">{exerciseAnalytics.bestTopic?.percent ?? 0}%</p>
                    </div>
                    <div className="rounded-xl bg-category-argumentativo/10 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-edtech-muted">Precisa reforçar</p>
                      <p className="mt-2 font-semibold text-edtech-text">{exerciseAnalytics.worstTopic?.label ?? "Sem dados"}</p>
                      <p className="mt-1 text-sm text-edtech-muted">{exerciseAnalytics.worstTopic?.moduleTitle ?? ""}</p>
                      <p className="mt-3 text-lg font-semibold text-edtech-text">{exerciseAnalytics.worstTopic?.percent ?? 0}%</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-edtech-border bg-white p-5">
                  <h3 className="text-base font-semibold text-edtech-text">Questões para revisar</h3>
                  {exerciseAnalytics.recentMistakes.length ? (
                    <div className="mt-4 space-y-3">
                      {exerciseAnalytics.recentMistakes.map((attempt) => (
                        <div key={attempt.id} className="rounded-xl border border-category-argumentativo/25 bg-category-argumentativo/5 p-3">
                          <div className="flex items-start gap-2">
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-category-argumentativo" aria-hidden="true" />
                            <div>
                              <p className="text-sm font-semibold text-edtech-text">{attempt.exerciseTitle}</p>
                              <p className="mt-1 text-xs text-edtech-muted">{getModuleTitle(attempt.moduleId)} · {attempt.topicName}</p>
                              <p className="mt-2 text-xs leading-5 text-edtech-muted">
                                Marcou: <strong>{attempt.selectedOption}</strong>. Correta: <strong>{attempt.correctOption}</strong>.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 rounded-xl bg-edtech-mint/15 p-4 text-sm leading-6 text-edtech-text">
                      Nenhum erro registrado nas respostas atuais.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-edtech-border bg-white p-5">
                  <h3 className="text-base font-semibold text-edtech-text">Desempenho por módulo</h3>
                  <div className="mt-4 space-y-4">
                    {exerciseAnalytics.byModule.map((module) => (
                      <div key={module.id}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="font-medium text-edtech-text">{module.label}</span>
                          <span className="text-edtech-muted">{module.correct}/{module.total} · {module.percent}%</span>
                        </div>
                        <div
                          className="h-2 rounded-full bg-edtech-bg"
                          role="progressbar"
                          aria-label={`Desempenho em ${module.label}`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={module.percent}
                        >
                          <div className="h-2 rounded-full bg-edtech-primary" style={{ width: `${module.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-edtech-border bg-white p-5">
                  <h3 className="text-base font-semibold text-edtech-text">Tópicos com menor aproveitamento</h3>
                  <div className="mt-4 space-y-3">
                    {exerciseAnalytics.byTopic.slice(0, 5).map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between gap-4 rounded-xl bg-edtech-bg p-3">
                        <div>
                          <p className="text-sm font-semibold text-edtech-text">{topic.label}</p>
                          <p className="mt-1 text-xs text-edtech-muted">{topic.moduleTitle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-edtech-text">{topic.percent}%</p>
                          <p className="text-xs text-edtech-muted">{topic.wrong} erros</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
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
