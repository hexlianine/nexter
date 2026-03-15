"use client";

import { useMemo, useState } from "react";

const STRUCTURE = {
  id: "root",
  name: "next-learning/",
  kind: "root",
  summary: "A practical learning sandbox that mirrors common Next.js conventions.",
  notes: [
    "Start with the App Router in the app/ directory and grow into route groups and nested layouts.",
  ],
  tags: ["app-router", "learning"],
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
      children: [
        {
          id: "app-layout",
          name: "layout.tsx",
          kind: "file",
          summary: "Root layout shared across all routes.",
          notes: ["Defines the HTML shell and global styling hooks."],
          tags: ["special file"],
        },
        {
          id: "app-page",
          name: "page.tsx",
          kind: "file",
          summary: "The default route entry for a segment.",
          notes: ["Each segment can have its own page file."],
          tags: ["special file"],
        },
        {
          id: "route-groups",
          name: "(learning)/",
          kind: "folder",
          summary:
            "Route group for curriculum sections that should not appear in the URL.",
          notes: ["Helps organize without changing paths."],
          tags: ["route group"],
          children: [
            {
              id: "learning-layout",
              name: "layout.tsx",
              kind: "file",
              summary: "Layout for the learning section only.",
              notes: ["Useful for a unique sidebar or navigation."],
              tags: ["special file"],
            },
            {
              id: "learning-page",
              name: "page.tsx",
              kind: "file",
              summary: "Overview page for the learning track.",
              notes: ["Introduce goals and a checklist."],
              tags: ["special file"],
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
          children: [
            {
              id: "dashboard-loading",
              name: "loading.tsx",
              kind: "file",
              summary: "Loading UI for this segment.",
              notes: ["Great for skeletons or spinners."],
              tags: ["special file"],
            },
            {
              id: "dashboard-page",
              name: "page.tsx",
              kind: "file",
              summary: "Dashboard landing page.",
              notes: ["Show progress, streaks, and goals."],
              tags: ["special file"],
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
          children: [
            {
              id: "api-progress",
              name: "progress/route.ts",
              kind: "file",
              summary: "Persist learning progress via an API route.",
              notes: ["Route handlers replace traditional API routes."],
              tags: ["route handler"],
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
      children: [
        {
          id: "components-course-card",
          name: "course-card.tsx",
          kind: "file",
          summary: "Card UI for each learning module.",
          notes: ["Keep it focused and composable."],
          tags: ["component"],
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
      children: [
        {
          id: "lib-data",
          name: "learning-data.ts",
          kind: "file",
          summary: "Curated lesson metadata and difficulty levels.",
          notes: ["Use strongly typed objects."],
          tags: ["data"],
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
      children: [
        {
          id: "styles-tokens",
          name: "tokens.css",
          kind: "file",
          summary: "Shared color and spacing variables.",
          notes: ["Import into globals or modules."],
          tags: ["css"],
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
      children: [
        {
          id: "public-hero",
          name: "learning-hero.png",
          kind: "file",
          summary: "Hero illustration for the landing page.",
          notes: ["Place static assets here."],
          tags: ["asset"],
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
      children: [],
    },
    {
      id: "config",
      name: "next.config.js",
      kind: "file",
      summary: "Framework configuration for Next.js.",
      notes: ["Add rewrites, images, and experimental flags."],
      tags: ["config"],
    },
    {
      id: "package-json",
      name: "package.json",
      kind: "file",
      summary: "Project scripts and dependency manifest.",
      notes: ["Use scripts like dev, build, and lint."],
      tags: ["tooling"],
    },
  ],
} as const;

type Node = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  notes: string[];
  tags: string[];
  children?: Node[];
};

const FLATTEN = (node: Node): Node[] => {
  const children = node.children ?? [];
  return [node, ...children.flatMap(FLATTEN)];
};

const collectAllIds = (node: Node): string[] =>
  [node.id, ...(node.children ?? []).flatMap(collectAllIds)];

const matchesQuery = (node: Node, query: string) => {
  if (!query) return true;
  const value = `${node.name} ${node.summary} ${node.tags.join(" ")}`.toLowerCase();
  return value.includes(query.toLowerCase());
};

const filterTree = (node: Node, query: string): Node | null => {
  const children = (node.children ?? [])
    .map((child) => filterTree(child, query))
    .filter(Boolean) as Node[];

  if (matchesQuery(node, query) || children.length > 0) {
    return { ...node, children };
  }

  return null;
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["root", "app", "route-groups", "dashboard"])
  );
  const [selectedId, setSelectedId] = useState("app");

  const filteredTree = useMemo(() => {
    if (!query) return STRUCTURE as Node;
    return filterTree(STRUCTURE as Node, query) ?? (STRUCTURE as Node);
  }, [query]);

  const allNodes = useMemo(() => FLATTEN(STRUCTURE as Node), []);
  const selected = allNodes.find((node) => node.id === selectedId) ??
    (STRUCTURE as Node);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const setAllExpanded = (value: boolean) => {
    if (value) {
      setExpanded(new Set(collectAllIds(STRUCTURE as Node)));
    } else {
      setExpanded(new Set(["root"]));
    }
  };

  const renderNode = (node: Node) => {
    const children = node.children ?? [];
    const hasChildren = children.length > 0;
    const isExpanded = expanded.has(node.id);

    return (
      <li key={node.id}>
        <div
          className={`tree-item ${selectedId === node.id ? "selected" : ""}`}
        >
          <button
            className="tree-button"
            onClick={() => toggleExpanded(node.id)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {hasChildren ? (isExpanded ? "▾" : "▸") : "•"}
          </button>
          <button
            className="tree-label"
            onClick={() => setSelectedId(node.id)}
          >
            {node.name}
          </button>
          <span className="tree-kind">{node.kind}</span>
        </div>
        {hasChildren && isExpanded ? (
          <ul className="tree-children">{children.map(renderNode)}</ul>
        ) : null}
      </li>
    );
  };

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Learn Next.js With a Living Project Tree</h1>
          <p>
            Explore a hands-on project structure inspired by the App Router. Click
            any folder or file to see why it exists, then expand the tree to map
            how routes, layouts, and assets fit together.
          </p>
        </div>
        <div className="hero-card">
          <strong>What this teaches:</strong>
          <div className="badges">
            <span className="badge">App Router basics</span>
            <span className="badge">Route groups</span>
            <span className="badge">Special files</span>
            <span className="badge">Static assets</span>
            <span className="badge">Organizing code</span>
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <div className="tree-panel">
          <div className="controls">
            <input
              placeholder="Filter nodes (ex: layout, public, route)"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button onClick={() => setAllExpanded(true)}>Expand all</button>
            <button onClick={() => setAllExpanded(false)}>Collapse</button>
          </div>
          <ul className="tree">{renderNode(filteredTree as Node)}</ul>
        </div>

        <aside className="detail-panel">
          <h2>Selected: {selected.name}</h2>
          <div className="detail-card">
            <h3>Why it exists</h3>
            <p>{selected.summary}</p>
          </div>
          <div className="detail-card">
            <h3>Learning notes</h3>
            <ul>
              {selected.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="detail-card">
            <h3>Tags</h3>
            <div className="tag-list">
              {selected.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p>
            Tip: Use <kbd>Ctrl</kbd> + <kbd>F</kbd> to jump to a folder, then click
            to explore.
          </p>
        </aside>
      </section>

      <footer>
        Built to mirror Next.js conventions while keeping room for experimentation.
      </footer>
    </main>
  );
}
