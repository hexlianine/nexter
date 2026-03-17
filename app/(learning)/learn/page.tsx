import Link from "next/link";
import LikeButton from "../../ui/like-button";

const GOALS = [
  "Understand App Router routing and layouts",
  "Use route groups to organize without affecting URLs",
  "Know when to use Server vs Client Components",
  "Apply loading states and API routes",
];

const CHECKLIST = [
  { done: true, label: "Explore the project tree" },
  { done: true, label: "Visit /dashboard to see request steps" },
  { done: true, label: "See route groups in action (you're in one now)" },
  { done: false, label: "Add a Client Component (try the like button below)" },
  { done: false, label: "Create an API route for progress" },
];

export default function LearnPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Learning overview</h1>
          <p>
            This page lives inside the{" "}
            <code>(learning)</code> route group. Route groups use parentheses so
            they organize your files without changing the URL — you're at{" "}
            <code>/learn</code>, not <code>/(learning)/learn</code>.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Goals</h3>
        <ul>
          {GOALS.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Checklist</h3>
        <ul className="checklist">
          {CHECKLIST.map((item) => (
            <li key={item.label} className={item.done ? "done" : ""}>
              <span className="check">{item.done ? "✓" : "○"}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Client Component demo</h3>
        <p>
          The button below is a{" "}
          <a
            href="https://nextjs.org/docs/app/api-reference/directives/use-client"
            target="_blank"
            rel="noreferrer"
          >
            Client Component
          </a>
          . It uses <code>useState</code> and only runs in the browser after
          hydration.
        </p>
        <LikeButton />
      </section>

      <footer>
        <Link href="/">← Back to project tree</Link>
      </footer>
    </main>
  );
}
