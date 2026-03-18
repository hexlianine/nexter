import { auth } from "@/auth";

const CHECKLIST_IDS = [
  "explore-tree",
  "visit-dashboard",
  "route-groups",
  "client-component",
  "api-route",
] as const;

// In-memory store keyed by userId (resets on server restart; suitable for dev/demo)
const store: Record<string, { checklistDone: string[] }> = {};

function getStore(userId: string) {
  if (!store[userId]) {
    store[userId] = { checklistDone: [...CHECKLIST_IDS] };
  }
  return store[userId];
}

function getProgress(userId: string) {
  const { checklistDone } = getStore(userId);
  const done = checklistDone.filter((id) =>
    CHECKLIST_IDS.includes(id as (typeof CHECKLIST_IDS)[number])
  );
  return {
    completed: done.length,
    total: CHECKLIST_IDS.length,
    checklistDone: done,
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const progress = getProgress(session.user.id);
  return Response.json({ ok: true, progress });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const userStore = getStore(session.user.id);
    const checklistDone = Array.isArray(body?.checklistDone)
      ? body.checklistDone.filter((id: unknown) => typeof id === "string")
      : userStore.checklistDone;
    store[session.user.id] = { checklistDone };
    const progress = getProgress(session.user.id);
    return Response.json({ ok: true, progress });
  } catch {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
}
