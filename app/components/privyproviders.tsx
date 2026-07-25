"use client";

import { PrivyProvider, PrivyInterface, usePrivy } from "@privy-io/react-auth";
import Auth from "./auth";
import Navbar from "./Navbar";

export function PrivyProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
    >
      <LoginRedirect>{children}</LoginRedirect>
    </PrivyProvider>
  );
}

function LoginRedirect({ children }: { children: React.ReactNode }) {
  const privy_info: PrivyInterface = usePrivy();

  if (privy_info.ready) {
    if (!privy_info.authenticated) {
      return <Auth />;
    }

    return (
      <>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-50 px-4 dark:bg-zinc-950">
      <div className="rounded-2xl border border-violet-200 bg-white px-6 py-4 text-sm font-medium text-violet-700 shadow-lg shadow-violet-200/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:shadow-violet-950/30">
        Loading...
      </div>
    </div>
  );
}
