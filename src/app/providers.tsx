"use client";

import { SidebarProvider } from "@/components/layout/sidebar/sidebar-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    // </ThemeProvider>
  );
}
