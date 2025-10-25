import type { Metadata } from "next";
import "./globals.css";
import GlobalCursor from "./components/common/GlobalCursor";
import ScrollToTop from "./components/common/ScrollToTop";
import SmoothScroll from "./components/common/SmoothScroll";

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
      <body className="font-simhei bg-[#E8E8E8]">
        <SmoothScroll>
          <ScrollToTop />
          <GlobalCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
