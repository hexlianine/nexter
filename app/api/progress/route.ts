const CHECKLIST_IDS = [
  "explore-tree",
  "visit-dashboard",
  "route-groups",
  "client-component",
  "api-route",
] as const;

// In-memory store (resets on server restart; suitable for dev/demo)
let store: { checklistDone: string[] } = {
  checklistDone: [...CHECKLIST_IDS],
};

function getProgress() {
  const done = store.checklistDone.filter((id) =>
    CHECKLIST_IDS.includes(id as (typeof CHECKLIST_IDS)[number])
  );
  return {
    completed: done.length,
    total: CHECKLIST_IDS.length,
    checklistDone: done,
  };
}

export async function GET() {
  const progress = getProgress();
  return Response.json({ ok: true, progress });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const checklistDone = Array.isArray(body?.checklistDone)
      ? body.checklistDone.filter((id: unknown) => typeof id === "string")
      : store.checklistDone;
    store = { checklistDone };
    const progress = getProgress();
    return Response.json({ ok: true, progress });
  } catch {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
}
