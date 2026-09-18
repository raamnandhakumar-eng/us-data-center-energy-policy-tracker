import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridPolicy | U.S. Data Center Energy Policy Intelligence",
  description:
    "Source-grounded U.S. data center energy and infrastructure policy intelligence for cross-functional decision support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
