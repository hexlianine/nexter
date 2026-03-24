"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_EXPANDED, STRUCTURE, type DataFlowKind, type Node } from "./data";
import CodePreview from "./ui/code-preview";

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

const FLOW_LABELS: Record<DataFlowKind, string> = {
  server: "Server-first data flow",
  "client-boundary": "Client boundary data flow",
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(DEFAULT_EXPANDED)
  );
  const [selectedId, setSelectedId] = useState("app");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileContentLoading, setFileContentLoading] = useState(false);
  const [fileContentError, setFileContentError] = useState<string | null>(null);

  const allNodes = useMemo(() => FLATTEN(STRUCTURE as Node), []);
  const selected =
    allNodes.find((node) => node.id === selectedId) ?? (STRUCTURE as Node);

  const fetchFileContent = useCallback(async (filePath: string) => {
    setFileContentLoading(true);
    setFileContentError(null);
    setFileContent(null);
    try {
      const res = await fetch(
        `/api/file-content?path=${encodeURIComponent(filePath)}`
      );
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setFileContentError("sign-in-required");
        } else {
          setFileContentError(data.error ?? "Failed to load file");
        }
        return;
      }
      setFileContent(data.content);
    } catch {
      setFileContentError("Failed to load file");
    } finally {
      setFileContentLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selected.filePath) {
      fetchFileContent(selected.filePath);
    } else {
      setFileContent(null);
      setFileContentError(null);
    }
  }, [selected.filePath, fetchFileContent]);

  const filteredTree = useMemo(() => {
    if (!query) return STRUCTURE as Node;
    return filterTree(STRUCTURE as Node, query) ?? (STRUCTURE as Node);
  }, [query]);

  const selectedFlow: DataFlowKind =
    selected.dataFlow ?? "server";

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
          {node.status ? (
            <span className={`tree-status ${node.status}`}>{node.status}</span>
          ) : null}
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
            Explore a hands-on project structure inspired by the{" "}
            <a href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer">
              App Router
            </a>
            . Click any folder or file to see why it exists, then expand the tree to
            map how{" "}
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts"
              target="_blank"
              rel="noreferrer"
            >
              routes and layouts
            </a>{" "}
            fit together. Learn when to use{" "}
            <a
              href="https://nextjs.org/docs/app/getting-started/server-and-client-components"
              target="_blank"
              rel="noreferrer"
            >
              Server and Client Components
            </a>
            .
          </p>
        </div>
        <div className="hero-card">
          <strong>What this teaches:</strong>
          <div className="badges">
            <Link href="/learn" className="badge badge-link">
              Learning overview →
            </Link>
            <Link href="/nextjs" className="badge badge-link">
              Next.js module →
            </Link>
            <span className="badge">App Router basics</span>
            <span className="badge">Route groups</span>
            <span className="badge">Special files</span>
            <span className="badge">Server & Client Components</span>
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
          <h2 className="selected-title">
            <span>Selected: {selected.name}</span>
            {selected.route === "/dashboard" ? (
              <Link
                href="/dashboard"
                className="selected-link"
                aria-label="Open dashboard page"
                title="Open /dashboard"
              >
                <LayoutDashboard aria-hidden="true" />
              </Link>
            ) : selected.route === "/learn" ? (
              <Link
                href="/learn"
                className="selected-link"
                aria-label="Open learning overview"
                title="Open /learn"
              >
                <BookOpen aria-hidden="true" />
              </Link>
            ) : null}
          </h2>
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
          {selected.filePath ? (
            <div className="detail-card">
              <h3>Source code</h3>
              <p className="mapping-value" style={{ marginBottom: 8 }}>
                {selected.filePath}
              </p>
              {fileContentLoading ? (
                <p className="detail-empty">Loading...</p>
              ) : fileContentError === "sign-in-required" ? (
                <p className="detail-empty">
                  <Link href="/login">Sign in</Link> to view file content.
                </p>
              ) : fileContentError ? (
                <p className="detail-empty">{fileContentError}</p>
              ) : fileContent ? (
                <CodePreview
                  code={fileContent}
                  filePath={selected.filePath}
                  requestSteps={selected.requestSteps}
                />
              ) : null}
            </div>
          ) : null}
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
          <div className="detail-card">
            <h3>Request path + file mapping</h3>
            <div className="mapping-grid">
              <div>
                <span className="mapping-label">Route</span>
                <span className="mapping-value">
                  {selected.route ?? "Not a route entry"}
                </span>
              </div>
              <div>
                <span className="mapping-label">File</span>
                <span className="mapping-value">
                  {selected.filePath ?? "Not a file-backed node"}
                </span>
              </div>
              <div>
                <span className="mapping-label">Data boundary</span>
                <span className="mapping-value">
                  {selected.dataFlow ?? "Server component by default"}
                </span>
              </div>
              <div>
                <span className="mapping-label">Status</span>
                <span className="mapping-value">
                  {selected.status ?? "concept"}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <h3>Request steps</h3>
            {selected.requestSteps && selected.requestSteps.length > 0 ? (
              <ol className="steps">
                {selected.requestSteps.map((step) => (
                  <li key={`${selected.id}-step-${step.step}`} className="step-item">
                    <span className="step-number">{step.step}</span>
                    <div className="step-body">
                      <div className="step-header">
                        <span className="step-label">{step.label}</span>
                        {step.responseType ? (
                          <span className="step-response">{step.responseType}</span>
                        ) : null}
                      </div>
                      {step.filePath ? (
                        <div className="step-file">{step.filePath}</div>
                      ) : null}
                      <p className="step-summary">{step.summary}</p>
                      {step.excerpt ? (
                        <pre className="step-excerpt">
                          <code>{step.excerpt}</code>
                        </pre>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="detail-empty">Not a route entry.</p>
            )}
          </div>
          <div className="detail-card">
            <h3>Handler + response</h3>
            {selected.handler ? (
              <div className="handler-grid">
                <div>
                  <span className="mapping-label">Handler file</span>
                  <span className="mapping-value">{selected.handler.filePath}</span>
                </div>
                <div>
                  <span className="mapping-label">Response type</span>
                  <span className="mapping-value">{selected.handler.responseType}</span>
                </div>
                <div className="handler-summary">
                  <span className="mapping-label">Summary</span>
                  <p>{selected.handler.summary}</p>
                </div>
                <div className="handler-excerpt">
                  <span className="mapping-label">Excerpt</span>
                  <pre className="code-block">
                    <code>{selected.handler.excerpt}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <p className="detail-empty">Not a route entry.</p>
            )}
          </div>
          <div className="detail-card">
            <h3>{FLOW_LABELS[selectedFlow]}</h3>
            {selectedFlow === "server" ? (
              <svg viewBox="0 0 560 180" className="flow-chart" role="img" aria-label="Server data flow">
                <rect x="16" y="28" width="140" height="44" rx="12" />
                <text x="86" y="50">Request</text>
                <rect x="200" y="28" width="160" height="44" rx="12" />
                <text x="280" y="50">Route Match</text>
                <rect x="392" y="28" width="152" height="44" rx="12" />
                <text x="468" y="50">Layout</text>
                <rect x="16" y="112" width="140" height="44" rx="12" />
                <text x="86" y="134">Page</text>
                <rect x="200" y="112" width="160" height="44" rx="12" />
                <text x="280" y="134">Server Fetch</text>
                <rect x="392" y="112" width="152" height="44" rx="12" />
                <text x="468" y="134">HTML</text>
                <path d="M156 50 H200" />
                <path d="M360 50 H392" />
                <path d="M468 72 V112" />
                <path d="M156 134 H200" />
                <path d="M360 134 H392" />
              </svg>
            ) : (
              <svg viewBox="0 0 560 200" className="flow-chart" role="img" aria-label="Client boundary data flow">
                <rect x="16" y="28" width="140" height="44" rx="12" />
                <text x="86" y="50">Request</text>
                <rect x="200" y="28" width="160" height="44" rx="12" />
                <text x="280" y="50">Route Match</text>
                <rect x="392" y="28" width="152" height="44" rx="12" />
                <text x="468" y="50">Layout</text>
                <rect x="16" y="120" width="140" height="44" rx="12" />
                <text x="86" y="142">Page</text>
                <rect x="200" y="120" width="160" height="44" rx="12" />
                <text x="280" y="142">Client Boundary</text>
                <rect x="392" y="120" width="152" height="44" rx="12" />
                <text x="468" y="142">Hydrate</text>
                <rect x="200" y="168" width="160" height="28" rx="10" />
                <text x="280" y="186">Client Fetch</text>
                <path d="M156 50 H200" />
                <path d="M360 50 H392" />
                <path d="M468 72 V120" />
                <path d="M156 142 H200" />
                <path d="M360 142 H392" />
                <path d="M280 164 V168" />
              </svg>
            )}
            <p className="flow-hint">
              This chart switches based on the selected node. For route files,
              you can see where data is allowed to run.
            </p>
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
