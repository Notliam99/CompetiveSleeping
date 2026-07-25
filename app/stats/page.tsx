"use client";

import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

export default function StatsPage() {
  useSwipeNavigation();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          📊 Stats
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your sleeping statistics and performance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tonight's Sleep
          </p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            8h 24m
          </p>
        </div>

        <div className="bg-green-50 dark:bg-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Weekly Average
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            7h 45m
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Total Earnings
          </p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            $156.50
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Current Streak
          </p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
            15 days
          </p>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
        <h2 className="font-semibold text-zinc-900 dark:text-white mb-3">
          Last 7 Days
        </h2>
        <div className="flex justify-between items-end h-24 gap-2">
          {[8.2, 7.5, 6.8, 9.1, 7.3, 8.5, 8.4].map((hours, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: `${(hours / 10) * 100}%` }}
              title={`${hours}h`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
      </div>
    </div>
  );
}
