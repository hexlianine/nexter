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
  {
    id: "routing-layouts",
    title: "Routing & layouts",
    slug: "routing-layouts",
    summary:
      "Route segments, nested layouts, and how (learning) route groups work",
    difficulty: "beginner",
    topics: ["route segments", "layouts", "route groups", "nested routes"],
  },
  {
    id: "api-routes",
    title: "API routes",
    slug: "api-routes",
    summary: "Walk through /api/progress and Route Handlers in the App Router",
    difficulty: "beginner",
    topics: ["Route Handlers", "GET", "POST", "JSON response"],
  },
  {
    id: "loading-states",
    title: "Loading states",
    slug: "loading-states",
    summary: "loading.tsx, Suspense, and streaming UI in the App Router",
    difficulty: "beginner",
    topics: ["loading.tsx", "Suspense", "streaming", "skeleton UI"],
  },
];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
