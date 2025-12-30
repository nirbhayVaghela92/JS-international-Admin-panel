import "@/css/style.css";
// import "flatpickr/dist/flatpickr.min.css";
// import "jsvectormap/dist/jsvectormap.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import LayoutWrapper from "@/components/layout/layout-wrapper";

export const metadata: Metadata = {
  title: "JS - International",
  description: "JS - International Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
