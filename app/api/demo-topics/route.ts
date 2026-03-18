import { auth } from "@/auth";

// Demo API for client-side fetch example. Returns topics filtered by query.
const TOPICS = [
  { id: "1", name: "Next.js Foundations", slug: "foundations", level: "beginner" },
  { id: "2", name: "App Router Deep Dive", slug: "app-router", level: "intermediate" },
  { id: "3", name: "Server Components", slug: "server-components", level: "intermediate" },
  { id: "4", name: "Data Fetching", slug: "data-fetching", level: "beginner" },
  { id: "5", name: "Client Components", slug: "client-components", level: "beginner" },
  { id: "6", name: "Route Handlers", slug: "route-handlers", level: "intermediate" },
];

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const filtered = q
    ? TOPICS.filter(
        (t) =>
          t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q)
      )
    : TOPICS;

  return Response.json({ topics: filtered });
}
