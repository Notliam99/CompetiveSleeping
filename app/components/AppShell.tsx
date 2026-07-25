"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFixedView = pathname === "/challenges" || pathname === "/personal";

  const content = useMemo(() => children, [children]);

  return (
    <main
      className={isFixedView ? "mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden" : "mx-auto flex-1 w-full max-w-3xl overflow-y-auto pb-24"}
    >
      {content}
    </main>
  );
}
