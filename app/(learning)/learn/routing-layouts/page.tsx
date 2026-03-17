import Link from "next/link";

export default function RoutingLayoutsPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Routing & layouts</h1>
          <p>
            In the App Router, each folder under <code>app/</code> is a{" "}
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts"
              target="_blank"
              rel="noreferrer"
            >
              route segment
            </a>
            . Layouts wrap segments and are shared down the tree. Route groups{" "}
            <code>(learning)</code> organize files without changing the URL.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Route segments</h3>
        <p>
          A folder like <code>app/dashboard/</code> maps to{" "}
          <code>/dashboard</code>. Nested folders become nested paths:{" "}
          <code>app/dashboard/settings/page.tsx</code> →{" "}
          <code>/dashboard/settings</code>.
        </p>
        <p>
          Each segment can have its own <code>layout.tsx</code>,{" "}
          <code>page.tsx</code>, and <code>loading.tsx</code>. Layouts are
          composed from root down: root layout → segment layout → page.
        </p>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Nested layouts</h3>
        <p>
          The root <code>app/layout.tsx</code> wraps everything. The{" "}
          <code>(learning)/layout.tsx</code> adds a sidebar for{" "}
          <code>/learn</code> and its children. You're viewing this page inside
          that layout — the sidebar is rendered by the parent, not this page.
        </p>
        <ul>
          <li>
            <strong>Root layout:</strong> HTML shell, fonts, global styles
          </li>
          <li>
            <strong>Learning layout:</strong> Sidebar nav for /learn/*
          </li>
          <li>
            <strong>Page:</strong> The actual route content
          </li>
        </ul>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Route groups</h3>
        <p>
          Folders wrapped in parentheses like <code>(learning)</code> are route
          groups. They organize files without affecting the URL. This page lives
          at <code>app/(learning)/learn/routing-layouts/page.tsx</code>, but the
          URL is <code>/learn/routing-layouts</code> — not{" "}
          <code>/(learning)/learn/routing-layouts</code>.
        </p>
        <p>
          Use route groups for layout-only folders, private organization, or to
          split large sections without long paths.
        </p>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Try it</h3>
        <p>
          Open the{" "}
          <Link href="/">project tree</Link> and click on{" "}
          <code>app/</code>, <code>(learning)/</code>, or <code>dashboard/</code>{" "}
          to see how segments and layouts map to routes.
        </p>
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
