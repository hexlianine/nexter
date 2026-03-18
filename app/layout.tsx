import "../styles/tokens.css";
import "./globals.css";
import ThemeProvider from "./ui/theme-provider";
import SessionProvider from "./ui/session-provider";

export const metadata = {
  title: "Next.js Learning Structure",
  description: "Interactive project structure for learning Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
