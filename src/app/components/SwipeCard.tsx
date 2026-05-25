import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { BookOpenCheck, CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, PenLine, XCircle } from "lucide-react";

export interface CardContent {
  type: "teoria" | "exemplo" | "exercicio" | "feedback";
  title: string;
  content: string | ReactNode;
  question?: string;
  options?: string[];
  correctAnswer?: number;
}

interface SwipeCardProps {
  cards: CardContent[];
  onComplete?: () => void | Promise<void>;
}

function getCardMeta(type: CardContent["type"]) {
  switch (type) {
    case "teoria":
      return {
        label: "Teoria",
        Icon: BookOpenCheck,
        className: "bg-edtech-sky/20 text-edtech-primary",
      };
    case "exemplo":
      return {
        label: "Exemplo",
        Icon: Lightbulb,
        className: "bg-edtech-amber/25 text-edtech-text",
      };
    case "exercicio":
      return {
        label: "Exercício",
        Icon: PenLine,
        className: "bg-category-argumentativo/20 text-edtech-text",
      };
    case "feedback":
      return {
        label: "Feedback",
        Icon: CheckCircle2,
        className: "bg-edtech-mint/20 text-edtech-text",
      };
  }
}

export function SwipeCard({ cards, onComplete }: SwipeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const titleId = useId();
  const questionId = useId();
  const feedbackId = useId();

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-edtech-border bg-white p-8 text-center text-edtech-muted shadow-sm">
        Nenhum card disponível para este tópico.
      </div>
    );
  }

  const resetAnswer = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleNext = async () => {
    if (currentCard.type === "exercicio" && selectedAnswer === null && !showFeedback) {
      return;
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((index) => index + 1);
      resetAnswer();
      return;
    }

    if (!onComplete || isCompleting) return;

    try {
      setIsCompleting(true);
      await onComplete();
    } finally {
      setIsCompleting(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0 || isCompleting) return;
    setCurrentIndex((index) => index - 1);
    resetAnswer();
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (showFeedback || !currentCard.options?.length) return;

    if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + currentCard.options.length) % currentCard.options.length;
    const nextOption = document.getElementById(`${questionId}-option-${nextIndex}`);
    nextOption?.focus();
  };

  const isCorrect = selectedAnswer === currentCard.correctAnswer;
  const needsAnswer = currentCard.type === "exercicio" && !showFeedback;
  const meta = getCardMeta(currentCard.type);
  const Icon = meta.Icon;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 rounded-2xl border border-edtech-border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-edtech-muted">
            Card {currentIndex + 1} de {cards.length}
          </p>
          <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.className}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {meta.label}
          </span>
        </div>
        <div
          className="mt-3 flex gap-1.5"
          role="progressbar"
          aria-label="Progresso nos cards do tópico"
          aria-valuemin={1}
          aria-valuemax={cards.length}
          aria-valuenow={currentIndex + 1}
          aria-valuetext={`Card ${currentIndex + 1} de ${cards.length}`}
        >
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index <= currentIndex ? "bg-edtech-primary" : "bg-edtech-bg"
              }`}
            />
          ))}
        </div>
      </div>

      <article aria-labelledby={titleId} className="flex min-h-[440px] flex-col rounded-2xl border border-edtech-border bg-white p-6 shadow-sm md:p-8">
        <header className="mb-6 border-b border-edtech-border pb-5">
          <h2 id={titleId} className="text-2xl font-semibold leading-tight text-edtech-text">{currentCard.title}</h2>
        </header>

        <div className="flex-1">
          {currentCard.type === "exercicio" ? (
            <div>
              <p id={questionId} className="mb-5 text-base leading-7 text-edtech-text">{currentCard.question}</p>
              <div className="space-y-3" role="radiogroup" aria-labelledby={questionId} aria-describedby={showFeedback ? feedbackId : undefined}>
                {currentCard.options?.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const optionIsCorrect = currentCard.correctAnswer === index;
                  const stateClass =
                    showFeedback && isSelected
                      ? isCorrect
                        ? "border-edtech-mint bg-edtech-mint/20 text-edtech-text"
                        : "border-category-argumentativo bg-category-argumentativo/10 text-edtech-text"
                      : showFeedback && optionIsCorrect
                        ? "border-edtech-mint bg-edtech-mint/20 text-edtech-text"
                        : "border-edtech-border bg-white text-edtech-text hover:border-edtech-sky hover:bg-edtech-sky/10";

                  return (
                    <button
                      id={`${questionId}-option-${index}`}
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={showFeedback}
                      onClick={() => handleAnswerSelect(index)}
                      onKeyDown={(event) => handleOptionKeyDown(event, index)}
                      disabled={showFeedback}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm leading-6 transition ${stateClass} ${
                        showFeedback ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-edtech-bg text-xs font-semibold text-edtech-primary" aria-hidden="true">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>
                        {option}
                        {showFeedback && optionIsCorrect ? <span className="sr-only"> Resposta correta.</span> : null}
                        {showFeedback && isSelected ? <span className="sr-only"> Sua resposta.</span> : null}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showFeedback ? (
                <div
                  id={feedbackId}
                  role="status"
                  aria-live="polite"
                  className={`mt-6 rounded-xl border p-4 ${
                    isCorrect ? "border-edtech-mint bg-edtech-mint/20" : "border-category-argumentativo bg-category-argumentativo/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-edtech-mint" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-5 w-5 text-category-argumentativo" aria-hidden="true" />
                    )}
                    <p className="font-semibold text-edtech-text">{isCorrect ? "Correto" : "Incorreto"}</p>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-edtech-text">{currentCard.content}</div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="prose max-w-none leading-7 text-edtech-text prose-headings:text-edtech-text prose-strong:text-edtech-text">
              {typeof currentCard.content === "string" ? <p>{currentCard.content}</p> : currentCard.content}
            </div>
          )}
        </div>

        <footer className="mt-8 flex items-center justify-between border-t border-edtech-border pt-5">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isCompleting}
            aria-label="Voltar para o card anterior"
            className="inline-flex items-center gap-2 rounded-xl border border-edtech-border bg-white px-4 py-2 text-sm font-semibold text-edtech-text transition hover:border-edtech-sky hover:bg-edtech-sky/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={needsAnswer || isCompleting}
            aria-label={currentIndex === cards.length - 1 ? "Concluir tópico" : "Ir para o próximo card"}
            aria-busy={isCompleting}
            className="inline-flex items-center gap-2 rounded-xl bg-edtech-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-edtech-sky disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isCompleting ? "Salvando..." : currentIndex === cards.length - 1 ? "Concluir" : "Próximo"}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </article>
    </div>
  );
}
