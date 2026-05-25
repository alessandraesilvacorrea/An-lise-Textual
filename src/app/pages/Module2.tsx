import { ModuleTopicsPage, type ModuleTopic } from "../components/ModuleTopicsPage";
import {
  aliteracaoCards,
  anaforaCards,
  antiteseCards,
  apostrofeCards,
  assonanciaCards,
  catacreseCards,
  comparacaoCards,
  elipseCards,
  eufemismoCards,
  exerciciosModulo1Cards,
  figurasSintaxeComplementaresCards,
  gradacaoCards,
  hiperboleCards,
  ironiaCards,
  litotesCards,
  metaforaCards,
  metonimiaCards,
  onomatopeiaCards,
  paradoxoCards,
  paronomasiaCards,
  panoramaFigurasCards,
  perifrasedCards,
  personificacaoCards,
  pleonasmoCards,
  polissindetoCards,
  sinestesiaCards,
} from "../data/module2-data";

const literaryTopicStyle = {
  softClass: "bg-category-literario/20 text-edtech-text",
  borderClass: "border-category-literario/50",
};

const topics = [
  { id: "panorama-figuras", name: "Panorama das Figuras", icon: "🧭", cards: panoramaFigurasCards, softClass: "bg-edtech-sky/20 text-edtech-primary", borderClass: "border-edtech-sky/50" },
  { id: "exercicios-modulo1", name: "Revisão - Exercícios do Módulo 1", icon: "📝", cards: exerciciosModulo1Cards, softClass: "bg-edtech-sky/20 text-edtech-primary", borderClass: "border-edtech-sky/50" },
  { id: "metafora", name: "Metáfora", icon: "🌟", cards: metaforaCards, ...literaryTopicStyle },
  { id: "metonimia", name: "Metonímia", icon: "🔄", cards: metonimiaCards, ...literaryTopicStyle },
  { id: "comparacao", name: "Comparação", icon: "⚖️", cards: comparacaoCards, ...literaryTopicStyle },
  { id: "catacrese", name: "Catacrese", icon: "❌", cards: catacreseCards, ...literaryTopicStyle },
  { id: "perifrase", name: "Perífrase", icon: "🔍", cards: perifrasedCards, ...literaryTopicStyle },
  { id: "sinestesia", name: "Sinestesia", icon: "👁️", cards: sinestesiaCards, ...literaryTopicStyle },
  { id: "hiperbole", name: "Hipérbole", icon: "📢", cards: hiperboleCards, ...literaryTopicStyle },
  { id: "litotes", name: "Litotes", icon: "🤫", cards: litotesCards, ...literaryTopicStyle },
  { id: "eufemismo", name: "Eufemismo", icon: "💬", cards: eufemismoCards, ...literaryTopicStyle },
  { id: "ironia", name: "Ironia", icon: "😏", cards: ironiaCards, ...literaryTopicStyle },
  { id: "personificacao", name: "Personificação", icon: "🎭", cards: personificacaoCards, ...literaryTopicStyle },
  { id: "antitese", name: "Antítese", icon: "⚡", cards: antiteseCards, ...literaryTopicStyle },
  { id: "paradoxo", name: "Paradoxo", icon: "🌀", cards: paradoxoCards, ...literaryTopicStyle },
  { id: "apostrofe", name: "Apóstrofe", icon: "👋", cards: apostrofeCards, ...literaryTopicStyle },
  { id: "gradacao", name: "Gradação", icon: "📈", cards: gradacaoCards, ...literaryTopicStyle },
  { id: "elipse", name: "Elipse", icon: "⭕", cards: elipseCards, ...literaryTopicStyle },
  { id: "anafora", name: "Anáfora", icon: "🔁", cards: anaforaCards, ...literaryTopicStyle },
  { id: "pleonasmo", name: "Pleonasmo", icon: "➕", cards: pleonasmoCards, ...literaryTopicStyle },
  { id: "figuras-sintaxe-complementares", name: "Complementos de Sintaxe", icon: "🧩", cards: figurasSintaxeComplementaresCards, ...literaryTopicStyle },
  { id: "polissindeto", name: "Polissíndeto", icon: "🔗", cards: polissindetoCards, ...literaryTopicStyle },
  { id: "aliteracao", name: "Aliteração", icon: "🎵", cards: aliteracaoCards, ...literaryTopicStyle },
  { id: "assonancia", name: "Assonância", icon: "🎶", cards: assonanciaCards, ...literaryTopicStyle },
  { id: "onomatopeia", name: "Onomatopeia", icon: "🔊", cards: onomatopeiaCards, ...literaryTopicStyle },
  { id: "paronomasia", name: "Paronomásia", icon: "🎭", cards: paronomasiaCards, ...literaryTopicStyle },
] satisfies ModuleTopic[];

export default function Module2() {
  return (
    <ModuleTopicsPage
      moduleId="module2"
      modulePath="/modulo-2"
      moduleNumber={2}
      moduleTitle="Figuras de Linguagem"
      moduleColor="from-category-literario via-category-narrativo to-edtech-sky"
      introTitle="Escolha uma figura de linguagem para estudar"
      introDescription="Os recursos expressivos ganham uma identidade visual literária, com contraste confortável para leitura prolongada."
      completeMessage="🎉 Parabéns! Você completou o Módulo 2!"
      topics={topics}
      theme={{
        textClass: "text-edtech-primary hover:text-edtech-sky",
        progressClass: "bg-category-literario",
      }}
    />
  );
}
