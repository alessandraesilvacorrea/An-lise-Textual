import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  LogOut,
  MessageSquare,
  Search,
} from "lucide-react";
import { useAuth } from "../auth";
import { MODULE_TOPIC_COUNTS } from "../data/modules-meta";

type ModuleKey = keyof typeof MODULE_TOPIC_COUNTS;

const modules = [
  {
    key: "module1",
    number: 1,
    title: "Tipos e Gêneros Textuais",
    description: "Compare textos narrativos, argumentativos, científicos, jornalísticos, literários e instrucionais.",
    icon: BookOpen,
    accentClass: "bg-category-narrativo",
    softClass: "bg-category-narrativo/20 text-edtech-primary",
    borderClass: "border-category-narrativo/50",
    path: "/modulo-1",
  },
  {
    key: "module2",
    number: 2,
    title: "Figuras de Linguagem",
    description: "Reconheça recursos expressivos e efeitos de sentido em textos literários e cotidianos.",
    icon: MessageSquare,
    accentClass: "bg-category-literario",
    softClass: "bg-category-literario/20 text-edtech-text",
    borderClass: "border-category-literario/50",
    path: "/modulo-2",
  },
  {
    key: "module3",
    number: 3,
    title: "Interpretação Textual",
    description: "Pratique leitura crítica, inferência, contexto, argumentação e intenção do autor.",
    icon: Search,
    accentClass: "bg-category-cientifico",
    softClass: "bg-category-cientifico/20 text-edtech-text",
    borderClass: "border-category-cientifico/50",
    path: "/modulo-3",
  },
  {
    key: "module4",
    number: 4,
    title: "Identificação de Fake News",
    description: "Verifique fontes, datas, imagens manipuladas e sinais de desinformação jornalística.",
    icon: AlertTriangle,
    accentClass: "bg-category-jornalistico",
    softClass: "bg-category-jornalistico/20 text-edtech-primary",
    borderClass: "border-category-jornalistico/50",
    path: "/modulo-4",
  },
] satisfies Array<{
  key: ModuleKey;
  number: number;
  title: string;
  description: string;
  icon: typeof BookOpen;
  accentClass: string;
  softClass: string;
  borderClass: string;
  path: string;
}>;

