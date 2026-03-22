"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHAPTERS, type Chapter } from "./module-data";

function flattenChapters(entries: Chapter[]): Chapter[] {
  return entries.flatMap((entry) =>
    entry.children?.length ? [entry, ...flattenChapters(entry.children)] : [entry]
  );
}

function NavSection({
  chapter,
  pathname,
}: {
  chapter: Chapter;
  pathname: string;
}) {
  const isParentActive = pathname === `/typescript/${chapter.slug}`;
  const hasChildren = chapter.children && chapter.children.length > 0;

  return (
    <div className="gb-nav-group">
      <Link
        href={`/typescript/${chapter.slug}`}
        className={`gb-nav-link${isParentActive ? " gb-nav-link--active" : ""}`}
      >
        {chapter.title}
      </Link>
      {hasChildren && (
        <div className="gb-nav-children">
          {chapter.children!.map((child) => {
            const isActive = pathname === `/typescript/${child.slug}`;
            return (
              <Link
                key={child.id}
                href={`/typescript/${child.slug}`}
                className={`gb-nav-link${isActive ? " gb-nav-link--active" : ""}`}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TypeScriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="gb-layout">
      <aside className="gb-sidebar">
        <Link href="/typescript" className="gb-brand">
          <span className="gb-brand-icon">TS</span>
          <span className="gb-brand-label">TypeScript Handbook</span>
        </Link>

        <div className="gb-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search…</span>
          <kbd>⌘K</kbd>
        </div>

        <nav className="gb-nav">
          <div className="gb-nav-section-label">Getting Started</div>
          <Link
            href="/typescript"
            className={`gb-nav-link${pathname === "/typescript" ? " gb-nav-link--active" : ""}`}
          >
            Introduction
          </Link>

          <div className="gb-nav-section-label">Chapters</div>
          {CHAPTERS.map((chapter) => (
            <NavSection key={chapter.id} chapter={chapter} pathname={pathname} />
          ))}

          <div className="gb-nav-section-label">Links</div>
          <Link href="/" className="gb-nav-link">
            ← Project Home
          </Link>
        </nav>
      </aside>

      <div className="gb-main">
        <header className="gb-header">
          <nav className="gb-breadcrumbs">
            <Link href="/typescript">TypeScript Handbook</Link>
            {pathname !== "/typescript" && (
              <>
                <span className="gb-breadcrumb-sep">/</span>
                <span className="gb-breadcrumb-current">
                  {(() => {
                    const slug = pathname.split("/").pop();
                    const chapter = flattenChapters(CHAPTERS).find(
                      (c) => c.slug === slug
                    );
                    return chapter?.title ?? slug;
                  })()}
                </span>
              </>
            )}
          </nav>
        </header>
        <article className="gb-content">{children}</article>
      </div>
    </div>
  );
}
