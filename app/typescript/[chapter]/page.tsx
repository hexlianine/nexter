import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS, LEVEL_LABELS, type Chapter } from "../module-data";
import CodeSnippet from "../code-snippet";
import type { ReactNode } from "react";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

function flattenChapters(entries: Chapter[]): Chapter[] {
  return entries.flatMap((entry) =>
    entry.children?.length ? [entry, ...flattenChapters(entry.children)] : [entry]
  );
}

type ChapterSection = {
  id: string;
  title: string;
  content: ReactNode;
};

const CHAPTER_CONTENT: Record<string, ChapterSection[]> = {
  "type-safety-basics": [
    {
      id: "why-types",
      title: "Why type safety matters",
      content: (
        <p className="gb-page-desc">
          Type safety turns guesswork into guarantees. Instead of hoping runtime
          values match your expectations, you model them up front. That makes
          refactors calmer, onboarding faster, and bugs easier to spot before
          they ship.
        </p>
      ),
    },
    {
      id: "shape-thinking",
      title: "Think in shapes",
      content: (
        <div>
          <p className="gb-page-desc">
            Types are about the shape of data. Start by describing the fields you
            need, then let TypeScript infer the rest. When a value crosses a
            boundary (API response, props, form input), lock it down with a type.
          </p>
          <CodeSnippet code={`type Lesson = {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

const lessons: Lesson[] = [
  { id: "intro", title: "Intro to TS", difficulty: "beginner" },
];`} />
        </div>
      ),
    },
    {
      id: "boundaries",
      title: "Protect the boundaries",
      content: (
        <div>
          <p className="gb-page-desc">
            The most valuable types live at boundaries: API handlers, data fetch
            functions, and component props. That way, once data is inside your
            system, the rest of the code can assume it is correct.
          </p>
          <CodeSnippet code={`type ProgressResponse = {
  completed: number;
  total: number;
};

export async function GET() {
  const data: ProgressResponse = { completed: 2, total: 5 };
  return Response.json(data);
}`} />
        </div>
      ),
    },
    {
      id: "practice",
      title: "Practice",
      content: (
        <div className="gb-hint-box">
          <div className="gb-hint-icon">✏️</div>
          <div>
            <strong>Try it</strong>
            <p>
              Pick a component in <code>app/</code> and add a type for its props.
              Then tighten one prop with a string union (for example,
              <code> "primary" | "secondary"</code>) and note how the editor now
              guides your usage.
            </p>
          </div>
        </div>
      ),
    },
  ],
};

const DEFAULT_SECTIONS: ChapterSection[] = [
  {
    id: "what-you-will-learn",
    title: "What you will learn",
    content: (
      <ul className="gb-list">
        <li>How the TypeScript compiler understands this concept.</li>
        <li>Where it shows up in real Next.js components.</li>
        <li>What to watch for when data comes from an API.</li>
      </ul>
    ),
  },
  {
    id: "example",
    title: "Example",
    content: (
      <CodeSnippet code={`type Chapter = {
  title: string;
  summary: string;
};

function ChapterCard({ title, summary }: Chapter) {
  return (
    <article>
      <h4>{title}</h4>
      <p>{summary}</p>
    </article>
  );
}`} />
    ),
  },
  {
    id: "practice",
    title: "Practice",
    content: (
      <div className="gb-hint-box">
        <div className="gb-hint-icon">✏️</div>
        <div>
          <strong>Practice</strong>
          <p>
            Take a component in <code>app/</code> and add a prop type that
            explains which values are optional vs required. Write a short note
            about how the type improves the component API.
          </p>
        </div>
      </div>
    ),
  },
];

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterSlug } = await params;
  const allChapters = flattenChapters(CHAPTERS);
  const chapterIndex = allChapters.findIndex(
    (entry) => entry.slug === chapterSlug
  );

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = allChapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? allChapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < allChapters.length - 1
      ? allChapters[chapterIndex + 1]
      : null;
  const sections =
    CHAPTER_CONTENT[chapter.slug] ?? DEFAULT_SECTIONS;

  return (
    <>
      <div className="gb-chapter-layout">
        <div className="gb-chapter-content">
          <div className="gb-chapter-badge-row">
            <span
              className={`gb-chapter-level gb-chapter-level--${chapter.level}`}
            >
              {LEVEL_LABELS[chapter.level]}
            </span>
          </div>

          <h1 className="gb-page-title">{chapter.title}</h1>
          <p className="gb-page-desc">{chapter.summary}</p>

          <hr className="gb-divider" />

          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="gb-section-title">{section.title}</h2>
              {section.content}
            </section>
          ))}

          <div className="gb-page-nav">
            {prevChapter ? (
              <Link
                href={`/typescript/${prevChapter.slug}`}
                className="gb-page-nav-link gb-page-nav-link--prev"
              >
                <span className="gb-page-nav-label">Previous</span>
                <span className="gb-page-nav-title">
                  ← {prevChapter.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/typescript"
                className="gb-page-nav-link gb-page-nav-link--prev"
              >
                <span className="gb-page-nav-label">Previous</span>
                <span className="gb-page-nav-title">← Introduction</span>
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/typescript/${nextChapter.slug}`}
                className="gb-page-nav-link gb-page-nav-link--next"
              >
                <span className="gb-page-nav-label">Next</span>
                <span className="gb-page-nav-title">
                  {nextChapter.title} →
                </span>
              </Link>
            )}
          </div>
        </div>
        <aside className="gb-toc" aria-label="Table of contents">
          <div className="gb-toc-title">On this page</div>
          <nav className="gb-toc-links">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
