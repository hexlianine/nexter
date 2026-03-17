"use client";

import { useEffect, useState } from "react";

export default function ProgressWidget() {
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.progress) {
          setProgress({
            completed: data.progress.completed,
            total: data.progress.total,
          });
        }
      })
      .catch(() => {});
  }, []);

  if (!progress) return null;

  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className="progress-widget">
      <h3>Learning progress</h3>
      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={progress.completed}
          aria-valuemin={0}
          aria-valuemax={progress.total}
        />
      </div>
      <p className="progress-text">
        {progress.completed} of {progress.total} done
      </p>
    </div>
  );
}
