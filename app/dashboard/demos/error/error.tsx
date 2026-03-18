"use client";

import { useState } from "react";

export default function ErrorDemoBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  function handleTryAgain() {
    setIsRetrying(true);
    reset();
    // Reset loading state after a short delay if we're still mounted (retry failed)
    setTimeout(() => setIsRetrying(false), 2000);
  }

  return (
    <main>
      <div className="hero-card" style={{ maxWidth: 480 }}>
        <h2 style={{ marginTop: 0 }}>Error boundary demo</h2>
        <p>
          This error was thrown <strong>on purpose</strong> so you can see how{" "}
          <code>error.tsx</code> catches it and how <code>reset()</code> lets you
          retry.
        </p>
        <p className="error-message" style={{ opacity: 0.8, fontSize: "0.9em" }}>
          {error.message}
        </p>
        <p style={{ fontSize: "0.85em", opacity: 0.7, marginTop: 8 }}>
          <strong>How reset() works:</strong> It re-renders the failing segment.
          This demo simulates a flaky request—the first call fails, the second
          succeeds. Click &quot;Try again&quot; to see the recovery.
        </p>
        <div className="controls" style={{ marginBottom: 0 }}>
          <button
            onClick={handleTryAgain}
            disabled={isRetrying}
            aria-busy={isRetrying}
          >
            {isRetrying ? "Retrying…" : "Try again (calls reset())"}
          </button>
          <a href="/dashboard/demos">Back to demos</a>
        </div>
      </div>
    </main>
  );
}
