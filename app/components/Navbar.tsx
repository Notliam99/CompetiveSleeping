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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-around items-center h-20 max-w-3xl mx-auto w-full">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={`/${tab.id}`}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              activeTab === tab.id
                ? "text-purple-600 dark:text-purple-400"
                : "text-zinc-500 dark:text-zinc-400"
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
