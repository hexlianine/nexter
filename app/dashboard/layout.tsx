import Link from "next/link";
import { auth } from "@/auth";
import { AuthActions } from "../ui/auth-actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <Link href="/dashboard" className="dashboard-brand">
          Dashboard
        </Link>
        <nav className="dashboard-nav">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/demos">Demos</Link>
          <Link href="/">Project tree</Link>
        </nav>
        <div className="dashboard-auth">
          {session?.user ? (
            <AuthActions />
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
