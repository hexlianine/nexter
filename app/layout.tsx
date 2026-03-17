import "../styles/tokens.css";
import "./globals.css";
import ThemeProvider from "./ui/theme-provider";

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
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
