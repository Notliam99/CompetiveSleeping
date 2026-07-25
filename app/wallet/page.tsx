"use client";

import { useState } from "react";
import { LuCopy, LuWallet } from "react-icons/lu";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";
import PageHeader from "@/app/components/PageHeader";

const transactions = [
  { id: 1, title: "Payout from Liam", amount: "+0.002 ETH", date: "Yesterday • 20:04" },
  { id: 2, title: "Payout to Nina", amount: "-0.016 ETH", date: "Jul 23 • 19:12" },
  { id: 3, title: "Top-up", amount: "+0.0025 ETH", date: "Jul 22 • 14:20" },
  { id: 4, title: "Top-up", amount: "+0.0018 ETH", date: "Jul 21 • 18:45" },
];

export default function WalletPage() {
  useSwipeNavigation();
  const [copied, setCopied] = useState(false);
  const accountId = "0x111C7D01f2Cc0E18EAD9886612BfC1eF7A9cD3b2";
  const maskedAccountId = `${accountId.slice(0, 6)}...${accountId.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      <PageHeader
        icon={LuWallet}
        title="Wallet"
        description="Manage your ETH balance and challenge payouts."
      />

      <div className="rounded-3xl border border-purple-200 bg-purple-50 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Account details</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {maskedAccountId}
            </p>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Primary account • Verified
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-purple-200 bg-white p-2 text-purple-600 shadow-sm transition hover:bg-purple-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-purple-300"
            aria-label="Copy account ID"
          >
            <LuCopy className="h-4 w-4" />
          </button>
        </div>
        {copied ? (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            Account ID copied
          </p>
        ) : null}
      </div>

      <div className="rounded-3xl border border-purple-200 bg-purple-50 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Current balance</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-4xl font-semibold text-zinc-900 dark:text-white">1.02 ETH</p>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">≈ NZ$ 3,271</p>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-200">
            Secure
          </div>
        </div>
      </div>

      <button className="w-full rounded-2xl bg-purple-600 px-4 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-purple-700">
        Add / Remove Funds
      </button>

      <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Recent Transactions
          </h2>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-zinc-800"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">{tx.title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{tx.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  tx.amount.startsWith("+")
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