function getModuleProgress(progress: string[] | undefined, total: number) {
  const completed = progress?.length ?? 0;
  return {
    completed,
    percent: total ? Math.round((completed / total) * 100) : 0,
    isComplete: completed === total && total > 0,
  };
}

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut, updateLastVisited } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    void updateLastVisited("/home");
  }, [updateLastVisited]);

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
  const totalTopics = modules.reduce((sum, module) => sum + MODULE_TOPIC_COUNTS[module.key], 0);
  const totalSavedTopics = modules.reduce((sum, module) => sum + (user?.progress[module.key]?.length ?? 0), 0);
  const modulesStarted = modules.filter((module) => (user?.progress[module.key]?.length ?? 0) > 0).length;
  const coursePercent = totalTopics ? Math.round((totalSavedTopics / totalTopics) * 100) : 0;
  const nextModule = modules.find((module) => {
    const progress = getModuleProgress(user?.progress[module.key], MODULE_TOPIC_COUNTS[module.key]);
    return !progress.isComplete;
  });

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
              <p className="text-base font-semibold text-edtech-text">Painel de estudos</p>
            </div>
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
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]" aria-labelledby="dashboard-title">
          <div className="rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-[0_16px_38px_rgba(31,41,55,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">Área do aluno</p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 id="dashboard-title" className="text-3xl font-semibold leading-tight text-edtech-text md:text-4xl">Olá, {firstName}</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-edtech-muted">
                  Acompanhe seu avanço, escolha o próximo módulo e retome o conteúdo salvo na sua conta.
                </p>
              </div>

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

          <div className="rounded-2xl border border-edtech-primary/20 bg-gradient-to-br from-edtech-primary to-edtech-sky p-6 text-white shadow-[0_18px_46px_rgba(59,76,202,0.2)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">Progresso geral</p>
                <p className="mt-3 text-4xl font-semibold">{coursePercent}%</p>
              </div>
              <BarChart3 className="h-9 w-9 text-edtech-mint" aria-hidden="true" />
            </div>
            <div
              className="mt-6 h-2 rounded-full bg-white/20"
              role="progressbar"
              aria-label="Progresso geral do curso"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={coursePercent}
            >
              <div className="h-2 rounded-full bg-edtech-mint" style={{ width: `${coursePercent}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/70">Módulos iniciados</p>
                <p className="mt-1 text-lg font-semibold">{modulesStarted}/4</p>
              </div>
              <div>
                <p className="text-white/70">Tópicos concluídos</p>
                <p className="mt-1 text-lg font-semibold">
                  {totalSavedTopics}/{totalTopics}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]" aria-labelledby="modules-title">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="modules-title" className="text-xl font-semibold text-edtech-text">Módulos</h2>
              <p className="text-sm text-edtech-muted">{modules.length} módulos disponíveis</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((module) => {
                const Icon = module.icon;
                const total = MODULE_TOPIC_COUNTS[module.key];
                const progress = getModuleProgress(user?.progress[module.key], total);

                return (
                  <button
                    type="button"
                    key={module.key}
                    onClick={() => navigate(module.path)}
                    aria-describedby={`${module.key}-description ${module.key}-progress-label`}
                    aria-label={`${progress.completed ? "Retomar" : "Começar"} ${module.title}`}
                    className={`group rounded-2xl border ${module.borderClass} bg-edtech-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-edtech-sky hover:shadow-[0_18px_38px_rgba(31,41,55,0.08)]`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${module.softClass}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      {progress.isComplete ? (
                        <div className="inline-flex items-center gap-1 rounded-full bg-edtech-mint/20 px-2.5 py-1 text-xs font-semibold text-edtech-text">
                          <CheckCircle2 className="h-3.5 w-3.5 text-edtech-mint" aria-hidden="true" />
                          Completo
                        </div>
                      ) : (
                        <span className="rounded-full bg-edtech-bg px-2.5 py-1 text-xs font-semibold text-edtech-muted">
                          Módulo {module.number}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-edtech-text">{module.title}</h3>
                    <p id={`${module.key}-description`} className="mt-2 min-h-[72px] text-sm leading-6 text-edtech-muted">{module.description}</p>

                    <div className="mt-5">
                      <div id={`${module.key}-progress-label`} className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-edtech-text">Progresso</span>
                        <span className="text-edtech-muted">
                          {progress.completed}/{total}
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
                        <div className={`h-2 rounded-full ${module.accentClass}`} style={{ width: `${progress.percent}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-edtech-primary transition group-hover:gap-3 group-hover:text-edtech-sky">
                      {progress.completed ? "Retomar" : "Começar"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6" aria-label="Informações complementares">
            <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-edtech-primary" aria-hidden="true" />
                <h2 className="text-base font-semibold text-edtech-text">Atividade recente</h2>
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
                    <span className="mt-1 block text-edtech-muted">{user.lastVisited}</span>
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
              <h2 className="text-base font-semibold text-edtech-text">Resumo por módulo</h2>
              <div className="mt-4 divide-y divide-edtech-border">
                {modules.map((module) => {
                  const total = MODULE_TOPIC_COUNTS[module.key];
                  const progress = getModuleProgress(user?.progress[module.key], total);

                  return (
                    <div key={module.key} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="text-sm font-medium text-edtech-text">Módulo {module.number}</p>
                        <p className="text-xs text-edtech-muted">{module.title}</p>
                      </div>
                      <span className="text-sm font-semibold text-edtech-primary">
                        {progress.completed}/{total}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <p className="text-center text-xs text-edtech-muted">UEA/EST · Oficina de Desenvolvimento de Software Educacional</p>
          </aside>
        </section>
      </main>
    </div>
  );
}
