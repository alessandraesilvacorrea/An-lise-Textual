import { ModuleTopicsPage, type ModuleTopic } from "../components/ModuleTopicsPage";
import {
  argumentacaoCards,
  compreensaoInterpretacaoCards,
  contextoCards,
  ideiaCentralCards,
  inferenciaCards,
  intencaoAutorCards,
} from "../data/module3-data";

const topics = [
  {
    id: "compreensao-interpretacao",
    name: "Compreensão e Interpretação",
    icon: "🧭",
    cards: compreensaoInterpretacaoCards,
    softClass: "bg-edtech-sky/20 text-edtech-primary",
    borderClass: "border-edtech-sky/50",
  },
  {
    id: "ideia-central",
    name: "Ideia Central",
    icon: "🎯",
    cards: ideiaCentralCards,
    softClass: "bg-edtech-sky/20 text-edtech-primary",
    borderClass: "border-edtech-sky/50",
  },
  {
    id: "inferencia",
    name: "Inferência",
    icon: "🔍",
    cards: inferenciaCards,
    softClass: "bg-category-cientifico/20 text-edtech-text",
    borderClass: "border-category-cientifico/50",
  },
  {
    id: "argumentacao",
    name: "Argumentação",
    icon: "💬",
    cards: argumentacaoCards,
    softClass: "bg-category-argumentativo/20 text-edtech-text",
    borderClass: "border-category-argumentativo/50",
  },
  {
    id: "contexto",
    name: "Contexto",
    icon: "🌐",
    cards: contextoCards,
    softClass: "bg-category-jornalistico/20 text-edtech-primary",
    borderClass: "border-category-jornalistico/50",
  },
  {
    id: "intencao-autor",
    name: "Intenção do Autor",
    icon: "✍️",
    cards: intencaoAutorCards,
    softClass: "bg-category-literario/20 text-edtech-text",
    borderClass: "border-category-literario/50",
  },
] satisfies ModuleTopic[];

export default function Module3() {
  return (
    <ModuleTopicsPage
      moduleId="module3"
      modulePath="/modulo-3"
      moduleNumber={3}
      moduleTitle="Interpretação Textual"
      moduleColor="from-category-cientifico via-edtech-mint to-edtech-sky"
      introTitle="Escolha uma habilidade de interpretação para estudar"
      introDescription="As cores ajudam a separar leitura crítica, inferência, argumentação, contexto e intenção comunicativa."
      completeMessage="🎉 Parabéns! Você completou o Módulo 3!"
      topics={topics}
      theme={{
        textClass: "text-edtech-primary hover:text-edtech-sky",
        progressClass: "bg-category-cientifico",
      }}
    />
  );
}
