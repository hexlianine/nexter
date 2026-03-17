"use client";

import { useCallback, useEffect, useState } from "react";

const CHECKLIST_ITEMS = [
  { id: "explore-tree", label: "Explore the project tree" },
  { id: "visit-dashboard", label: "Visit /dashboard to see request steps" },
  { id: "route-groups", label: "See route groups in action (you're in one now)" },
  { id: "client-component", label: "Add a Client Component (try the like button below)" },
  { id: "api-route", label: "Create an API route for progress" },
] as const;

export default function ProgressChecklist() {
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.ok && data.progress?.checklistDone) {
        setDoneIds(new Set(data.progress.checklistDone));
      } else {
        setDoneIds(new Set(CHECKLIST_ITEMS.map((c) => c.id)));
      }
    } catch {
      setDoneIds(new Set(CHECKLIST_ITEMS.map((c) => c.id)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggle = useCallback(
    async (id: string) => {
      const next = new Set(doneIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setDoneIds(next);
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checklistDone: Array.from(next) }),
        });
      } catch {
        setDoneIds(doneIds);
      }
    },
    [doneIds]
  );

  if (loading) {
    return (
      <ul className="checklist">
        <li>Loading checklist…</li>
      </ul>
    );
  }

  return (
    <ul className="checklist">
      {CHECKLIST_ITEMS.map((item) => {
        const done = doneIds.has(item.id);
        return (
          <li
            key={item.id}
            className={done ? "done" : ""}
            role="button"
            tabIndex={0}
            onClick={() => toggle(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(item.id);
              }
            }}
            aria-pressed={done}
          >
            <span className="check">{done ? "✓" : "○"}</span>
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
