"use client";

import { useState } from "react";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";

const durationOptions = [7, 10, 14, 21, 28];

export default function ChallengesPage() {
  useSwipeNavigation();
  const [duration, setDuration] = useState<number>(7);

  const challenges = [
    {
      id: 1,
      title: "Sleep Champion",
      description: "Sleep for 8+ hours for 7 consecutive nights",
      progress: 5,
      total: 7,
      reward: "$50",
      active: true,
    },
    {
      id: 2,
      title: "Early Bird",
      description: "Be asleep by 10 PM for 10 nights",
      progress: 8,
      total: 10,
      reward: "$30",
      active: true,
    },
    {
      id: 3,
      title: "Marathon Sleeper",
      description: "Achieve one 10+ hour sleep session",
      progress: 0,
      total: 1,
      reward: "$75",
      active: true,
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Sleep at the same time ±30min for 14 days",
      progress: 7,
      total: 14,
      reward: "$100",
      active: false,
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            🎯 Challenges
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Find opponents and join sleep tournaments.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm">
            🔔 Notifications
          </button>
          <button className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 shadow-sm">
            👥 Friends
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border border-blue-200 dark:border-zinc-700 bg-blue-50 dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              Goal Setting
            </span>
            <span className="rounded-full bg-blue-200/70 px-2 py-1 text-[11px] font-semibold text-blue-800 dark:bg-blue-400/10 dark:text-blue-300">
              Personal
            </span>
          </div>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <p>• Sleep 8+ hours for 7 nights</p>
            <p>• Be asleep by 10 PM tonight</p>
            <p>• Keep a 14-day consistency streak</p>
          </div>
        </div>

        <div className="rounded-3xl border border-fuchsia-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300">
              Tournaments
            </span>
            <span className="rounded-full bg-fuchsia-200/70 px-2 py-1 text-[11px] font-semibold text-fuchsia-700 dark:bg-fuchsia-400/10 dark:text-fuchsia-300">
              Join
            </span>
          </div>
          <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="font-semibold text-zinc-900 dark:text-white">Night Sprint</p>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">Live now • 3 open slots</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="font-semibold text-zinc-900 dark:text-white">Dream League</p>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">Starts in 2h • 12 players</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 p-4 shadow-sm">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {durationOptions.map((option) => (
            <button
              key={option}
              onClick={() => setDuration(option)}
              className={`min-w-[80px] rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                duration === option
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-transparent bg-white/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {option} days
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-3xl bg-white dark:bg-zinc-800 p-4 shadow-inner">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-950 text-2xl">
            ⏳
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              <span>Challenge duration</span>
              <span>{duration} days</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
                style={{ width: `${Math.max((duration / 28) * 100, (7 / 28) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Minimum duration is one week.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[3rem] bg-gradient-to-br from-sky-100 via-white to-violet-100 dark:from-slate-900 dark:via-zinc-950 dark:to-indigo-950 p-6 text-center shadow-[0_24px_50px_-20px_rgba(15,23,42,0.35)]">
        <div className="relative mx-auto mb-4 h-24 w-full max-w-xs">
          <div className="absolute -left-5 top-8 h-14 w-14 rounded-full bg-white/90 dark:bg-zinc-900 blur-0"></div>
          <div className="absolute -right-5 top-10 h-12 w-12 rounded-full bg-white/90 dark:bg-zinc-900 blur-0"></div>
          <button className="relative z-10 inline-flex items-center justify-center gap-3 rounded-[3rem] bg-white px-10 py-6 text-xl font-semibold text-zinc-900 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-white dark:ring-zinc-700">
            <span className="text-2xl">☁️</span>
            Search
          </button>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Search for opponents and start a sleep match.
        </p>
      </div>
    </div>
  );
}
