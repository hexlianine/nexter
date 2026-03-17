import Link from "next/link";
import Counter from "../../../ui/counter";
import LikeButton from "../../../ui/like-button";
import Modal from "../../../ui/modal";
import Cart from "../../../ui/cart";
import Search from "../../../ui/search";
import ThemeToggle from "../../../ui/theme-toggle";

export default function ComponentsPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Server vs Client Components</h1>
          <p>
            Next.js uses React Server Components by default. Add{" "}
            <code>&quot;use client&quot;</code> at the top of a file to create a
            Client Component. Use Client Components when you need interactivity,
            hooks, or browser APIs.
          </p>
        </div>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Counter (Client Component)</h3>
        <p>
          Uses <code>useState</code> and <code>onClick</code>. Must be a Client
          Component.
        </p>
        <Counter />
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Like button (Client Component)</h3>
        <p>Same pattern: state + event handlers.</p>
        <LikeButton />
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Search (Client Component)</h3>
        <p>
          Controlled input with <code>useState</code>. Only the search input is
          client-side — the parent can stay a Server Component.
        </p>
        <Search placeholder="Type to filter..." />
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Modal (Client Component + children)</h3>
        <p>
          The modal is a Client Component, but it accepts{" "}
          <code>children</code> that can be Server Components. Server-rendered
          content inside an interactive shell.
        </p>
        <Modal trigger="Open modal" title="Server content in a client shell">
          <p>
            This paragraph is passed as children. If the parent is a Server
            Component, it was rendered on the server.
          </p>
          <Cart />
        </Modal>
      </section>

      <section className="hero-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Cart (Server Component)</h3>
        <p>
          Fetches data on the server. Can be nested inside a Client Component
          (like the modal) when passed as children.
        </p>
        <Cart />
      </section>

      <section className="hero-card">
        <h3 style={{ marginTop: 0 }}>Theme toggle (Context + Client Component)</h3>
        <p>
          <code>ThemeProvider</code> wraps the app in the root layout. Use{" "}
          <code>useTheme()</code> in any Client Component to read and update
          the theme.
        </p>
        <ThemeToggle />
      </section>

      <footer>
        <Link href="/learn">← Back to overview</Link>
      </footer>
    </main>
  );
}
