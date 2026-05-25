import { useNavigate } from 'react-router';
import { ArrowLeft, Home } from 'lucide-react';

interface ModuleLayoutProps {
  moduleNumber: number;
  moduleTitle: string;
  moduleColor: string;
  children: React.ReactNode;
}

export function ModuleLayout({ moduleNumber, moduleTitle, moduleColor, children }: ModuleLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Módulo {moduleNumber}</p>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">{moduleTitle}</h1>
              <div className={`mt-4 h-1 w-24 rounded-full bg-gradient-to-r ${moduleColor}`} />
              <p className="text-slate-600 mt-4 max-w-2xl">
                Um espaço tranquilo para aprender no seu ritmo e aplicar o conteúdo em exemplos do dia a dia.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Início
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}
