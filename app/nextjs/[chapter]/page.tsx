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
  "why-nextjs": [
    {
      id: "why-nextjs-article",
      title: "Why Next.js?",
      content: (
        <article className="gb-page-desc">
          <p>
            React is a fantastic library for building user interfaces, but when building complete web applications, you often encounter challenges like <strong>routing, data fetching, and performance optimization</strong>. Next.js is a React framework that solves these problems out of the box, providing a comprehensive toolkit to build modern web applications faster and more efficiently.
          </p>
          <br />
          <p>
            At its core, Next.js provides a structured <code>App Router</code> for seamless navigation, built-in features for Server Side Rendering (SSR), and Server Components to execute code securely back on the server before reaching the client. This means you ship less JavaScript, enjoy faster page loads, and have better SEO.
          </p>
          <br />
          <p>
            Whether you are building a static blog or a complex, full-stack application, Next.js scales with your needs seamlessly.
          </p>
        </article>
      ),
    },
    {
      id: "mental-model",
      title: "The Mental Model",
      content: (
        <div>
          <p className="gb-page-desc">
            With Next.js, consider components to be server-first by default. This reduces client-side bundles and pushes logic to the infrastructure. When you need interactivity (like `onClick` or `useState`), you opt into client-side code using the <code>"use client"</code> directive.
          </p>
          <CodeSnippet code={`// A server component by default
export default async function Page() {
  const data = await fetch("https://api.example.com/data").then(r => r.json());
  return <div>{data.message}</div>;
}`} />
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
        <li>How this concept works within Next.js.</li>
        <li>Where it shows up in real application architecture.</li>
        <li>How it improves user experience and developer pace.</li>
      </ul>
    ),
  },
  {
    id: "example",
    title: "Example",
    content: (
      <CodeSnippet code={`export default function ExamplePage() {
  return (
    <main>
      <h1>Next.js Example</h1>
      <p>This is a standard Server Component in the App Router.</p>
    </main>
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
            Try modifying a component in the <code>app/</code> directory to use Next.js specific features, such as data fetching in Server Components.
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
                href={`/nextjs/${prevChapter.slug}`}
                className="gb-page-nav-link gb-page-nav-link--prev"
              >
                <span className="gb-page-nav-label">Previous</span>
                <span className="gb-page-nav-title">
                  ← {prevChapter.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/nextjs"
                className="gb-page-nav-link gb-page-nav-link--prev"
              >
                <span className="gb-page-nav-label">Previous</span>
                <span className="gb-page-nav-title">← Introduction</span>
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/nextjs/${nextChapter.slug}`}
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
