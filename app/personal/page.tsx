"use client";

import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

const sleepTrendData = [
  { label: "Week 1", hours: 6.2, color: "bg-rose-500" },
  { label: "Week 2", hours: 7.1, color: "bg-amber-500" },
  { label: "Week 3", hours: 7.8, color: "bg-emerald-500" },
  { label: "Week 4", hours: 8.2, color: "bg-emerald-600" },
  { label: "Week 5", hours: 7.4, color: "bg-amber-500" },
];

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

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Sleep Overview
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Recent rest and consistency at a glance
            </p>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            +12% this month
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Tonight&apos;s Sleep
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              8h 24m
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/30">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Weekly Average
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
              7h 45m
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Past 5 Weeks Sleep
            </h3>
          </div>

          <div className="flex items-end gap-2 rounded-xl bg-white p-4 dark:bg-zinc-700/60">
            {sleepTrendData.map((entry) => (
              <div key={entry.label} className="flex flex-1 flex-col items-center">
                <div className="flex h-36 w-full items-end rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                  <div
                    className={`relative flex w-full items-end justify-center rounded-md ${entry.color}`}
                    style={{ height: `${Math.max((entry.hours / 9) * 100, 12)}%` }}
                  >
                    <span className="absolute bottom-2 text-[11px] font-semibold text-white">
                      {entry.hours.toFixed(1)}h
                    </span>
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="/profile"
        className="block rounded-xl border border-zinc-200 bg-gradient-to-r from-slate-50 to-zinc-100 p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:hover:border-zinc-600"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Connected Health
            </p>
            <h2 className="mt-1 font-semibold text-zinc-900 dark:text-white">
              Apple Health / Android Health
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Sync your sleep data from your device health app
            </p>
          </div>
          <span className="text-sm font-medium text-blue-600 underline decoration-blue-400/60 underline-offset-4 dark:text-blue-400">
            Connect
          </span>
        </div>
      </a>

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
