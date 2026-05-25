import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const { user, ready, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (ready && user) {
      navigate("/home", { replace: true });
    }
  }, [ready, user, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (createMode) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Login error', err);
      const message = (err as any)?.message || String(err);
      alert(`Erro ao entrar: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-3">
              Bem-vindo ao TextLab
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Faça login e continue seus estudos.
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Crie uma conta rápida com seu e-mail para salvar o progresso dos módulos e acessar o conteúdo sempre que voltar.
            </p>

            <div className="mt-8 space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">O que você encontra aqui</p>
                <ul className="mt-4 space-y-2 text-slate-600 text-sm">
                  <li>• 4 módulos didáticos sobre análise textual</li>
                  <li>• Exercícios em cards interativos</li>
                  <li>• Progresso salvo automaticamente na sua conta</li>
                  <li>• Acesso ao conteúdo sempre que retornar</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-cyan-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Como funciona</p>
                <p className="mt-2 text-slate-600 text-sm">
                  Basta informar seu e-mail, entrar e começar. Se você já usou o TextLab antes, o sistema traz seu histórico automaticamente.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-3">Entrar</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {createMode && (
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Nome para exibição</span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="Seu nome"
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-cyan-200"
                  />
                </label>
              )}

              <label className="block">
                <span className="text-sm font-medium text-slate-700">E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-cyan-200"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Senha</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-cyan-200"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
              >
                {createMode ? 'Criar conta' : 'Entrar'}
              </button>

              <div className="mt-3 flex items-center justify-center gap-3">
                {!createMode ? (
                  <button type="button" onClick={() => setCreateMode(true)} className="text-sm text-cyan-600 hover:underline">
                    Criar uma conta
                  </button>
                ) : (
                  <button type="button" onClick={() => setCreateMode(false)} className="text-sm text-slate-600 hover:underline">
                    Já tenho conta
                  </button>
                )}
              </div>
            </form>

            {submitted ? (
              <div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
                ✅ Entrada registrada. Você será redirecionado em instantes.
              </div>
            ) : null}

            <p className="mt-6 text-xs text-slate-500">
              O sistema grava seu histórico no navegador para manter seu progresso entre sessões.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
