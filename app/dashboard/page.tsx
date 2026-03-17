"use client";

import { useMemo, useState } from "react";
import { STRUCTURE, type Node, type RequestStep } from "../data";
import ProgressWidget from "../ui/progress-widget";

const findNodeById = (node: Node, id: string): Node | null => {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const match = findNodeById(child, id);
    if (match) return match;
  }
  return null;
};

export default function DashboardPage() {
  const dashboardNode = useMemo(
    () => findNodeById(STRUCTURE, "dashboard-page") ?? STRUCTURE,
    []
  );
  const steps = dashboardNode.requestSteps ?? [];
  const [selectedStep, setSelectedStep] = useState<RequestStep | null>(
    steps[0] ?? null
  );
  const [showExcerpts, setShowExcerpts] = useState(true);

  return (
    <main>
      <section className="hero">
        <div>
          <h1>How Next.js Handles /dashboard</h1>
          <p>
            This page breaks down how the{" "}
            <a href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer">
              App Router
            </a>{" "}
            resolves a request to
            <strong> {dashboardNode.route ?? "/dashboard"}</strong> and renders
            <strong> {dashboardNode.filePath ?? "app/dashboard/page.tsx"}</strong>.
            Select a step to see where files participate in the request lifecycle.
          </p>
        </div>
        <div className="hero-card">
          <ProgressWidget />
        </div>
        <div className="hero-card">
          <strong>Quick facts</strong>
          <div className="badges">
            <span className="badge">Route: {dashboardNode.route ?? "/dashboard"}</span>
            <span className="badge">File: {dashboardNode.filePath ?? "app/dashboard/page.tsx"}</span>
            <span className="badge">
              Data flow: {dashboardNode.dataFlow ?? "mixed (server + client)"}
            </span>
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <div className="tree-panel">
          <div className="detail-card">
            <h3>Why this page exists</h3>
            <p>{dashboardNode.summary}</p>
            <ul>
              {dashboardNode.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="detail-card">
            <h3>Request mapping</h3>
            <div className="mapping-grid">
              <div>
                <span className="mapping-label">Route</span>
                <span className="mapping-value">
                  {dashboardNode.route ?? "Not a route entry"}
                </span>
              </div>
              <div>
                <span className="mapping-label">File</span>
                <span className="mapping-value">
                  {dashboardNode.filePath ?? "Not a file-backed node"}
                </span>
              </div>
              <div>
                <span className="mapping-label">Data boundary</span>
                <span className="mapping-value">
                  {dashboardNode.dataFlow ?? "Client boundary at page.tsx"}
                </span>
              </div>
              <div>
                <span className="mapping-label">Status</span>
                <span className="mapping-value">
                  {dashboardNode.status ?? "concept"}
                </span>
              </div>
            </div>
          </div>
          <div className="detail-card">
            <h3>Tags</h3>
            <div className="tag-list">
              {dashboardNode.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-card">
            <div className="controls" style={{ marginBottom: 0 }}>
              <button onClick={() => setShowExcerpts((prev) => !prev)}>
                {showExcerpts ? "Hide code excerpts" : "Show code excerpts"}
              </button>
            </div>
          </div>
          <div className="detail-card">
            <h3>Request steps</h3>
            {steps.length === 0 ? (
              <p className="detail-empty">No steps configured yet.</p>
            ) : (
              <ul className="steps">
                {steps.map((step) => {
                  const isActive = selectedStep?.step === step.step;
                  return (
                    <li
                      key={`${dashboardNode.id}-step-${step.step}`}
                      className="step-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedStep(step)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedStep(step);
                        }
                      }}
                      style={{
                        cursor: "pointer",
                        background: isActive ? "#fde7d8" : undefined,
                        borderColor: isActive ? "#f3c7ae" : undefined,
                      }}
                      aria-pressed={isActive}
                    >
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
                        {showExcerpts && step.excerpt ? (
                          <pre className="step-excerpt">
                            <code>{step.excerpt}</code>
                          </pre>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <aside className="detail-panel">
          <h2>Selected step</h2>
          {selectedStep ? (
            <div className="detail-card">
              <h3>
                Step {selectedStep.step}: {selectedStep.label}
              </h3>
              <p>{selectedStep.summary}</p>
              <div className="mapping-grid" style={{ marginTop: 12 }}>
                <div>
                  <span className="mapping-label">File</span>
                  <span className="mapping-value">
                    {selectedStep.filePath ?? "Not file-specific"}
                  </span>
                </div>
                <div>
                  <span className="mapping-label">Response</span>
                  <span className="mapping-value">
                    {selectedStep.responseType ?? "HTML"}
                  </span>
                </div>
              </div>
              {showExcerpts && selectedStep.excerpt ? (
                <pre className="step-excerpt" style={{ marginTop: 12 }}>
                  <code>{selectedStep.excerpt}</code>
                </pre>
              ) : null}
            </div>
          ) : (
            <p className="detail-empty">Select a request step to see details.</p>
          )}

          <div className="detail-card">
            <h3>Handler + response</h3>
            {dashboardNode.handler ? (
              <div className="handler-grid">
                <div>
                  <span className="mapping-label">Handler file</span>
                  <span className="mapping-value">{dashboardNode.handler.filePath}</span>
                </div>
                <div>
                  <span className="mapping-label">Response type</span>
                  <span className="mapping-value">{dashboardNode.handler.responseType}</span>
                </div>
                <div className="handler-summary">
                  <span className="mapping-label">Summary</span>
                  <p>{dashboardNode.handler.summary}</p>
                </div>
                <div className="handler-excerpt">
                  <span className="mapping-label">Excerpt</span>
                  <pre className="code-block">
                    <code>{dashboardNode.handler.excerpt}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <p className="detail-empty">Not a route entry.</p>
            )}
          </div>

          <div className="detail-card">
            <h3>Server + client data flow</h3>
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
            <p className="flow-hint">
              This page is a{" "}
              <a
                href="https://nextjs.org/docs/app/api-reference/directives/use-client"
                target="_blank"
                rel="noreferrer"
              >
                Client Component
              </a>
              , so it hydrates in the browser after the server streams HTML. The
              request still routes through layouts and can include{" "}
              <a
                href="https://nextjs.org/docs/app/building-your-application/data-fetching"
                target="_blank"
                rel="noreferrer"
              >
                server data fetching
              </a>{" "}
              before the page becomes interactive.
            </p>
          </div>
          <div className="detail-card">
            <h3>ASCII request flow</h3>
            <pre className="code-block" aria-label="ASCII data flow diagram">
              <code>{`[User Browser]
     |
     | 1) HTTP request (GET /dashboard)
     v
[Next.js Server]
     |
     | 2) Route match + layout + page render
     | 3) (Optional) Server data fetch
     v
[HTML Response]
     |
     | 4) Stream/Send HTML to browser
     v
[User Browser]
     |
     | 5) Hydration (client boundary)
     v
[Interactive UI]`}</code>
            </pre>
          </div>
        </aside>
      </section>
    </main>
  );
}
