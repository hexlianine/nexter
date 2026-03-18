import Link from "next/link";
import { AuthActions } from "../ui/auth-actions";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="learning-layout">
      <aside className="learning-sidebar">
        <h3>Learning track</h3>
        <nav className="learning-nav">
          <Link href="/learn">Overview</Link>
          <Link href="/learn/components">Components</Link>
          <Link href="/learn/data-fetching">Data Fetching</Link>
          <Link href="/learn/routing-layouts">Routing & layouts</Link>
          <Link href="/learn/api-routes">API routes</Link>
          <Link href="/learn/loading-states">Loading states</Link>
          <Link href="/">Project tree</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="learning-auth">
          <AuthActions />
        </div>
      </aside>
      <div className="learning-main">{children}</div>
    </div>
  );
}
