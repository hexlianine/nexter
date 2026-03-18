import Link from "next/link";

export default function DemosPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Break / Fix demos</h1>
          <p>
            Interactive demos to observe loading.tsx, error.tsx, reset(), and
            streaming behavior in the App Router. Click each card to trigger the
            behavior.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>1. Trigger slow fetch</h3>
        <p>
          Navigate to a page that deliberately delays for 3 seconds. You’ll see{" "}
          <code>loading.tsx</code> until the page resolves.
        </p>
        <div className="controls">
          <Link href="/dashboard/demos/slow" className="badge badge-link">
            Try slow fetch →
          </Link>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>2. Throw an error</h3>
        <p>
          Navigate to a page that throws. The segment’s{" "}
          <code>error.tsx</code> will catch it and show recovery UI.
        </p>
        <div className="controls">
          <Link href="/dashboard/demos/error" className="badge badge-link">
            Trigger error →
          </Link>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>3. Recover with reset()</h3>
        <p>
          After triggering an error, click <strong>Try again</strong> on the
          error boundary. <code>reset()</code> re-renders the segment so you can
          retry.
        </p>
        <p style={{ marginBottom: 0 }}>
          <Link href="/dashboard/demos/error">Go to error demo first →</Link>
        </p>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>4. See streamed fallback</h3>
        <p>
          This page uses <code>Suspense</code> with an async component. The
          shell renders immediately; the fallback streams in, then resolves.
        </p>
        <div className="controls">
          <Link href="/dashboard/demos/stream" className="badge badge-link">
            See streaming →
          </Link>
        </div>
      </section>

      <footer style={{ marginTop: 32 }}>
        <Link href="/learn/loading-states">← Back to Loading states</Link>
      </footer>
    </main>
  );
}
