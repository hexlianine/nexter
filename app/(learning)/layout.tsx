import Link from "next/link";

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
          <Link href="/">Project tree</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </aside>
      <div className="learning-main">{children}</div>
    </div>
  );
}
