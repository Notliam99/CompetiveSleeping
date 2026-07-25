"use client";

import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

export default function ProfilePage() {
  useSwipeNavigation();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          ⚙️ Profile
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your account settings
        </p>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl">
          😴
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
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">
              Member Since
            </span>
            <span className="font-medium text-zinc-900 dark:text-white">
              Jan 15, 2024
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">
              Account Level
            </span>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Gold
            </span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Achievements
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { emoji: "😴", label: "Sleeper" },
            { emoji: "🔥", label: "Streak" },
            { emoji: "⭐", label: "Star" },
            { emoji: "💎", label: "Elite" },
          ].map((achievement, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-2 bg-white dark:bg-zinc-700 rounded"
            >
              <span className="text-3xl">{achievement.emoji}</span>
              <text className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 text-center">
                {achievement.label}
              </text>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Settings
        </h3>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white dark:hover:bg-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300">
            🔐 Change Password
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white dark:hover:bg-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300">
            🔗 Connect Devices
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white dark:hover:bg-zinc-600 transition-colors text-zinc-700 dark:text-zinc-300">
            📤 Export Data
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400">
            🚪 Logout
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
