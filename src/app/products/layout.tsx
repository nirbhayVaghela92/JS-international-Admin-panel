// app/reportedpost/layout.tsx

import React, { Suspense } from "react";
import type { ReactNode } from "react";

export default function UserPostsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
