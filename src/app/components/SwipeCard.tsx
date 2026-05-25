import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CardContent {
  type: 'teoria' | 'exemplo' | 'exercicio' | 'feedback';
  title: string;
  content: string | React.ReactNode;
  question?: string;
  options?: string[];
  correctAnswer?: number;
}

interface SwipeCardProps {
  cards: CardContent[];
  onComplete?: () => void;
}

export function SwipeCard({ cards, onComplete }: SwipeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentCard = cards[currentIndex];

  const getCardIcon = (type: CardContent['type']) => {
    switch (type) {
      case 'teoria':
        return '📘';
      case 'exemplo':
        return '💡';
      case 'exercicio':
        return '✍️';
      case 'feedback':
        return '✅';
    }
  };

  const getCardLabel = (type: CardContent['type']) => {
    switch (type) {
      case 'teoria':
        return 'Teoria';
      case 'exemplo':
        return 'Exemplo';
      case 'exercicio':
        return 'Exercício';
      case 'feedback':
        return 'Feedback';
    }
  };

  const handleNext = () => {
    if (currentCard.type === 'exercicio' && selectedAnswer === null && !showFeedback) {
      return; // Não avança sem responder
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === currentCard.correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-600'
                  : index < currentIndex
                  ? 'bg-blue-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          {currentIndex + 1} de {cards.length}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[400px] flex flex-col">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{getCardIcon(currentCard.type)}</span>
          <h2 className="text-2xl font-bold text-gray-800">
            {getCardLabel(currentCard.type)}
          </h2>
        </div>

        {/* Card content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {currentCard.title}
          </h3>
          
          {currentCard.type === 'exercicio' ? (
            <div>
              <p className="text-gray-700 mb-6">{currentCard.question}</p>
              <div className="space-y-3">
                {currentCard.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showFeedback
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)})</span> {option}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                  }`}
                >
                  <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? '✅ Correto!' : '❌ Incorreto'}
                  </p>
                  <p className="text-gray-700 mt-2">{currentCard.content}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-700 leading-relaxed prose max-w-none">
              {typeof currentCard.content === 'string' ? (
                <p>{currentCard.content}</p>
              ) : (
                currentCard.content
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={currentCard.type === 'exercicio' && !showFeedback}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {currentIndex === cards.length - 1 ? 'Concluir' : 'Próximo'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
