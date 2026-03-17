import Link from "next/link";
import Cart from "../../../ui/cart";

export default function DataFetchingPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Data Fetching in Next.js</h1>
          <p>
            Server Components can fetch data directly—no{" "}
            <code>useEffect</code> or{" "}
            <a
              href="https://nextjs.org/docs/app/building-your-application/data-fetching"
              target="_blank"
              rel="noreferrer"
            >
              data fetching library
            </a>{" "}
            required for initial load. Client Components run in the browser and
            use hooks for dynamic data.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Server Component data fetch</h3>
        <p>
          The cart below is a Server Component. It fetches data during the
          request, on the server. No client-side JavaScript is needed for the
          initial render.
        </p>
        <Cart />
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>When to use each</h3>
        <ul>
          <li>
            <strong>Server Components:</strong> Fetch from DB, APIs, file system.
            No secrets in the client bundle. Great for SEO.
          </li>
          <li>
            <strong>Client Components:</strong> Fetch on user action (search,
            pagination), real-time updates, or when you need browser APIs.
          </li>
        </ul>
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Try it</h3>
        <p>
          Visit the{" "}
          <Link href="/learn/components">Components</Link> page to see Client
          Components that fetch or react to user input.
        </p>
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
