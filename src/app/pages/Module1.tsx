import { ModuleTopicsPage, type ModuleTopic } from "../components/ModuleTopicsPage";
import {
  descritivoCards,
  dissertativoCards,
  expositivoCards,
  injuntivoCards,
  narrativoCards,
  tiposGenerosCards,
} from "../data/module1-data";

const topics = [
  {
    id: "tipos-generos",
    name: "Tipos x Gêneros",
    icon: "🧭",
    cards: tiposGenerosCards,
    softClass: "bg-edtech-sky/20 text-edtech-primary",
    borderClass: "border-edtech-sky/50",
  },
  {
    id: "narrativo",
    name: "Narrativo",
    icon: "📖",
    cards: narrativoCards,
    softClass: "bg-category-narrativo/20 text-edtech-text",
    borderClass: "border-category-narrativo/50",
  },
  {
    id: "descritivo",
    name: "Descritivo",
    icon: "🎨",
    cards: descritivoCards,
    softClass: "bg-category-literario/20 text-edtech-text",
    borderClass: "border-category-literario/50",
  },
  {
    id: "dissertativo",
    name: "Argumentativo",
    icon: "💬",
    cards: dissertativoCards,
    softClass: "bg-category-argumentativo/20 text-edtech-text",
    borderClass: "border-category-argumentativo/50",
  },
  {
    id: "injuntivo",
    name: "Instrucional",
    icon: "📋",
    cards: injuntivoCards,
    softClass: "bg-category-instrucional/25 text-edtech-text",
    borderClass: "border-category-instrucional/50",
  },
  {
    id: "expositivo",
    name: "Científico/Expositivo",
    icon: "🔬",
    cards: expositivoCards,
    softClass: "bg-category-cientifico/20 text-edtech-text",
    borderClass: "border-category-cientifico/50",
  },
] satisfies ModuleTopic[];

export default function Module1() {
  return (
    <ModuleTopicsPage
      moduleId="module1"
      modulePath="/modulo-1"
      moduleNumber={1}
      moduleTitle="Tipos e Gêneros Textuais"
      moduleColor="from-category-narrativo via-edtech-sky to-category-cientifico"
      introTitle="Escolha um tipo textual para estudar"
      introDescription="Cada tópico usa uma cor própria para ajudar você a reconhecer padrões de estrutura, linguagem e finalidade textual."
      completeMessage="🎉 Parabéns! Você completou o Módulo 1!"
      topics={topics}
      theme={{
        textClass: "text-edtech-primary hover:text-edtech-sky",
        progressClass: "bg-edtech-primary",
      }}
      getTopicHeading={(topic) => topic.id === "tipos-generos" ? topic.name : `Texto ${topic.name}`}
    />
  );
}
