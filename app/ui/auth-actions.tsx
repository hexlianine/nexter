"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthActions() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session?.user) {
    return (
      <div className="auth-actions">
        <span className="auth-user">{session.user.email}</span>
        <button
          type="button"
          className="auth-signout"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="auth-signin">
      Sign in
    </Link>
  );
}
