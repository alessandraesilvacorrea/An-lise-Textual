import { ModuleTopicsPage, type ModuleTopic } from "../components/ModuleTopicsPage";
import {
  checarDataCards,
  factCheckingCards,
  fotosManipuladasCards,
  linguagemEmocionalCards,
  verificarFonteCards,
} from "../data/module4-data";

const topics = [
  {
    id: "verificar-fonte",
    name: "Verificar a Fonte",
    icon: "🔗",
    cards: verificarFonteCards,
    softClass: "bg-category-jornalistico/20 text-edtech-primary",
    borderClass: "border-category-jornalistico/50",
  },
  {
    id: "linguagem-emocional",
    name: "Linguagem Emocional",
    icon: "😱",
    cards: linguagemEmocionalCards,
    softClass: "bg-category-argumentativo/20 text-edtech-text",
    borderClass: "border-category-argumentativo/50",
  },
  {
    id: "checar-data",
    name: "Checar Data",
    icon: "📅",
    cards: checarDataCards,
    softClass: "bg-category-instrucional/25 text-edtech-text",
    borderClass: "border-category-instrucional/50",
  },
  {
    id: "fotos-manipuladas",
    name: "Mídia Manipulada",
    icon: "🖼️",
    cards: fotosManipuladasCards,
    softClass: "bg-category-literario/20 text-edtech-text",
    borderClass: "border-category-literario/50",
  },
  {
    id: "fact-checking",
    name: "Fact-Checking",
    icon: "✔️",
    cards: factCheckingCards,
    softClass: "bg-category-cientifico/20 text-edtech-text",
    borderClass: "border-category-cientifico/50",
  },
] satisfies ModuleTopic[];

export default function Module4() {
  return (
    <ModuleTopicsPage
      moduleId="module4"
      modulePath="/modulo-4"
      moduleNumber={4}
      moduleTitle="Identificação de Fake News"
      moduleColor="from-category-jornalistico via-edtech-sky to-category-instrucional"
      introTitle="Aprenda a identificar notícias falsas"
      introDescription="Elementos jornalísticos, argumentativos e instrucionais recebem cores distintas para facilitar análise e verificação."
      completeMessage="🎉 Parabéns! Você completou o Módulo 4 e todo o curso!"
      topics={topics}
      theme={{
        textClass: "text-edtech-primary hover:text-edtech-sky",
        progressClass: "bg-category-jornalistico",
      }}
    />
  );
}
