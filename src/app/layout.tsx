import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Fashions",
  description: "Designing and manufacturing finest leather goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-simhei"
      >
        {children}
      </body>
    </html>
  );
}
