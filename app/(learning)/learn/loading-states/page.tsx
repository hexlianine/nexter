import Link from "next/link";

export default function LoadingStatesPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Loading states</h1>
          <p>
            The App Router uses{" "}
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming"
              target="_blank"
              rel="noreferrer"
            >
              loading.tsx
            </a>{" "}
            and{" "}
            <a
              href="https://react.dev/reference/react/Suspense"
              target="_blank"
              rel="noreferrer"
            >
              Suspense
            </a>{" "}
            to show fallback UI while pages or components fetch data. No spinners
            or manual state — just file conventions.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>loading.tsx</h3>
        <p>
          Add a <code>loading.tsx</code> file in any route segment. Next.js wraps
          the segment&apos;s <code>page.tsx</code> in a Suspense boundary
          automatically. While the page (and its async work) resolves, the
          loading UI is shown.
        </p>
        <p>
          The dashboard has one: <code>app/dashboard/loading.tsx</code>. When you
          navigate to <Link href="/dashboard">/dashboard</Link>, you&apos;ll see
          &quot;Loading dashboard...&quot; briefly before the page content.
        </p>
        <pre className="code-block" style={{ overflow: "auto" }}>
          <code>{`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading-placeholder">Loading dashboard...</div>
  );
}`}</code>
        </pre>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>How it works</h3>
        <ol>
          <li>
            User navigates to <code>/dashboard</code>
          </li>
          <li>
            Next.js matches the route and starts rendering the layout
          </li>
          <li>
            <code>loading.tsx</code> is shown immediately (instant feedback)
          </li>
          <li>
            When <code>page.tsx</code> and any async components finish, they
            replace the loading UI via streaming
          </li>
        </ol>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Suspense boundaries</h3>
        <p>
          <code>loading.tsx</code> creates a Suspense boundary around the page.
          You can also use <code>{`<Suspense fallback={...}>`}</code> around
          specific components that fetch data, so only that part shows a
          skeleton while the rest renders.
        </p>
        <ul>
          <li>
            <strong>loading.tsx:</strong> Full-segment fallback; great for
            route-level skeletons
          </li>
          <li>
            <strong>Suspense:</strong> Granular fallbacks for individual
            components
          </li>
        </ul>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>error.tsx</h3>
        <p>
          The companion to <code>loading.tsx</code> is{" "}
          <code>error.tsx</code>. It creates an{" "}
          <a
            href="https://nextjs.org/docs/app/building-your-application/routing/error-handling"
            target="_blank"
            rel="noreferrer"
          >
            error boundary
          </a>{" "}
          for the segment. When a page or child component throws, Next.js
          catches it and shows your error UI instead of the whole app crashing.
        </p>
        <p>
          The dashboard has <code>app/dashboard/error.tsx</code>, and there is
          a root <code>app/error.tsx</code> for app-wide errors. Both offer a
          &quot;Try again&quot; button (via <code>reset()</code>) so users can
          recover without losing context.
        </p>
        <ul>
          <li>
            <strong>loading.tsx:</strong> Fallback while loading
          </li>
          <li>
            <strong>error.tsx:</strong> Fallback when something throws
          </li>
        </ul>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Try it: Break / Fix demos</h3>
        <p>
          Interactive demos let you observe App Router behavior firsthand. Each
          action triggers the real loading.tsx, error.tsx, or streaming behavior.
        </p>
        <ul style={{ marginBottom: 20 }}>
          <li>
            <strong>Trigger slow fetch</strong> — See loading.tsx for ~3 seconds
          </li>
          <li>
            <strong>Throw an error</strong> — See error.tsx catch it
          </li>
          <li>
            <strong>Recover with reset()</strong> — Click &quot;Try again&quot; on the error boundary
          </li>
          <li>
            <strong>See streamed fallback</strong> — Watch Suspense stream a chunk in
          </li>
        </ul>
        <div className="controls">
          <Link href="/dashboard/demos" className="badge badge-link">
            Run demos →
          </Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
