import { AlertTriangle, BookOpen, MessageSquare, Search, type LucideIcon } from "lucide-react";
import { MODULE_TOPIC_COUNTS } from "./modules-meta";

export type ModuleKey = keyof typeof MODULE_TOPIC_COUNTS;

export type CourseModule = {
  key: ModuleKey;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  accentClass: string;
  softClass: string;
  borderClass: string;
  path: string;
};

type ProgressMap = Record<string, string[] | undefined> | undefined;

export const COURSE_MODULES: CourseModule[] = [
  {
    key: "module1",
    number: 1,
    title: "Tipos e Gêneros Textuais",
    description: "Compare textos narrativos, argumentativos, científicos, jornalísticos, literários e instrucionais.",
    icon: BookOpen,
    accentClass: "bg-category-narrativo",
    softClass: "bg-category-narrativo/20 text-edtech-primary",
    borderClass: "border-category-narrativo/50",
    path: "/modulo-1",
  },
  {
    key: "module2",
    number: 2,
    title: "Figuras de Linguagem",
    description: "Reconheça recursos expressivos e efeitos de sentido em textos literários e cotidianos.",
    icon: MessageSquare,
    accentClass: "bg-category-literario",
    softClass: "bg-category-literario/20 text-edtech-text",
    borderClass: "border-category-literario/50",
    path: "/modulo-2",
  },
  {
    key: "module3",
    number: 3,
    title: "Interpretação Textual",
    description: "Pratique leitura crítica, inferência, contexto, argumentação e intenção do autor.",
    icon: Search,
    accentClass: "bg-category-cientifico",
    softClass: "bg-category-cientifico/20 text-edtech-text",
    borderClass: "border-category-cientifico/50",
    path: "/modulo-3",
  },
  {
    key: "module4",
    number: 4,
    title: "Identificação de Fake News",
    description: "Verifique fontes, datas, imagens manipuladas e sinais de desinformação jornalística.",
    icon: AlertTriangle,
    accentClass: "bg-category-jornalistico",
    softClass: "bg-category-jornalistico/20 text-edtech-primary",
    borderClass: "border-category-jornalistico/50",
    path: "/modulo-4",
  },
];

export function getModuleProgress(progress: ProgressMap, moduleKey: ModuleKey) {
  const total = MODULE_TOPIC_COUNTS[moduleKey];
  const completed = Math.min(progress?.[moduleKey]?.length ?? 0, total);

  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
    isComplete: total > 0 && completed >= total,
  };
}

export function getModuleAccess(progress: ProgressMap, moduleKey: ModuleKey) {
  const moduleIndex = COURSE_MODULES.findIndex((module) => module.key === moduleKey);
  const requiredModule = COURSE_MODULES.slice(0, moduleIndex).find((module) => !getModuleProgress(progress, module.key).isComplete);

  return {
    isLocked: Boolean(requiredModule),
    requiredModule,
  };
}

export function getNextAvailableModule(progress: ProgressMap) {
  return COURSE_MODULES.find((module) => {
    const access = getModuleAccess(progress, module.key);
    const moduleProgress = getModuleProgress(progress, module.key);
    return !access.isLocked && !moduleProgress.isComplete;
  });
}

export function getCourseProgress(progress: ProgressMap) {
  const totalTopics = COURSE_MODULES.reduce((sum, module) => sum + MODULE_TOPIC_COUNTS[module.key], 0);
  const completedTopics = COURSE_MODULES.reduce((sum, module) => sum + getModuleProgress(progress, module.key).completed, 0);
  const completedModules = COURSE_MODULES.filter((module) => getModuleProgress(progress, module.key).isComplete).length;
  const startedModules = COURSE_MODULES.filter((module) => getModuleProgress(progress, module.key).completed > 0).length;

  return {
    completedModules,
    completedTopics,
    percent: totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0,
    startedModules,
    totalModules: COURSE_MODULES.length,
    totalTopics,
  };
}
