import type { Metadata } from "next";
import "./globals.css";
import GlobalCursor from "./components/common/GlobalCursor";
import ScrollToTop from "./components/common/ScrollToTop";
import SmoothScroll from "./components/common/SmoothScroll";
import ContentProtection from "./components/common/ContentProtection";
import { generatePageMetadata, organizationSchema, manufacturingBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("home");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(manufacturingBusinessSchema),
          }}
        />
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "471b42d852f74aae96d740374febf0b7"}'></script>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7b8ede646bd143c49ae3673c4323e754"}'></script>
      </head>
      <body className="font-simhei bg-[#E8E8E8]">
        {/* <ContentProtection> */}
        {/* with smooth scroll. uncomment this only for testing. only uncomment one thing at a time. */}
        {/* <SmoothScroll> 
            <ScrollToTop />
            <GlobalCursor />
            {children}
          </SmoothScroll> */}
        {/* //without smooth scroll. uncomment this only for testing */}
        <ScrollToTop />
        <GlobalCursor />
        {children}
        {/* </ContentProtection> */}
      </body>
    </html>
  );
}
