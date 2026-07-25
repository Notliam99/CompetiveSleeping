"use client";

import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

export default function PersonalPage() {
  useSwipeNavigation();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          👤 Personal Info
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your sleep preferences and goals
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tonight&apos;s Sleep
          </p>
          <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
            8h 24m
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4 dark:bg-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Weekly Average
          </p>
          <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
            7h 45m
          </p>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
          Sleep Goal
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Target Sleep Duration
            </label>
            <input
              type="text"
              value="8 hours"
              className="w-full mt-1 p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Ideal Bedtime
            </label>
            <input
              type="text"
              value="10:00 PM"
              className="w-full mt-1 p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Ideal Wake Time
            </label>
            <input
              type="text"
              value="6:00 AM"
              className="w-full mt-1 p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
          Health Info
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Age Group
            </label>
            <input
              type="text"
              value="25-30"
              className="w-full mt-1 p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-400">
              Sleep Quality
            </label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${star <= 4 ? "opacity-100" : "opacity-30"}`}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
          Preferences
        </h2>
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
    </div>
  );
}
