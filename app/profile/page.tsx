"use client";

import { useLogout } from "@privy-io/react-auth";
import {
  LuBellRing,
  LuBrain,
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
          Sleep Champion
        </h2>
        <p className="text-violet-600 dark:text-zinc-400">@sleepchamp2024</p>
      </div>

      <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 font-semibold text-violet-900 dark:text-white">
          Account Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-violet-600 dark:text-zinc-400">Email</span>
            <span className="font-medium text-zinc-900 dark:text-white">
              user@sleep.app
            </span>
          </div>
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
