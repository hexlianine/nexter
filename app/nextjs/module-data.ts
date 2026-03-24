export type ChapterLevel = "beginner" | "intermediate" | "advanced";

export type Chapter = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  level: ChapterLevel;
  children?: Chapter[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "why-nextjs",
    title: "Why Next.js?",
    slug: "why-nextjs",
    summary: "Discover the core benefits of building with Next.js.",
    level: "beginner",
    children: [
      {
        id: "server-components",
        title: "Server Components",
        slug: "server-components",
        summary: "Render UI closer to the data source for better performance.",
        level: "beginner",
      },
      {
        id: "full-stack",
        title: "Full-Stack Capabilities",
        slug: "full-stack",
        summary: "Write backend and frontend code in a single framework.",
        level: "beginner",
      },
    ],
  },
  {
    id: "routing",
    title: "App Router Navigation",
    slug: "app-router",
    summary: "How folders define routes and layouts establish shared UI.",
    level: "intermediate",
    children: [
      {
        id: "layouts",
        title: "Nested Layouts",
        slug: "layouts",
        summary: "Keep consistent UI across different sections of your app.",
        level: "intermediate",
      },
    ],
  },
  {
    id: "optimization",
    title: "Built-in Optimizations",
    slug: "optimization",
    summary: "Images, fonts, and scripts are optimized automatically.",
    level: "advanced",
  },
];

export const LEVEL_LABELS: Record<ChapterLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
