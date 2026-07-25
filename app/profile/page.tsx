"use client";

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

  return (
    <div className="space-y-6 p-4">
      <PageHeader
        icon={LuSettings2}
        title="Profile"
        description="Manage your account settings"
      />

      <div className="flex flex-col items-center py-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-4xl">
          <LuMoonStar className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-4">
          Sleep Champion
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">@sleepchamp2024</p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Account Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Email</span>
            <span className="font-medium text-zinc-900 dark:text-white">
              user@sleep.app
            </span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Preferences
        </h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded"
            />
            <span className="ml-3 text-zinc-700 dark:text-zinc-300">
              Receive sleep reminders
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded"
            />
            <span className="ml-3 text-zinc-700 dark:text-zinc-300">
              Enable notifications
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="ml-3 text-zinc-700 dark:text-zinc-300">
              Share statistics anonymously
            </span>
          </label>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Settings
        </h3>
        <div className="space-y-2">
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-zinc-700 transition-colors hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-600">
            <LuLock className="text-lg" />
            <span>Change Password</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-zinc-700 transition-colors hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-600">
            <LuBellRing className="text-lg" />
            <span>Connect Devices</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-zinc-700 transition-colors hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-600">
            <LuBrain className="text-lg" />
            <span>Export Data</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30">
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
