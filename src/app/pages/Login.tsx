import { FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { BarChart3, BookOpenCheck, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const { user, ready, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailId = useId();
  const passwordId = useId();
  const displayNameId = useId();
  const formTitleId = useId();
  const formStatusId = useId();
  const formErrorId = useId();

  useEffect(() => {
    if (ready && user) {
      navigate("/home", { replace: true });
    }
  }, [ready, user, navigate]);

  const toggleCreateMode = (nextMode: boolean) => {
    setCreateMode(nextMode);
    setSubmitted(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage(null);

    try {
      if (createMode) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Login error", err);
      const message = err instanceof Error ? err.message : "Erro ao entrar. Tente novamente.";
      setErrorMessage(
        message.includes("Invalid login credentials")
          ? "Credenciais inválidas. Verifique e tente novamente."
          : message
      );
    }
  };

  return (
    <div className="min-h-screen bg-edtech-bg px-4 py-8 text-edtech-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o formulário de acesso
      </a>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_420px]"
      >
        <section
          aria-labelledby="login-hero-title"
          className="overflow-hidden rounded-2xl bg-gradient-to-br from-edtech-primary via-[#5065E5] to-edtech-sky p-8 text-white shadow-[0_24px_70px_rgba(59,76,202,0.22)] md:p-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-edtech-primary shadow-sm">
              <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">TextLab</p>
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl">Análise Textual</h1>
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/65">Área do aluno</p>
            <h2 id="login-hero-title" className="mt-3 text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
              Aprenda a reconhecer textos com clareza.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
              Uma plataforma educacional moderna para diferenciar tipos narrativos, argumentativos, científicos,
              jornalísticos, literários e instrucionais com progresso salvo.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Resumo da plataforma">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <BookOpenCheck className="h-5 w-5 text-white" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">4</p>
              <p className="text-sm text-white/72">módulos</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <BarChart3 className="h-5 w-5 text-edtech-mint" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">39</p>
              <p className="text-sm text-white/72">tópicos</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-edtech-amber" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">100%</p>
              <p className="text-sm text-white/72">salvo</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-edtech-border bg-edtech-surface p-6 shadow-[0_18px_45px_rgba(31,41,55,0.08)] md:p-8">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">
              {createMode ? "Criar conta" : "Entrar"}
            </p>
            <h2 id={formTitleId} className="mt-2 text-2xl font-semibold text-edtech-text">
              {createMode ? "Comece no TextLab" : "Acesse sua conta"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby={formTitleId}
            aria-describedby={errorMessage ? formErrorId : submitted ? formStatusId : undefined}
            className="space-y-4"
          >
            {createMode ? (
              <label htmlFor={displayNameId} className="block">
                <span className="text-sm font-medium text-edtech-text">Nome para exibição</span>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                  <UserRound className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                  <input
                    id={displayNameId}
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                    className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                  />
                </div>
              </label>
            ) : null}

            <label htmlFor={emailId} className="block">
              <span className="text-sm font-medium text-edtech-text">E-mail</span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                <Mail className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                />
              </div>
            </label>

            <label htmlFor={passwordId} className="block">
              <span className="text-sm font-medium text-edtech-text">Senha</span>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                <Lock className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                <input
                  id={passwordId}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete={createMode ? "new-password" : "current-password"}
                  required
                  className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                />
              </div>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-edtech-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky focus:outline-none focus:ring-2 focus:ring-edtech-sky/30"
            >
              {createMode ? "Criar conta" : "Entrar"}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center">
            {!createMode ? (
              <button
                type="button"
                onClick={() => toggleCreateMode(true)}
                aria-label="Alternar para criar uma conta"
                className="text-sm font-medium text-edtech-primary transition hover:text-edtech-sky"
              >
                Criar uma conta
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleCreateMode(false)}
                aria-label="Alternar para entrar com uma conta existente"
                className="text-sm font-medium text-edtech-muted transition hover:text-edtech-text"
              >
                Já tenho conta
              </button>
            )}
          </div>

          {errorMessage ? (
            <div
              id={formErrorId}
              role="alert"
              className="mt-6 rounded-xl border border-category-argumentativo/40 bg-category-argumentativo/10 p-4 text-sm text-edtech-text"
            >
              {errorMessage}
            </div>
          ) : null}

          {submitted ? (
            <div
              id={formStatusId}
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-edtech-mint/50 bg-edtech-mint/15 p-4 text-sm text-edtech-text"
            >
              Entrada registrada. Redirecionando...
            </div>
          ) : null}

          <p className="mt-7 border-t border-edtech-border pt-5 text-xs leading-5 text-edtech-muted">
            Sessão protegida e progresso sincronizado com sua conta.
          </p>
        </section>
      </main>
    </div>
  );
}
