"use client";

import SessionProvider from "./ui/session-provider";
import ThemeProvider from "./ui/theme-provider";
import { ToastProvider } from "./ui/toast-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
