"use client";

import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { LuCopy, LuWallet } from "react-icons/lu";
import { PageHeader } from "@/app/components/PageHeader";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

const transactions = [
  { id: 1, title: "Payout from Liam", amount: "+0.002 ETH", date: "Yesterday • 20:04" },
  { id: 2, title: "Payout to Nina", amount: "-0.016 ETH", date: "Jul 23 • 19:12" },
  { id: 3, title: "Top-up", amount: "+0.0025 ETH", date: "Jul 22 • 14:20" },
  { id: 4, title: "Top-up", amount: "+0.0018 ETH", date: "Jul 21 • 18:45" },
];

export default function WalletPage() {
  useSwipeNavigation();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState<string>("--");
  const { user } = usePrivy();
  const { wallets, ready } = useWallets();
  const primaryWallet =
    wallets.find((wallet) => wallet.address === user?.wallet?.address) ??
    wallets[0];
  const accountId = primaryWallet?.address ?? user?.wallet?.address ?? "No wallet linked";
  const maskedAccountId =
    accountId && accountId !== "No wallet linked"
      ? `${accountId.slice(0, 6)}...${accountId.slice(-4)}`
      : accountId;

  useEffect(() => {
    let cancelled = false;

    async function loadBalance() {
      if (!ready || !primaryWallet) {
        setBalance("--");
        return;
      }

      try {
        const provider = await primaryWallet.getEthereumProvider();
        const hexBalance = await provider.request({
          method: "eth_getBalance",
          params: [primaryWallet.address, "latest"],
        });

        if (cancelled || typeof hexBalance !== "string") {
          return;
        }

        const weiPerEth = BigInt("1000000000000000000");
        const displayPrecision = BigInt("10000");
        const wei = BigInt(hexBalance);
        const whole = wei / weiPerEth;
        const fraction = Number(((wei % weiPerEth) * displayPrecision) / weiPerEth);
        const formatted = `${whole.toString()}.${fraction.toString().padStart(4, "0").replace(/0+$/, "") || "0"}`;
        setBalance(formatted);
      } catch {
        if (!cancelled) {
          setBalance("--");
        }
      }
    }

    void loadBalance();

    return () => {
      cancelled = true;
    };
  }, [primaryWallet, ready]);

  const handleCopy = async () => {
    if (!primaryWallet && !user?.wallet?.address) {
      return;
    }

    try {
      await navigator.clipboard.writeText(accountId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen space-y-4 bg-violet-50 p-4 pb-24 dark:bg-zinc-950">
      <PageHeader
        icon={LuWallet}
        title="Wallet"
        description="Manage your ETH balance and challenge payouts."
      />

      <div className="rounded-3xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-violet-600 dark:text-zinc-400">Account details</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {maskedAccountId}
            </p>
            <p className="text-sm text-violet-700 dark:text-violet-300">
              {primaryWallet ? "Primary account • Connected" : "No connected wallet"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-violet-200 bg-violet-50 p-2 text-violet-600 shadow-sm transition hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-violet-300"
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

      <div className="rounded-3xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-violet-600 dark:text-zinc-400">Current balance</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-4xl font-semibold text-zinc-900 dark:text-white">{balance} ETH</p>
            <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">Live wallet balance</p>
          </div>
          <div className="rounded-full bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-200">
            Secure
          </div>
        </div>
      </div>

      <button className="w-full rounded-2xl bg-violet-600 px-4 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 dark:bg-violet-500 dark:shadow-violet-950/40 dark:hover:bg-violet-400">
        Add / Remove Funds
      </button>

      <div className="rounded-3xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-violet-900 dark:text-white">
            Recent Transactions
          </h2>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-2xl bg-violet-50 px-3 py-3 dark:bg-zinc-800"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">{tx.title}</p>
                <p className="text-sm text-violet-500 dark:text-zinc-400">{tx.date}</p>
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
