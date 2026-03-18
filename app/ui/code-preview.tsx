"use client";

import { useCallback, useMemo, useState } from "react";
import { Copy, Search } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "./theme-provider";
import type { RequestStep } from "../data";

const EXT_TO_LANG: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".css": "css",
  ".json": "json",
  ".md": "markdown",
};

function getLanguage(filePath: string): string {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return EXT_TO_LANG[ext] ?? "plaintext";
}

function findLinesMatchingExcerpts(code: string, steps: RequestStep[], filePath: string): Set<number> {
  const lines = code.split("\n");
  const highlighted = new Set<number>();

  for (const step of steps) {
    if (step.filePath !== filePath || !step.excerpt) continue;

    const needle = step.excerpt.trim();
    if (!needle) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(needle)) {
        highlighted.add(i + 1);
        break;
      }
    }
  }

  return highlighted;
}

type Props = {
  code: string;
  filePath: string;
  requestSteps?: RequestStep[];
};

export default function CodePreview({ code, filePath, requestSteps = [] }: Props) {
  const language = getLanguage(filePath);
  const { theme } = useTheme();
  const prismTheme = theme === "dark" ? themes.nightOwl : themes.github;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [copied, setCopied] = useState(false);

  const highlightedLines = useMemo(
    () => findLinesMatchingExcerpts(code, requestSteps, filePath),
    [code, requestSteps, filePath],
  );

  const lines = useMemo(() => code.split("\n"), [code]);

  const filteredLines = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return new Set(
      lines
        .map((line, i) => (line.toLowerCase().includes(q) ? i + 1 : null))
        .filter((n): n is number => n !== null),
    );
  }, [lines, searchQuery]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard fail */
    }
  }, [code]);

  const hasHighlights = highlightedLines.size > 0;
  const hasSearch = searchQuery.trim().length > 0;

  return (
    <div className="code-preview-wrap">
      <div className="code-preview-toolbar">
        <div className="code-preview-actions">
          <button
            type="button"
            className="code-preview-btn"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Toggle search"
            aria-pressed={showSearch}
            title="Search in code"
          >
            <Search size={14} aria-hidden />
          </button>
          <button
            type="button"
            className="code-preview-btn"
            onClick={copyCode}
            aria-label="Copy code"
            title="Copy to clipboard"
          >
            <Copy size={14} aria-hidden />
            {copied ? <span className="code-preview-copied">Copied</span> : null}
          </button>
        </div>
        {showSearch ? (
          <div className="code-preview-search">
            <input
              type="search"
              placeholder="Filter lines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="code-preview-search-input"
              aria-label="Filter lines in code"
              autoFocus
            />
          </div>
        ) : null}
      </div>
      <div className="code-preview-scroll">
        <Highlight theme={prismTheme} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} code-preview`}
              style={style}
              aria-label={`Source code for ${filePath}`}
            >
              {tokens.map((line, i) => {
                const lineNum = i + 1;
                const isStepHighlight = hasHighlights && highlightedLines.has(lineNum);
                const isSearchMatch = hasSearch && filteredLines?.has(lineNum);
                const isHidden = hasSearch && filteredLines && !filteredLines.has(lineNum);

                return (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    data-line={lineNum}
                    className={[
                      isStepHighlight ? "code-preview-line-highlight" : "",
                      isSearchMatch ? "code-preview-line-search-match" : "",
                      isHidden ? "code-preview-line-hidden" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="code-preview-line-num" aria-hidden>
                      {lineNum}
                    </span>
                    <span className="code-preview-line-content">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
