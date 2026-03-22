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
    id: "typescript-basics",
    title: "Type safety basics",
    slug: "type-safety-basics",
    summary: "Why types help and how to think in shapes, not strings.",
    level: "beginner",
    children: [
      {
        id: "type-inference",
        title: "Type inference",
        slug: "type-inference",
        summary: "Let TypeScript infer types, then tighten only when needed.",
        level: "beginner",
      },
      {
        id: "type-literals",
        title: "Literal types",
        slug: "literal-types",
        summary: "Use literal unions to lock in exact values.",
        level: "beginner",
      },
    ],
  },
  {
    id: "props-contracts",
    title: "Typed props & component contracts",
    slug: "typed-props",
    summary: "Define clear props and keep components self-documenting.",
    level: "beginner",
    children: [
      {
        id: "optional-props",
        title: "Optional vs required props",
        slug: "optional-props",
        summary: "Balance defaults with explicit requirements.",
        level: "beginner",
      },
      {
        id: "props-unions",
        title: "Props unions",
        slug: "props-unions",
        summary: "Model mutually exclusive prop sets safely.",
        level: "intermediate",
      },
    ],
  },
  {
    id: "server-data",
    title: "Typed server data",
    slug: "typed-server-data",
    summary: "Model API responses and server fetches with confidence.",
    level: "intermediate",
    children: [
      {
        id: "response-shapes",
        title: "Response shapes",
        slug: "response-shapes",
        summary: "Keep server payloads predictable and well-documented.",
        level: "intermediate",
      },
      {
        id: "error-unions",
        title: "Error unions",
        slug: "error-unions",
        summary: "Type success vs error responses explicitly.",
        level: "advanced",
      },
    ],
  },
  {
    id: "narrowing-guards",
    title: "Narrowing & type guards",
    slug: "narrowing-guards",
    summary: "Handle unknown data safely with narrowing and guards.",
    level: "intermediate",
    children: [
      {
        id: "user-defined-guards",
        title: "User-defined guards",
        slug: "user-defined-guards",
        summary: "Create reusable functions for safe narrowing.",
        level: "intermediate",
      },
      {
        id: "discriminated-unions",
        title: "Discriminated unions",
        slug: "discriminated-unions",
        summary: "Model complex states without unsafe casting.",
        level: "advanced",
      },
    ],
  },
];

export const LEVEL_LABELS: Record<ChapterLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
