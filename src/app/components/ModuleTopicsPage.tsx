import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth";
import { ModuleLayout } from "./ModuleLayout";
import { PageNotice } from "./PageNotice";
import { SwipeCard, type CardContent } from "./SwipeCard";

export type ModuleTopic = {
  id: string;
  name: string;
  icon: string;
  cards: CardContent[];
  accentClass?: string;
  softClass?: string;
  borderClass?: string;
};

type ModuleTheme = {
  textClass: string;
  progressClass: string;
};

type ModuleTopicsPageProps = {
  moduleId: string;
  modulePath: string;
  moduleNumber: number;
  moduleTitle: string;
  moduleColor: string;
  introTitle: string;
  introDescription: string;
  completeMessage: string;
  topics: ModuleTopic[];
  theme: ModuleTheme;
  getTopicHeading?: (topic: ModuleTopic) => string;
};

type ModuleNotice = {
  variant: "success" | "error";
  title: string;
  description: string;
};

function getCardsLabel(cards: CardContent[]) {
  return `${cards.length} ${cards.length === 1 ? "card" : "cards"}`;
}

function createExerciseId(moduleId: string, topicId: string, card: CardContent, cardIndex: number) {
  const normalizedTitle = card.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${moduleId}:${topicId}:${cardIndex}:${normalizedTitle || "exercicio"}`;
}

export function ModuleTopicsPage({
  moduleId,
  modulePath,
  moduleNumber,
  moduleTitle,
  moduleColor,
  introTitle,
  introDescription,
  completeMessage,
  topics,
  theme,
  getTopicHeading = (topic) => topic.name,
}: ModuleTopicsPageProps) {
  const navigate = useNavigate();
  const { user, setModuleProgress, recordExerciseAttempt, updateLastVisited } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => new Set());
  const [notice, setNotice] = useState<ModuleNotice | null>(null);
  const progressPercent = topics.length ? Math.round((completedTopics.size / topics.length) * 100) : 0;

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedTopicId) ?? null,
    [selectedTopicId, topics]
  );

  useEffect(() => {
    setCompletedTopics(new Set(user?.progress[moduleId] ?? []));
  }, [moduleId, user?.progress]);

  useEffect(() => {
    if (!user) return;
    void updateLastVisited(modulePath);
  }, [modulePath, updateLastVisited, user?.id]);

  const handleTopicComplete = async (topicId: string) => {
    const next = new Set(completedTopics);
    next.add(topicId);
    const completed = Array.from(next);

    try {
      await setModuleProgress(moduleId, completed);
      setCompletedTopics(next);
      setSelectedTopicId(null);

      if (next.size === topics.length) {
        setNotice({
          variant: "success",
          title: "Módulo concluído",
          description: completeMessage.replace(/^🎉\s*/, ""),
        });
      } else {
        setNotice({
          variant: "success",
          title: "Tópico concluído",
          description: "Seu progresso foi salvo. Você já pode escolher o próximo tópico deste módulo.",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
      const message = error instanceof Error ? error.message : "Tente novamente.";
      setNotice({
        variant: "error",
        title: "Não foi possível salvar o progresso",
        description: message,
      });
      setSelectedTopicId(null);
    }
  };

  if (selectedTopic) {
    const selectedHeading = getTopicHeading(selectedTopic);

    return (
      <ModuleLayout moduleNumber={moduleNumber} moduleTitle={moduleTitle} moduleColor={moduleColor}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedTopicId(null)}
              aria-label="Voltar para a lista de tópicos"
              className={`inline-flex items-center gap-2 rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:border-edtech-sky hover:bg-edtech-sky/10 ${theme.textClass}`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar aos tópicos
            </button>
            <span aria-live="polite" className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-edtech-muted shadow-sm ring-1 ring-edtech-border">
              {completedTopics.size}/{topics.length} tópicos
            </span>
          </div>

          <section
            aria-labelledby="selected-topic-title"
            className={`mb-6 rounded-lg border ${selectedTopic.borderClass ?? "border-edtech-border"} bg-white p-5 shadow-sm`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-edtech-muted">Tópico selecionado</p>
                <h2 id="selected-topic-title" className="mt-2 text-2xl font-semibold text-edtech-text">
                  <span className="mr-2" aria-hidden="true">
                    {selectedTopic.icon}
                  </span>
                  {selectedHeading}
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-edtech-bg px-3 py-1.5 text-sm font-semibold text-edtech-muted">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                {getCardsLabel(selectedTopic.cards)}
              </span>
            </div>
          </section>

          <SwipeCard
            cards={selectedTopic.cards}
            onComplete={() => handleTopicComplete(selectedTopic.id)}
            onExerciseAnswer={({ card, cardIndex, selectedAnswer, isCorrect }) => {
              const correctAnswer = typeof card.correctAnswer === "number" ? card.correctAnswer : -1;

              void recordExerciseAttempt({
                moduleId,
                topicId: selectedTopic.id,
                topicName: selectedHeading,
                exerciseId: createExerciseId(moduleId, selectedTopic.id, card, cardIndex),
                exerciseTitle: card.title,
                question: card.question ?? card.title,
                selectedAnswer,
                selectedOption: card.options?.[selectedAnswer] ?? "",
                correctAnswer,
                correctOption: correctAnswer >= 0 ? card.options?.[correctAnswer] ?? "" : "",
                isCorrect,
              });
            }}
          />
        </div>
      </ModuleLayout>
    );
  }

  return (
    <ModuleLayout moduleNumber={moduleNumber} moduleTitle={moduleTitle} moduleColor={moduleColor}>
      <div className="mx-auto max-w-6xl">
        {notice ? (
          <div className="mb-5">
            <PageNotice
              variant={notice.variant}
              title={notice.title}
              action={
                notice.variant === "success" && notice.title === "Módulo concluído" ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate("/home")}
                      className="inline-flex items-center justify-center rounded-lg bg-edtech-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-edtech-sky"
                    >
                      Ver trilha
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/perfil")}
                      className="inline-flex items-center justify-center rounded-lg border border-edtech-border bg-white px-3 py-2 text-sm font-semibold text-edtech-text transition hover:border-edtech-sky hover:bg-edtech-sky/10"
                    >
                      Ver dashboard
                    </button>
                  </div>
                ) : null
              }
            >
              {notice.description}
            </PageNotice>
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_300px]" aria-labelledby="module-plan-title">
          <div className="rounded-lg border border-edtech-border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-edtech-muted">Plano do módulo</p>
            <h2 id="module-plan-title" className="mt-3 text-2xl font-semibold text-edtech-text">{introTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-edtech-muted">{introDescription}</p>
          </div>

          <div className="rounded-lg border border-edtech-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-edtech-muted">Concluído</p>
                <p className="mt-2 text-3xl font-semibold text-edtech-text">{progressPercent}%</p>
              </div>
              <ClipboardList className="h-8 w-8 text-edtech-primary" aria-hidden="true" />
            </div>
            <div
              className="mt-5 h-2 rounded-full bg-edtech-bg"
              role="progressbar"
              aria-label={`Progresso do módulo ${moduleNumber}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div className={`h-2 rounded-full ${theme.progressClass}`} style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-3 text-sm text-edtech-muted" aria-live="polite">
              {completedTopics.size}/{topics.length} tópicos finalizados
            </p>
          </div>
        </section>

        <section aria-labelledby="topics-title">
          <h2 id="topics-title" className="sr-only">Tópicos do módulo</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic, index) => {
              const isCompleted = completedTopics.has(topic.id);
              const topicHeading = getTopicHeading(topic);
              const softClass = topic.softClass ?? "bg-edtech-primary/10 text-edtech-primary";
              const borderClass = topic.borderClass ?? "border-edtech-border";

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  aria-label={`${isCompleted ? "Revisar" : "Começar"} ${topicHeading}. ${getCardsLabel(topic.cards)} de estudo.`}
                  className={`group rounded-lg border ${borderClass} bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-edtech-sky hover:shadow-[0_18px_38px_rgba(31,41,55,0.08)]`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${softClass}`} aria-hidden="true">
                      {topic.icon}
                    </div>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-edtech-mint/20 px-2.5 py-1 text-xs font-semibold text-edtech-text">
                        <Check className="h-3.5 w-3.5 text-edtech-mint" aria-hidden="true" />
                        Concluído
                      </span>
                    ) : (
                      <span className="rounded-full bg-edtech-bg px-2.5 py-1 text-xs font-semibold text-edtech-muted" aria-label={`Tópico ${index + 1}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-edtech-text">{topicHeading}</h3>
                  <p className="mt-2 text-sm text-edtech-muted">{getCardsLabel(topic.cards)} de estudo</p>

                  <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:gap-3 ${theme.textClass}`}>
                    {isCompleted ? "Revisar" : "Começar"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </ModuleLayout>
  );
}
