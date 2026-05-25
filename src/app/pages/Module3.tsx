import { useEffect, useState } from 'react';
import { ModuleLayout } from '../components/ModuleLayout';
import { SwipeCard } from '../components/SwipeCard';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth';
import {
  ideiaCentralCards,
  inferenciaCards,
  argumentacaoCards,
  contextoCards,
  intencaoAutorCards,
} from '../data/module3-data';

type Topic = 'ideia-central' | 'inferencia' | 'argumentacao' | 'contexto' | 'intencao-autor' | null;

export default function Module3() {
  const navigate = useNavigate();
  const { user, setModuleProgress, updateLastVisited } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<Topic>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const moduleId = 'module3';

  const topics = [
    { id: 'ideia-central', name: 'Ideia Central', icon: '🎯', cards: ideiaCentralCards },
    { id: 'inferencia', name: 'Inferência', icon: '🔍', cards: inferenciaCards },
    { id: 'argumentacao', name: 'Argumentação', icon: '💬', cards: argumentacaoCards },
    { id: 'contexto', name: 'Contexto', icon: '🌐', cards: contextoCards },
    { id: 'intencao-autor', name: 'Intenção do Autor', icon: '✍️', cards: intencaoAutorCards },
  ];

  useEffect(() => {
    if (!user) return;
    setCompletedTopics(new Set(user.progress[moduleId] ?? []));
  }, [user?.progress]);

  useEffect(() => {
    if (!user) return;
    updateLastVisited('/modulo-3');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleTopicComplete = async (topicId: string) => {
    const next = new Set(completedTopics);
    next.add(topicId);
    const completed = Array.from(next);

    try {
      if (user) {
        await setModuleProgress(moduleId, completed);
      }

      setCompletedTopics(next);

      if (next.size === topics.length) {
        alert('🎉 Parabéns! Você completou o Módulo 3!');
        navigate('/home');
      }
    } catch (err) {
      console.error('Erro ao salvar progresso:', err);
      alert('Não foi possível salvar seu progresso. Tente novamente.');
    } finally {
      setSelectedTopic(null);
    }
  };

  if (selectedTopic) {
    const topic = topics.find((t) => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <ModuleLayout
        moduleNumber={3}
        moduleTitle="Interpretação Textual"
        moduleColor="from-green-500 to-green-600"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button onClick={() => setSelectedTopic(null)} className="text-green-600 hover:text-green-700 font-medium">
              ← Voltar aos tópicos
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              {topic.icon} {topic.name}
            </h2>
          </div>

          <SwipeCard cards={topic.cards} onComplete={() => handleTopicComplete(topic.id)} />
        </div>
      </ModuleLayout>
    );
  }

  return (
    <ModuleLayout
      moduleNumber={3}
      moduleTitle="Interpretação Textual"
      moduleColor="from-green-500 to-green-600"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Escolha uma habilidade de interpretação para estudar</h2>
          <p className="text-gray-600">Desenvolva suas habilidades de leitura crítica e compreensão textual.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic) => {
            const isCompleted = completedTopics.has(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id as Topic)}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-left group hover:-translate-y-1"
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-4">4 cards interativos</p>
                <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all">
                  {isCompleted ? 'Revisar' : 'Começar'}
                  <span className="ml-2 group-hover:ml-0 transition-all">→</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Progresso do Módulo</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedTopics.size / topics.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {completedTopics.size}/{topics.length}
            </span>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
