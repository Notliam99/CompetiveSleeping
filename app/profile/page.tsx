"use client";

import { useState } from "react";
import { useLogout, usePrivy } from "@privy-io/react-auth";
import {
  LuBellRing,
  LuBrain,
  LuCopy,
  LuLock,
  LuLogOut,
  LuMoonStar,
  LuSettings2,
} from "react-icons/lu";
import { PageHeader } from "@/app/components/PageHeader";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

export default function ProfilePage() {
  useSwipeNavigation();
  const { logout } = useLogout();
  const { user, linkEmail, linkWallet } = usePrivy();
  const [copied, setCopied] = useState(false);
  const email = user?.email?.address;
  const walletAddress = user?.wallet?.address;
  const maskedWalletAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;
  const displayName =
    user?.email?.address?.split("@")[0] ??
    (walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Sleep Champion");
  const username =
    user?.email?.address
      ? `@${user.email.address.split("@")[0]}`
      : walletAddress
        ? `@${walletAddress.slice(0, 6).toLowerCase()}`
        : "@sleepchamp2024";

  const handleCopyWallet = async () => {
    if (!walletAddress) {
      return;
    }

    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-violet-50 p-4 dark:bg-zinc-950">
      <PageHeader
        icon={LuSettings2}
        title="Profile"
        description="Manage your account settings"
      />

      <div className="flex flex-col items-center py-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-4xl shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
          <LuMoonStar className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-4">
          {displayName}
        </h2>
        <p className="text-violet-600 dark:text-zinc-400">{username}</p>
      </div>

      <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 font-semibold text-violet-900 dark:text-white">
          Account Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-violet-600 dark:text-zinc-400">Email</span>
            {email ? (
              <span className="font-medium text-zinc-900 dark:text-white">
                {email}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => linkEmail()}
                className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-200 dark:bg-zinc-800 dark:text-violet-300 dark:hover:bg-zinc-700"
              >
                Add email
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-violet-600 dark:text-zinc-400">Wallet</span>
            {walletAddress ? (
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">
                  {maskedWalletAddress}
                </span>
                <button
                  type="button"
                  onClick={() => void handleCopyWallet()}
                  className="rounded-full border border-violet-200 bg-violet-50 p-1.5 text-violet-600 shadow-sm transition hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-violet-300 dark:hover:bg-zinc-700"
                  aria-label="Copy wallet address"
                >
                  <LuCopy className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => linkWallet({ walletChainType: "ethereum-only" })}
                className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-200 dark:bg-zinc-800 dark:text-violet-300 dark:hover:bg-zinc-700"
              >
                Add wallet
              </button>
            )}
          </div>
          {copied ? (
            <p className="text-right text-xs text-emerald-600 dark:text-emerald-400">
              Wallet copied
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 font-semibold text-violet-900 dark:text-white">
          Preferences
        </h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded accent-violet-600"
            />
            <span className="ml-3 text-violet-700 dark:text-zinc-300">
              Receive sleep reminders
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded accent-violet-600"
            />
            <span className="ml-3 text-violet-700 dark:text-zinc-300">
              Enable notifications
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 rounded accent-violet-600" />
            <span className="ml-3 text-violet-700 dark:text-zinc-300">
              Share statistics anonymously
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 font-semibold text-violet-900 dark:text-white">
          Settings
        </h3>
        <div className="space-y-2">
          <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-violet-700 transition-colors hover:bg-violet-50 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <LuLock className="text-lg" />
            <span>Change Password</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-violet-700 transition-colors hover:bg-violet-50 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <LuBellRing className="text-lg" />
            <span>Connect Devices</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-violet-700 transition-colors hover:bg-violet-50 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <LuBrain className="text-lg" />
            <span>Export Data</span>
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <LuLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-500 dark:text-zinc-500 pb-2">
        <p>Version 1.0.0</p>
        <p>© 2024 Sleep App. All rights reserved.</p>
      </div>
    </div>
  );
}
