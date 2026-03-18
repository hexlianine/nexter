import Link from "next/link";
import { Suspense } from "react";

async function StreamedChunk() {
  await new Promise((r) => setTimeout(r, 2500));
  return (
    <div className="hero-card" style={{ marginTop: 16 }}>
      <p style={{ margin: 0 }}>
        <strong>✓ Streamed in after 2.5s.</strong> This block resolved inside a{" "}
        <code>Suspense</code> boundary; the rest of the page rendered
        immediately.
      </p>
    </div>
  );
}

export default function StreamDemoPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Streamed fallback</h1>
          <p>
            The shell below rendered immediately. The block inside{" "}
            <code>Suspense</code> shows a fallback, then streams in when ready.
          </p>
        </div>
      </section>

      <div className="hero-card">
        <p style={{ margin: 0 }}>
          This part is static and appears right away (no async work).
        </p>
      </div>

      <Suspense
        fallback={
          <div className="loading-placeholder" style={{ marginTop: 16 }}>
            Loading chunk…
          </div>
        }
      >
        <StreamedChunk />
      </Suspense>

      <footer style={{ marginTop: 32 }}>
        <Link href="/dashboard/demos">← More demos</Link>
        <Link href="/learn/loading-states">Loading states</Link>
      </footer>
    </main>
  );
}
