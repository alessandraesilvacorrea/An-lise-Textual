import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, MessageSquare, Search, AlertTriangle } from 'lucide-react';
import { useAuth } from '../auth';
import { MODULE_TOPIC_COUNTS } from '../data/modules-meta';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut, updateLastVisited } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    updateLastVisited('/home');
  }, [updateLastVisited]);

  useEffect(() => {
    if (isLoggingOut && !user) {
      navigate('/', { replace: true });
    }
  }, [isLoggingOut, user, navigate]);

  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      try {
        setIsLoggingOut(true);
        await signOut();
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Logout error', err);
        alert('Erro ao sair. Tente novamente.');
        setIsLoggingOut(false);
      }
    }
  };

  const modules = [
    {
      id: 1,
      title: 'Tipos e Gêneros Textuais',
      description: 'Aprenda a identificar e diferenciar os principais tipos e gêneros textuais',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      path: '/modulo-1',
    },
    {
      id: 2,
      title: 'Figuras de Linguagem',
      description: 'Explore as principais figuras de linguagem e seus usos',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      path: '/modulo-2',
    },
    {
      id: 3,
      title: 'Interpretação Textual',
      description: 'Desenvolva habilidades de leitura crítica e interpretação',
      icon: Search,
      color: 'from-green-500 to-green-600',
      path: '/modulo-3',
    },
    {
      id: 4,
      title: 'Identificação de Fake News',
      description: 'Aprenda a identificar notícias falsas e verificar informações',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      path: '/modulo-4',
    },
  ];

  const progressEntries = Object.entries(user?.progress ?? {});
  const firstName = user?.displayName ?? user?.email.split('@')[0] ?? 'Aluno';
  const modulesStarted = progressEntries.length;
  const totalSavedTopics = progressEntries.reduce((sum, [, topics]) => sum + topics.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-sky-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">Área do aluno</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Olá, {firstName}</h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Seu conteúdo está protegido por conta. Continue seus estudos e retome o que já foi salvo automaticamente.
            </p>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">Progresso geral</p>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Módulos iniciados</span>
                <strong>{modulesStarted}/4</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Tópicos salvos</span>
                <strong>{totalSavedTopics}</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Sair
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-10">
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              const moduleKey = `module${module.id}`;
              const completedCount = user?.progress[moduleKey]?.length ?? 0;
              const isModuleComplete = MODULE_TOPIC_COUNTS[moduleKey as keyof typeof MODULE_TOPIC_COUNTS] === completedCount && completedCount > 0;
              return (
                <button
                  type="button"
                  key={module.id}
                  onClick={() => navigate(module.path)}
                  className="group relative overflow-hidden bg-white/95 border border-slate-200 rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${module.color}`} />

                  <div className="p-8">
                    {isModuleComplete && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-3">
                        ✓
                      </div>
                    )}
                    <div className="inline-flex p-4 rounded-3xl bg-slate-100 text-slate-700 mb-4">
                      <Icon className="w-8 h-8" />
                    </div>

                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{module.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">{module.description}</p>
                    <div className="mt-2 inline-flex items-center gap-2 text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                      Entrar
                      <span className="text-xl leading-none">→</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">Seu progresso salvo</p>
            {progressEntries.length > 0 ? (
              <div className="space-y-3">
                {progressEntries.map(([moduleId, topics]) => (
                  <div key={moduleId} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{moduleId.replace('module', 'Módulo ').toUpperCase()}</p>
                    <p className="mt-2 text-sm text-slate-600">{topics.length} tópico(s) concluído(s)</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">Nenhum progresso registrado ainda. Comece por qualquer módulo acima.</p>
            )}
            {user?.lastVisited ? (
              <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                Última página acessada: <strong>{user.lastVisited}</strong>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 bg-white/90 border border-slate-200 rounded-full shadow-sm">
            <span className="text-2xl">•</span>
            <p className="text-slate-700">
              <strong>UEA/EST</strong> • Oficina de Desenvolvimento de Software Educacional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
