import type { Metadata } from "next";
import "./globals.css";
import GlobalCursor from "./components/common/GlobalCursor";
import ScrollToTop from "./components/common/ScrollToTop";
import SmoothScroll from "./components/common/SmoothScroll";
import ContentProtection from "./components/common/ContentProtection";

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
        <ContentProtection>
          {/* with smooth scroll. uncomment this only for testing. only uncomment one thing at a time. */}
          {/* <SmoothScroll> 
            <ScrollToTop />
            <GlobalCursor />
            {children}
          </SmoothScroll> */}
          {/* //without smooth scroll. uncomment this only for testing */}
          {/* <ScrollToTop /> */}
          <GlobalCursor />
          {children}
        </ContentProtection>
      </body>
    </html>
  );
}
