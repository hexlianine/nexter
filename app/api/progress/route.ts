export async function GET() {
  return Response.json({
    ok: true,
    progress: {
      completed: 4,
      total: 12,
    },
  });
}

export async function POST() {
  return Response.json({ ok: true });
}
