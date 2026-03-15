export type DataFlowKind = "server" | "client-boundary";

export type Node = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  notes: string[];
  tags: string[];
  status?: "present" | "concept";
  route?: string;
  filePath?: string;
  dataFlow?: DataFlowKind;
  children?: Node[];
};

export const STRUCTURE: Node = {
  id: "root",
  name: "next-learning/",
  kind: "root",
  summary: "A practical learning sandbox that mirrors common Next.js conventions.",
  notes: [
    "Start with the App Router in the app/ directory and grow into route groups and nested layouts.",
  ],
  tags: ["app-router", "learning"],
  status: "present",
  children: [
    {
      id: "app",
      name: "app/",
      kind: "folder",
      summary:
        "App Router directory. Each folder is a route segment with its own layout, page, and loading states.",
      notes: [
        "Keep route groups in parentheses to organize without affecting URLs.",
        "Private folders start with an underscore to opt out of routing.",
      ],
      tags: ["route segments", "layouts", "loading"],
      status: "present",
      children: [
        {
          id: "app-layout",
          name: "layout.tsx",
          kind: "file",
          summary: "Root layout shared across all routes.",
          notes: ["Defines the HTML shell and global styling hooks."],
          tags: ["special file"],
          status: "present",
          route: "/",
          filePath: "app/layout.tsx",
          dataFlow: "server",
        },
        {
          id: "app-page",
          name: "page.tsx",
          kind: "file",
          summary: "The default route entry for a segment.",
          notes: ["Each segment can have its own page file."],
          tags: ["special file"],
          status: "present",
          route: "/",
          filePath: "app/page.tsx",
          dataFlow: "client-boundary",
        },
        {
          id: "route-groups",
          name: "(learning)/",
          kind: "folder",
          summary:
            "Route group for curriculum sections that should not appear in the URL.",
          notes: ["Helps organize without changing paths."],
          tags: ["route group"],
          status: "concept",
          children: [
            {
              id: "learning-layout",
              name: "layout.tsx",
              kind: "file",
              summary: "Layout for the learning section only.",
              notes: ["Useful for a unique sidebar or navigation."],
              tags: ["special file"],
              status: "concept",
            },
            {
              id: "learning-page",
              name: "page.tsx",
              kind: "file",
              summary: "Overview page for the learning track.",
              notes: ["Introduce goals and a checklist."],
              tags: ["special file"],
              status: "concept",
            },
          ],
        },
        {
          id: "dashboard",
          name: "dashboard/",
          kind: "folder",
          summary: "A protected area for authenticated lessons.",
          notes: ["Add nested layouts and loading UI here."],
          tags: ["route segment"],
          status: "concept",
          children: [
            {
              id: "dashboard-loading",
              name: "loading.tsx",
              kind: "file",
              summary: "Loading UI for this segment.",
              notes: ["Great for skeletons or spinners."],
              tags: ["special file"],
              status: "concept",
            },
            {
              id: "dashboard-page",
              name: "page.tsx",
              kind: "file",
              summary: "Dashboard landing page.",
              notes: ["Show progress, streaks, and goals."],
              tags: ["special file"],
              status: "concept",
            },
          ],
        },
        {
          id: "api",
          name: "api/",
          kind: "folder",
          summary: "Route handlers live here when using App Router APIs.",
          notes: ["Store handlers by feature area."],
          tags: ["route handlers"],
          status: "concept",
          children: [
            {
              id: "api-progress",
              name: "progress/route.ts",
              kind: "file",
              summary: "Persist learning progress via an API route.",
              notes: ["Route handlers replace traditional API routes."],
              tags: ["route handler"],
              status: "concept",
            },
          ],
        },
      ],
    },
    {
      id: "components",
      name: "components/",
      kind: "folder",
      summary: "Reusable UI building blocks colocated outside routes.",
      notes: ["Great for buttons, cards, and layout primitives."],
      tags: ["ui"],
      status: "concept",
      children: [
        {
          id: "components-course-card",
          name: "course-card.tsx",
          kind: "file",
          summary: "Card UI for each learning module.",
          notes: ["Keep it focused and composable."],
          tags: ["component"],
          status: "concept",
        },
      ],
    },
    {
      id: "lib",
      name: "lib/",
      kind: "folder",
      summary: "Business logic, helpers, and server-only modules.",
      notes: ["Store data fetching and auth utilities here."],
      tags: ["helpers"],
      status: "concept",
      children: [
        {
          id: "lib-data",
          name: "learning-data.ts",
          kind: "file",
          summary: "Curated lesson metadata and difficulty levels.",
          notes: ["Use strongly typed objects."],
          tags: ["data"],
          status: "concept",
        },
      ],
    },
    {
      id: "styles",
      name: "styles/",
      kind: "folder",
      summary: "Design tokens, themes, and global styles.",
      notes: ["Use this if you prefer a central styles folder."],
      tags: ["styling"],
      status: "concept",
      children: [
        {
          id: "styles-tokens",
          name: "tokens.css",
          kind: "file",
          summary: "Shared color and spacing variables.",
          notes: ["Import into globals or modules."],
          tags: ["css"],
          status: "concept",
        },
      ],
    },
    {
      id: "public",
      name: "public/",
      kind: "folder",
      summary: "Static assets like images, icons, and fonts.",
      notes: ["Served from the site root."],
      tags: ["static assets"],
      status: "concept",
      children: [
        {
          id: "public-hero",
          name: "learning-hero.png",
          kind: "file",
          summary: "Hero illustration for the landing page.",
          notes: ["Place static assets here."],
          tags: ["asset"],
          status: "concept",
        },
      ],
    },
    {
      id: "src",
      name: "src/",
      kind: "folder",
      summary:
        "Optional wrapper to keep source code separate from config and tooling.",
      notes: ["You can move app/, components/, and lib/ under src/."],
      tags: ["optional"],
      status: "concept",
      children: [],
    },
    {
      id: "config",
      name: "next.config.js",
      kind: "file",
      summary: "Framework configuration for Next.js.",
      notes: ["Add rewrites, images, and experimental flags."],
      tags: ["config"],
      status: "present",
      filePath: "next.config.js",
    },
    {
      id: "package-json",
      name: "package.json",
      kind: "file",
      summary: "Project scripts and dependency manifest.",
      notes: ["Use scripts like dev, build, and lint."],
      tags: ["tooling"],
      status: "present",
      filePath: "package.json",
    },
  ],
};

export const DEFAULT_EXPANDED = ["root", "app", "route-groups", "dashboard"]; 
