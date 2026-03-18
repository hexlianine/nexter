import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function fetchWithSimulatedFailure() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") || "http";
  const url = `${proto}://${host}/api/demos/error-simulation`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.error ||
        `Request failed (${res.status}). Click "Try again" — reset() will re-render and the next request will succeed.`
    );
  }
  return res.json();
}

export default async function ErrorDemoPage() {
  const data = await fetchWithSimulatedFailure();

  return (
    <main>
      <div className="hero-card" style={{ maxWidth: 480 }}>
        <h2 style={{ marginTop: 0 }}>Recovered</h2>
        <p>{data.message}</p>
        <p style={{ fontSize: "0.9em", opacity: 0.8 }}>
          <code>reset()</code> triggered a fresh server render. The retry request
          succeeded, so the error boundary was replaced by this content.
        </p>
        <div className="controls" style={{ marginBottom: 0 }}>
          <a href="/dashboard/demos/error" className="badge badge-link">
            Trigger error again →
          </a>
          <a href="/dashboard/demos">Back to demos</a>
        </div>
      </div>
    </main>
  );
}
