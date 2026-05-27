import { FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import {
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "../auth";
import { MODULE_TOPIC_COUNTS } from "../data/modules-meta";

const totalModules = Object.keys(MODULE_TOPIC_COUNTS).length;
const totalTopics = Object.values(MODULE_TOPIC_COUNTS).reduce((sum, count) => sum + count, 0);

function getFriendlyAuthError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("email rate limit exceeded")) {
    return "O Supabase bloqueou temporariamente o envio de novos e-mails de confirmação. Aguarde um pouco antes de tentar novamente ou desative a confirmação de e-mail durante os testes.";
  }

  if (normalizedMessage.includes("invalid login credentials")) {
    return "Credenciais inválidas. Verifique e tente novamente.";
  }

  return message;
}

export default function Login() {
  const navigate = useNavigate();
  const { user, ready, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<"login" | "signup" | null>(null);
  const [confirmationRequired, setConfirmationRequired] = useState(false);
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
    if (isSubmitting) return;
    setCreateMode(nextMode);
    setSubmitted(false);
    setSubmissionMode(null);
    setConfirmationRequired(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitted(false);
    setErrorMessage(null);
    setConfirmationRequired(false);
    setIsSubmitting(true);
    setSubmissionMode(createMode ? "signup" : "login");

    try {
      if (createMode) {
        const result = await signUp(email, password, displayName);
        setConfirmationRequired(result.status === "confirmation-required");
      } else {
        await signIn(email, password);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Login error", err);
      const message = err instanceof Error ? err.message : "Erro ao entrar. Tente novamente.";
      setSubmissionMode(null);
      setErrorMessage(getFriendlyAuthError(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSubmissionDialog = isSubmitting || submitted;
  const submissionTitle = submitted
    ? confirmationRequired
      ? "Confirme seu e-mail"
      : createMode
      ? "Conta criada"
      : "Login confirmado"
    : submissionMode === "signup"
      ? "Criando sua conta"
      : "Entrando na sua conta";
  const submissionDescription = submitted
    ? confirmationRequired
      ? "Enviamos um link de confirmação para o e-mail informado. Depois de confirmar, volte para entrar."
      : "Tudo certo. Estamos carregando sua trilha de estudos."
    : submissionMode === "signup"
      ? "Estamos preparando seu perfil e salvando o acesso inicial."
      : "Estamos verificando seus dados e carregando seu progresso.";

  const handleConfirmationAcknowledge = () => {
    setSubmitted(false);
    setConfirmationRequired(false);
    setSubmissionMode(null);
    setCreateMode(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-edtech-bg px-4 py-8 text-edtech-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-edtech-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
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
          className="overflow-hidden rounded-lg bg-gradient-to-br from-edtech-primary via-[#5065E5] to-edtech-sky p-8 text-white shadow-[0_24px_70px_rgba(59,76,202,0.22)] md:p-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-edtech-primary shadow-sm">
              <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">TextLab</p>
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl">Análise Textual</h1>
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/65">Trilha guiada de leitura</p>
            <h2 id="login-hero-title" className="mt-3 text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
              Entenda textos com método, prática e clareza.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
              O TextLab organiza o estudo de tipos textuais, gêneros, figuras de linguagem, interpretação e verificação
              de informações em uma jornada progressiva, feita para leitura atenta e aprendizagem consistente.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Resumo da plataforma">
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <BookOpenCheck className="h-5 w-5 text-white" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">{totalModules}</p>
              <p className="text-sm text-white/72">módulos</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <BarChart3 className="h-5 w-5 text-edtech-mint" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">{totalTopics}</p>
              <p className="text-sm text-white/72">tópicos</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-edtech-amber" aria-hidden="true" />
              <p className="mt-3 text-2xl font-semibold">Perfil</p>
              <p className="text-sm text-white/72">com progresso salvo</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-edtech-border bg-edtech-surface p-6 shadow-[0_18px_45px_rgba(31,41,55,0.08)] md:p-8">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-edtech-muted">
              {createMode ? "Novo acesso" : "Acesso ao sistema"}
            </p>
            <h2 id={formTitleId} className="mt-2 text-2xl font-semibold text-edtech-text">
              {createMode ? "Crie sua conta no TextLab" : "Entre para continuar sua trilha"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-edtech-muted">
              {createMode
                ? "Salve seu progresso desde o primeiro módulo e acompanhe sua evolução no dashboard."
                : "Retome seus módulos, avance na sequência correta e acompanhe seu progresso de leitura."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby={formTitleId}
            aria-describedby={errorMessage ? formErrorId : submitted ? formStatusId : undefined}
            aria-busy={isSubmitting}
            className="space-y-4"
          >
            {createMode ? (
              <label htmlFor={displayNameId} className="block">
                <span className="text-sm font-medium text-edtech-text">Nome para exibição</span>
                <div className="mt-2 flex items-center gap-3 rounded-lg border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                  <UserRound className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                  <input
                    id={displayNameId}
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                  />
                </div>
              </label>
            ) : null}

            <label htmlFor={emailId} className="block">
              <span className="text-sm font-medium text-edtech-text">E-mail</span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                <Mail className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                />
              </div>
            </label>

            <label htmlFor={passwordId} className="block">
              <span className="text-sm font-medium text-edtech-text">Senha</span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-edtech-border bg-edtech-bg px-3 py-2.5 transition focus-within:border-edtech-sky focus-within:ring-2 focus-within:ring-edtech-sky/25">
                <Lock className="h-5 w-5 text-edtech-muted" aria-hidden="true" />
                <input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete={createMode ? "new-password" : "current-password"}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-edtech-text outline-none placeholder:text-edtech-muted"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="rounded-lg p-1.5 text-edtech-muted transition hover:bg-white hover:text-edtech-text disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-edtech-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-edtech-sky focus:outline-none focus:ring-2 focus:ring-edtech-sky/30 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              {isSubmitting ? (createMode ? "Criando conta..." : "Entrando...") : createMode ? "Criar conta" : "Entrar"}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center">
            {!createMode ? (
              <button
                type="button"
                onClick={() => toggleCreateMode(true)}
                disabled={isSubmitting}
                aria-label="Alternar para criar uma conta"
                className="text-sm font-medium text-edtech-primary transition hover:text-edtech-sky disabled:cursor-not-allowed disabled:opacity-50"
              >
                Criar uma conta
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleCreateMode(false)}
                disabled={isSubmitting}
                aria-label="Alternar para entrar com uma conta existente"
                className="text-sm font-medium text-edtech-muted transition hover:text-edtech-text disabled:cursor-not-allowed disabled:opacity-50"
              >
                Já tenho conta
              </button>
            )}
          </div>

          {errorMessage ? (
            <div
              id={formErrorId}
              role="alert"
              className="mt-6 rounded-lg border border-category-argumentativo/40 bg-category-argumentativo/10 p-4 text-sm text-edtech-text"
            >
              {errorMessage}
            </div>
          ) : null}

          {submitted ? (
            <div
              id={formStatusId}
              role="status"
              aria-live="polite"
              className="mt-6 rounded-lg border border-edtech-mint/50 bg-edtech-mint/15 p-4 text-sm text-edtech-text"
            >
              {confirmationRequired
                ? "Cadastro criado. Confirme o link enviado para seu e-mail antes de entrar."
                : "Entrada registrada. Redirecionando..."}
            </div>
          ) : null}

          <p className="mt-7 border-t border-edtech-border pt-5 text-xs leading-5 text-edtech-muted">
            Seu acesso mantém o histórico de estudos e sincroniza o progresso da trilha textual.
          </p>
        </section>
      </main>

      {showSubmissionDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-edtech-text/35 px-4 py-6 backdrop-blur-sm">
          <section
            role={confirmationRequired ? "dialog" : "status"}
            aria-modal={confirmationRequired ? true : undefined}
            aria-live="polite"
            aria-label={submissionTitle}
            className="w-full max-w-sm rounded-lg border border-edtech-border bg-white p-6 text-center shadow-[0_24px_70px_rgba(31,41,55,0.22)]"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-edtech-primary/10 text-edtech-primary">
              {submitted ? (
                <CheckCircle2 className="h-6 w-6 text-edtech-mint" aria-hidden="true" />
              ) : (
                <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-edtech-text">{submissionTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-edtech-muted">{submissionDescription}</p>
            {confirmationRequired ? (
              <>
                <div className="mt-5 rounded-lg border border-edtech-border bg-edtech-bg p-3 text-sm font-semibold text-edtech-text">
                  {email}
                </div>
                <button
                  type="button"
                  onClick={handleConfirmationAcknowledge}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-edtech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-edtech-sky"
                >
                  Entendi, vou confirmar o e-mail
                </button>
              </>
            ) : (
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-edtech-bg">
                <div className="h-full w-2/3 rounded-full bg-edtech-primary motion-safe:animate-pulse" />
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
