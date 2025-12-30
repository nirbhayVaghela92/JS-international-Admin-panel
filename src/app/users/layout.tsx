// app/reportedpost/layout.tsx

import { Loader } from "@/components/custom-elements/Loader";
import React, { Suspense } from "react";
import type { ReactNode } from "react";

export default function UserPostsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}
