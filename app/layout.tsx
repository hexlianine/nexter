import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
