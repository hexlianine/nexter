export type DataFlowKind = "server" | "client-boundary";

export type RequestStep = {
  step: number;
  label: string;
  filePath?: string;
  summary: string;
  responseType?: "HTML" | "JSON" | "Stream" | "Other";
  excerpt?: string;
};

export type RequestHandler = {
  filePath: string;
  summary: string;
  responseType: string;
  excerpt: string;
};

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
  requestSteps?: RequestStep[];
  handler?: RequestHandler;
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
          requestSteps: [
            {
              step: 1,
              label: "Route match",
              summary: "Match the incoming request path to the app root segment.",
              responseType: "HTML",
            },
            {
              step: 2,
              label: "Root layout",
              filePath: "app/layout.tsx",
              summary: "Compose the global layout shell around the route segment.",
              responseType: "HTML",
            },
            {
              step: 3,
              label: "Page render",
              filePath: "app/page.tsx",
              summary: "Render the route entry and assemble the HTML response.",
              responseType: "HTML",
              excerpt: "<main>...<section className=\"panel-grid\">",
            },
          ],
          handler: {
            filePath: "app/page.tsx",
            summary: "Server renders the page component and streams HTML to the client.",
            responseType: "HTML",
            excerpt: "export default function Page() {",
          },
        },
        {
          id: "route-groups",
          name: "(learning)/",
          kind: "folder",
          summary:
            "Route group for curriculum sections that should not appear in the URL.",
          notes: ["Helps organize without changing paths."],
          tags: ["route group"],
          status: "present",
          children: [
            {
              id: "learning-layout",
              name: "layout.tsx",
              kind: "file",
              summary: "Layout for the learning section only.",
              notes: ["Useful for a unique sidebar or navigation."],
              tags: ["special file"],
              status: "present",
              filePath: "app/(learning)/layout.tsx",
            },
            {
              id: "learning-learn",
              name: "learn/",
              kind: "folder",
              summary: "Learning track segment.",
              notes: ["Holds the overview page at /learn."],
              tags: ["route segment"],
              status: "present",
              children: [
                {
                  id: "learning-page",
                  name: "page.tsx",
                  kind: "file",
                  summary: "Overview page for the learning track.",
                  notes: ["Introduce goals and a checklist."],
                  tags: ["special file"],
                  status: "present",
                  route: "/learn",
                  filePath: "app/(learning)/learn/page.tsx",
                  dataFlow: "server",
                },
              ],
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
          status: "present",
          children: [
            {
              id: "dashboard-loading",
              name: "loading.tsx",
              kind: "file",
              summary: "Loading UI for this segment.",
              notes: ["Great for skeletons or spinners."],
              tags: ["special file"],
              status: "present",
              filePath: "app/dashboard/loading.tsx",
            },
            {
              id: "dashboard-page",
              name: "page.tsx",
              kind: "file",
              summary: "Dashboard landing page.",
              notes: ["Show progress, streaks, and goals."],
              tags: ["special file"],
              status: "present",
              route: "/dashboard",
              filePath: "app/dashboard/page.tsx",
              dataFlow: "server",
              requestSteps: [
                {
                  step: 1,
                  label: "Route match",
                  summary: "Match the incoming request to the /dashboard segment.",
                  responseType: "HTML",
                },
                {
                  step: 2,
                  label: "Root layout",
                  filePath: "app/layout.tsx",
                  summary: "Apply the global layout shell to the dashboard route.",
                  responseType: "HTML",
                },
                {
                  step: 3,
                  label: "Loading UI",
                  filePath: "app/dashboard/loading.tsx",
                  summary: "Show a loading state while the page prepares data.",
                  responseType: "HTML",
                  excerpt: "export default function Loading() {",
                },
                {
                  step: 4,
                  label: "Page render",
                  filePath: "app/dashboard/page.tsx",
                  summary: "Render the dashboard page and return HTML.",
                  responseType: "HTML",
                  excerpt: "export default function DashboardPage() {",
                },
              ],
              handler: {
                filePath: "app/dashboard/page.tsx",
                summary: "Renders the dashboard UI and streams HTML to the client.",
                responseType: "HTML",
                excerpt: "export default function DashboardPage() {",
              },
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
          status: "present",
          children: [
            {
              id: "api-progress",
              name: "progress/route.ts",
              kind: "file",
              summary: "Persist learning progress via an API route.",
              notes: ["Route handlers replace traditional API routes."],
              tags: ["route handler"],
              status: "present",
              route: "/api/progress",
              filePath: "app/api/progress/route.ts",
              dataFlow: "server",
              requestSteps: [
                {
                  step: 1,
                  label: "Route match",
                  summary: "Match the request to the API route handler.",
                  responseType: "JSON",
                },
                {
                  step: 2,
                  label: "Handler execution",
                  filePath: "app/api/progress/route.ts",
                  summary: "Run the route handler to read or update progress data.",
                  responseType: "JSON",
                  excerpt: "export async function POST() {",
                },
                {
                  step: 3,
                  label: "Response",
                  summary: "Return JSON payload to the client.",
                  responseType: "JSON",
                },
              ],
              handler: {
                filePath: "app/api/progress/route.ts",
                summary: "Handles POST/GET for progress updates and returns JSON.",
                responseType: "JSON",
                excerpt: "return Response.json({ ok: true });",
              },
            },
          ],
        },
        {
          id: "ui",
          name: "ui/",
          kind: "folder",
          summary:
            "Colocated UI components demonstrating Server and Client Component patterns.",
          notes: [
            "Use 'use client' directive at the top of files that need interactivity.",
            "Keep Client Components small to reduce JS bundle size.",
          ],
          tags: ["server components", "client components", "use client"],
          status: "concept",
          children: [
            {
              id: "ui-like-button",
              name: "like-button.tsx",
              kind: "file",
              summary:
                "Client Component with useState for interactive like functionality.",
              notes: [
                "Add 'use client' at the top to mark this as a Client Component.",
                "Use Client Components when you need state, event handlers, or browser APIs.",
                "Props passed from Server Components must be serializable.",
              ],
              tags: ["client component", "use client", "interactivity"],
              status: "present",
              filePath: "app/ui/like-button.tsx",
              dataFlow: "client-boundary",
            },
            {
              id: "ui-counter",
              name: "counter.tsx",
              kind: "file",
              summary:
                "Interactive counter demonstrating useState and onClick handlers.",
              notes: [
                "Client Components can use React hooks like useState and useEffect.",
                "Event handlers like onClick only work in Client Components.",
                "Once a file has 'use client', all its imports are part of the client bundle.",
              ],
              tags: ["client component", "hooks", "events"],
              status: "concept",
              dataFlow: "client-boundary",
            },
            {
              id: "ui-modal",
              name: "modal.tsx",
              kind: "file",
              summary:
                "Client Component wrapper that accepts Server Components as children.",
              notes: [
                "Use the children prop pattern to nest Server Components inside Client Components.",
                "This lets you keep server-rendered content while adding client-side interactivity.",
                "Server Components passed as children are rendered on the server first.",
              ],
              tags: ["client component", "composition", "children pattern"],
              status: "concept",
              dataFlow: "client-boundary",
            },
            {
              id: "ui-cart",
              name: "cart.tsx",
              kind: "file",
              summary:
                "Server Component that fetches cart data and can be nested inside Client Components.",
              notes: [
                "Server Components can fetch data directly without exposing secrets.",
                "Pass Server Components as children to Client Components for interleaving.",
                "This reduces client-side JavaScript while preserving interactivity.",
              ],
              tags: ["server component", "data fetching", "composition"],
              status: "concept",
              dataFlow: "server",
            },
            {
              id: "ui-search",
              name: "search.tsx",
              kind: "file",
              summary:
                "Client Component for search input with controlled state.",
              notes: [
                "Mark only the interactive search as 'use client' to keep the parent layout a Server Component.",
                "This pattern reduces JS bundle size by isolating client code.",
                "The rest of the layout remains server-rendered.",
              ],
              tags: ["client component", "bundle optimization", "isolation"],
              status: "concept",
              dataFlow: "client-boundary",
            },
          ],
        },
        {
          id: "providers",
          name: "theme-provider.tsx",
          kind: "file",
          summary:
            "Client Component context provider for sharing global state like themes.",
          notes: [
            "React context is not supported in Server Components.",
            "Create a Client Component provider that accepts children.",
            "Import and wrap children in a Server Component like layout.tsx.",
            "Render providers as deep as possible to optimize static Server Component rendering.",
          ],
          tags: ["context", "provider", "client component", "theme"],
          status: "concept",
          dataFlow: "client-boundary",
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

export const DEFAULT_EXPANDED = ["root", "app", "route-groups", "dashboard", "ui"]; 
