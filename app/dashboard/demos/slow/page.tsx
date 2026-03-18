import Link from "next/link";

export default async function SlowDemoPage() {
  await new Promise((r) => setTimeout(r, 3000));
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Slow fetch done</h1>
          <p>
            This page delayed for 3 seconds. You saw{" "}
            <code>loading.tsx</code> during that time.
          </p>
        </div>
      </section>
      <section className="hero-card">
        <div className="controls">
          <Link href="/dashboard/demos">← More demos</Link>
          <Link href="/learn/loading-states">Loading states</Link>
        </div>
      </section>
    </main>
  );
}
