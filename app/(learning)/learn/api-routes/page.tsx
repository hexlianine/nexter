import Link from "next/link";

export default function ApiRoutesPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>API routes</h1>
          <p>
            In the App Router, API endpoints live as{" "}
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
              target="_blank"
              rel="noreferrer"
            >
              Route Handlers
            </a>{" "}
            in <code>app/api/</code>. A file named <code>route.ts</code> defines
            GET, POST, PUT, DELETE, and other HTTP methods.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>The /api/progress handler</h3>
        <p>
          This project uses <code>app/api/progress/route.ts</code> to persist
          checklist progress. It supports:
        </p>
        <ul>
          <li>
            <strong>GET:</strong> Returns current progress (completed count,
            checklist items)
          </li>
          <li>
            <strong>POST:</strong> Updates progress with a JSON body like{" "}
            <code>{`{ "checklistDone": ["id1", "id2"] }`}</code>
          </li>
        </ul>
        <p>
          The checklist on the <Link href="/learn">learn overview</Link> calls
          this API when you toggle items.
        </p>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Route Handler structure</h3>
        <pre className="code-block" style={{ overflow: "auto" }}>
          <code>{`// app/api/progress/route.ts
export async function GET() {
  const progress = getProgress();
  return Response.json({ ok: true, progress });
}

export async function POST(request: Request) {
  const body = await request.json();
  // validate, update store
  return Response.json({ ok: true, progress });
}`}</code>
        </pre>
        <p>
          Export functions named after HTTP methods. Use <code>Request</code> for
          body/headers; return <code>Response</code> (or <code>Response.json</code>
          ) for the payload. No extra configuration needed — the file path{" "}
          <code>app/api/progress/route.ts</code> maps to <code>/api/progress</code>.
        </p>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Key differences from Pages Router</h3>
        <ul>
          <li>
            One <code>route.ts</code> file per segment; export named handlers (
            <code>GET</code>, <code>POST</code>, etc.).
          </li>
          <li>
            Use Web APIs: <code>Request</code>, <code>Response</code>,{" "}
            <code>Response.json()</code>.
          </li>
          <li>
            Async by default; no need for <code>getServerSideProps</code> or
            separate API route config.
          </li>
        </ul>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Try it</h3>
        <p>
          Toggle checklist items on the <Link href="/learn">learn overview</Link>{" "}
          — each update hits <code>/api/progress</code>. Open DevTools → Network
          to see the requests.
        </p>
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
