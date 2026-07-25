"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { id: "stats", label: "Stats", symbol: "📊" },
  { id: "challenges", label: "Challenges", symbol: "🎯" },
  { id: "personal", label: "Personal", symbol: "👤" },
  { id: "profile", label: "Profile", symbol: "⚙️" },
];

export default function Navbar() {
  const pathname = usePathname();

  const getActiveTab = () => {
    for (const tab of tabs) {
      if (pathname.includes(tab.id)) {
        return tab.id;
      }
    }
    return "stats";
  };

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-around items-center h-20 max-w-3xl mx-auto w-full">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`/${tab.id}`}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
            activeTab === tab.id
              ? "text-blue-600 dark:text-blue-400"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          <span className="text-2xl">{tab.symbol}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
