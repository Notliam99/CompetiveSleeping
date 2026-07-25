"use client";

import { useState } from "react";
import {
  LuBell,
  LuClock3,
  LuCloud,
  LuTarget,
  LuTrophy,
  LuUsers,
} from "react-icons/lu";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";
import { PageHeader } from "@/app/components/PageHeader";

const weekOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const wagerOptions = [
  { label: "0.0003 ETH", eth: "0.0003", subtitle: "$1" },
  { label: "0.0016 ETH", eth: "0.0016", subtitle: "$5" },
  { label: "0.0062 ETH", eth: "0.0062", subtitle: "$20" },
  { label: "0.0156 ETH", eth: "0.0156", subtitle: "$50" },
  { label: "0.0312 ETH", eth: "0.0312", subtitle: "$100" },
];

export default function ChallengesPage() {
  useSwipeNavigation();
  const [duration, setDuration] = useState<number>(1);
  const [wagerIndex, setWagerIndex] = useState(2);
  const selectedWager = wagerOptions[wagerIndex];
  const durationProgress = ((duration - 1) / (weekOptions.length - 1)) * 100;
  const wagerProgress = (wagerIndex / (wagerOptions.length - 1)) * 100;

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
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden p-4">
      <PageHeader
        icon={LuTarget}
        title="Challenge"
        description="Find opponents and join sleep tournaments."
      />

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-[1.5rem] border border-blue-200 bg-blue-50 p-4 text-center text-sm font-semibold text-blue-800 shadow-sm transition hover:opacity-90 dark:border-zinc-700 dark:bg-zinc-900 dark:text-blue-300">
          <LuTarget className="text-lg" />
          <span>Goal Setting</span>
        </button>

        <button className="flex items-center justify-center gap-2 rounded-[1.5rem] border border-fuchsia-200 bg-white p-4 text-center text-sm font-semibold text-fuchsia-700 shadow-sm transition hover:opacity-90 dark:border-zinc-700 dark:bg-zinc-900 dark:text-fuchsia-300">
          <LuTrophy className="text-lg" />
          <span>Tournaments</span>
        </button>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <span>Challenge duration</span>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 shadow-inner dark:bg-zinc-800">
          <div className="mx-auto w-full max-w-[280px]">
            <div className="relative py-2">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-violet-100 dark:bg-zinc-700" />
              <div
                className="pointer-events-none absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500 via-violet-600 to-fuchsia-500 transition-[width] duration-150 dark:from-violet-400 dark:via-violet-500 dark:to-fuchsia-400"
                style={{ width: `${durationProgress}%` }}
              />
              <input
                type="range"
                min={1}
                max={weekOptions.length}
                step={1}
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
                className="duration-slider relative z-10 h-8 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Challenge duration in weeks"
              />
            </div>

            <div className="mt-3 flex justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {weekOptions.map((week) => (
                <button
                  key={week}
                  type="button"
                  onClick={() => setDuration(week)}
                  className={`transition ${
                    week === duration
                      ? "text-violet-700 dark:text-violet-300"
                      : "hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center gap-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {duration} week{duration > 1 ? "s" : ""}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Drag or tap a number to adjust
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <span>Wager amount</span>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 shadow-inner dark:bg-zinc-800">
          <div className="mx-auto w-full max-w-[280px]">
            <div className="relative py-2">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-violet-100 dark:bg-zinc-700" />
              <div
                className="pointer-events-none absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500 via-violet-600 to-fuchsia-500 transition-[width] duration-150 dark:from-violet-400 dark:via-violet-500 dark:to-fuchsia-400"
                style={{ width: `${wagerProgress}%` }}
              />
              <input
                type="range"
                min={0}
                max={wagerOptions.length - 1}
                step={1}
                value={wagerIndex}
                onChange={(event) => setWagerIndex(Number(event.target.value))}
                className="duration-slider relative z-10 h-8 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Wager amount"
              />
            </div>

            <div className="mt-3 flex justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {wagerOptions.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setWagerIndex(index)}
                  className={`transition ${
                    index === wagerIndex
                      ? "text-violet-700 dark:text-violet-300"
                      : "hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                >
                  {option.subtitle}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
              <div className="text-xl font-semibold text-zinc-900 dark:text-white">
                {selectedWager.eth} ETH
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {selectedWager.subtitle} wager selected
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="flex min-h-[84px] w-full items-center justify-center rounded-[999px] bg-transparent px-4 py-2 text-left transition hover:opacity-95">
        <span className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-[999px] bg-violet-600 px-10 py-6 text-2xl font-semibold text-white shadow-lg shadow-violet-200 dark:bg-violet-500 dark:shadow-violet-950/40">
          <LuCloud className="text-2xl" />
          <span>Search</span>
        </span>
      </button>
    </div>
  );
}
