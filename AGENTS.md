# AGENTS.md

This file describes how agents should work in this repo. Keep it short and actionable.

## Project Overview
- Framework: Next.js (app router)
- Primary language: TypeScript
- UI location: `app/`

## How To Work Here
- Prefer small, focused edits.
- Reuse existing patterns in `app/` before introducing new ones.
- Keep components server-first unless client hooks are needed.
- When adding UI, keep styling consistent with existing pages.

## Commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`

## Example (App)
If asked to add a simple page, follow this pattern:

```tsx
// app/example/page.tsx
export default function ExamplePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Example Page</h1>
      <p>This is a minimal app router page.</p>
    </main>
  );
}
```

