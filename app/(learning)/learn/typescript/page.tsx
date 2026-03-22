import Link from "next/link";

const QUICK_WINS = [
  "Type props explicitly so components are self-documenting.",
  "Use string unions to constrain allowed values.",
  "Keep server-only types close to data fetching.",
  "Prefer type inference, then tighten when needed.",
];

export default function TypeScriptLearningPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>TypeScript fundamentals for Next.js</h1>
          <p>
            This page focuses on the TypeScript habits that pay off fastest in a
            Next.js app: typed props, safe data shapes, and clean API boundaries.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Quick wins</h3>
        <ul>
          {QUICK_WINS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Typed props (components)</h3>
        <p>
          Declare prop types so consuming components know exactly what they can
          pass. You can keep it simple with inline types or reuse a shared type.
        </p>
        <pre className="code-block">
{`type HeroProps = {
  title: string;
  subtitle?: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}`}
        </pre>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Typed server data</h3>
        <p>
          When you fetch data in a Server Component or route handler, model the
          shape once and reuse it across the UI.
        </p>
        <pre className="code-block">
{`type Lesson = {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

async function getLessons(): Promise<Lesson[]> {
  return [
    { id: "intro", title: "Intro to TS", difficulty: "beginner" },
  ];
}`}
        </pre>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>API response contracts</h3>
        <p>
          Route handlers are a great boundary to enforce contracts. Define a
          response type and return it consistently.
        </p>
        <pre className="code-block">
{`type ProgressResponse = {
  completed: number;
  total: number;
};

export async function GET() {
  const data: ProgressResponse = { completed: 2, total: 5 };
  return Response.json(data);
}`}
        </pre>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Next steps</h3>
        <p>
          Try adding types to a component in <code>app/</code> or tightening a
          response shape in <code>app/api</code>. Small upgrades compound fast.
        </p>
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
