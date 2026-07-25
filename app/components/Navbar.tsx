"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChartBar, LuHeart, LuTarget, LuSettings2, LuWallet } from "react-icons/lu";

const tabs = [
  { id: "wallet", label: "Wallet", icon: LuWallet },
  { id: "stats", label: "Stats", icon: LuChartBar },
  { id: "challenges", label: "Challenge", icon: LuTarget },
  { id: "personal", label: "Health", icon: LuHeart },
  { id: "profile", label: "Profile", icon: LuSettings2 },
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
    <nav className="fixed bottom-0 left-0 right-0 mx-auto flex h-20 w-full max-w-3xl items-center justify-around border-t border-violet-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={`/${tab.id}`}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              activeTab === tab.id
                ? "text-violet-600 dark:text-violet-400"
                : "text-violet-400 dark:text-zinc-500"
            }`}
          >
            <Icon className="text-2xl" />
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
