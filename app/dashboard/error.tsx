"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <div className="hero-card" style={{ maxWidth: 480 }}>
        <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
        <p className="error-message">{error.message}</p>
        <div className="controls" style={{ marginBottom: 0 }}>
          <button onClick={() => reset()}>Try again</button>
          <a href="/dashboard">Back to dashboard</a>
        </div>
      </div>
    </main>
  );
}
