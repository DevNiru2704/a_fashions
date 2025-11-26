import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("catalog");

export default function CatalogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
