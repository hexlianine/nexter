import Link from "next/link";
import { CHAPTERS, LEVEL_LABELS } from "./module-data";

export default function TypeScriptOverviewPage() {
  return (
    <>
      <h1 className="gb-page-title">TypeScript Handbook</h1>
      <p className="gb-page-desc">
        A standalone learning module focused on TypeScript fundamentals for
        modern Next.js projects. Each chapter builds on the last — work through
        them in order or jump directly to a topic.
      </p>

      <div className="gb-hint-box">
        <div className="gb-hint-icon">💡</div>
        <div>
          <strong>How this guide works</strong>
          <p>
            Use the sidebar to navigate between chapters. Each chapter is a
            standalone page you can extend with richer content, exercises, or
            interactive demos whenever you&apos;re ready.
          </p>
        </div>
      </div>

      <h2 className="gb-section-title">Chapters</h2>

      <div className="gb-chapter-list">
        {CHAPTERS.map((chapter, index) => (
          <Link
            key={chapter.id}
            href={`/typescript/${chapter.slug}`}
            className="gb-chapter-item"
          >
            <span className="gb-chapter-number">{index + 1}</span>
            <div className="gb-chapter-body">
              <span className="gb-chapter-title">{chapter.title}</span>
              <span className="gb-chapter-summary">{chapter.summary}</span>
            </div>
            <span
              className={`gb-chapter-level gb-chapter-level--${chapter.level}`}
            >
              {LEVEL_LABELS[chapter.level]}
            </span>
          </Link>
        ))}
      </div>

      <div className="gb-hint-box gb-hint-box--info">
        <div className="gb-hint-icon">📘</div>
        <div>
          <strong>Expanding the handbook</strong>
          <p>
            Add a new entry to{" "}
            <code>app/typescript/module-data.ts</code> and create a matching
            route under <code>app/typescript/[chapter]</code> — the sidebar
            updates automatically.
          </p>
        </div>
      </div>

      <div className="gb-page-nav">
        <span />
        {CHAPTERS.length > 0 && (
          <Link
            href={`/typescript/${CHAPTERS[0].slug}`}
            className="gb-page-nav-link gb-page-nav-link--next"
          >
            <span className="gb-page-nav-label">Next</span>
            <span className="gb-page-nav-title">
              {CHAPTERS[0].title} →
            </span>
          </Link>
        )}
      </div>
    </>
  );
}
