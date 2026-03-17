export type Difficulty = "beginner" | "intermediate" | "advanced";

export type LessonModule = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  difficulty: Difficulty;
  topics: string[];
};

export const LESSONS: LessonModule[] = [
  {
    id: "components",
    title: "Components",
    slug: "components",
    summary:
      "Server vs Client Components with live demos (counter, modal, cart, search)",
    difficulty: "beginner",
    topics: ["use client", "Server Components", "Client Components", "composition"],
  },
  {
    id: "data-fetching",
    title: "Data fetching",
    slug: "data-fetching",
    summary: "When and how to fetch on the server vs client",
    difficulty: "beginner",
    topics: ["Server fetch", "Client fetch", "streaming", "caching"],
  },
];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
