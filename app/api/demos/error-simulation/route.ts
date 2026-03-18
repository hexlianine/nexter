import { NextResponse } from "next/server";

// Fails on odd requests, succeeds on even — so "Try again" (reset) produces visible recovery
let attemptCount = 0;

export async function GET() {
  attemptCount += 1;
  const shouldFail = attemptCount % 2 === 1;

  if (shouldFail) {
    return NextResponse.json(
      { error: "Simulated failure (request #" + attemptCount + ")" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Recovered! reset() triggered a fresh render and this request succeeded.",
  });
}
