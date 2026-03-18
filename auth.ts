import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Demo user for the learning app (no database)
const DEMO_USER = {
  id: "demo-user",
  email: "demo@nexter.dev",
  name: "Demo User",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Demo credentials for learning app
        if (
          credentials?.email === "demo@nexter.dev" &&
          credentials?.password === "demo123"
        ) {
          return DEMO_USER;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const { pathname } = request.nextUrl;
      const isDashboard = pathname.startsWith("/dashboard");
      if (isDashboard) {
        return !!auth?.user;
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
