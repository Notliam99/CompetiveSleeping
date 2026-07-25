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
  const [dragging, setDragging] = useState(false);
  const [wagerIndex, setWagerIndex] = useState(2);
  const selectedWager = wagerOptions[wagerIndex];

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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white">
            <LuTarget className="text-2xl text-violet-600 dark:text-violet-400" />
            <span>Challenge</span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Find opponents and join sleep tournaments.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <LuBell className="text-xl" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <LuUsers className="text-xl" />
          </button>
        </div>
      </div>

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
          <div
            className="mx-auto flex w-full max-w-[260px] items-center justify-center"
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onMouseMove={(event) => {
              if (!dragging) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const progress = (event.clientX - rect.left) / rect.width;
              const nextValue = Math.max(1, Math.min(10, Math.round(progress * 9) + 1));
              setDuration(nextValue);
            }}
          >
            <div className="relative h-3 w-full rounded-full bg-violet-100 dark:bg-zinc-700">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-violet-600 transition-all dark:bg-violet-500"
                style={{ width: `${((duration - 1) / 9) * 100}%` }}
              />
              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-violet-600 shadow-sm dark:border-zinc-800 dark:bg-violet-500"
                style={{ left: `calc(${((duration - 1) / 9) * 100}% - 8px)` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            <div className="relative flex h-36 w-32 items-center justify-center rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3 shadow-sm dark:border-violet-900/40 dark:from-violet-950/40 dark:to-zinc-900">
              <div className="absolute inset-0 rounded-[1.75rem] border border-violet-100 dark:border-violet-900/30" />
              <div className="relative flex h-24 w-20 items-center justify-center">
                <LuClock3 className="text-[5rem] text-violet-300/90 dark:text-violet-900/70" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-zinc-900 dark:text-white">{duration} week{duration > 1 ? "s" : ""}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Drag the slider to adjust</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <span>Wager amount</span>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 shadow-inner dark:bg-zinc-800">
          <input
            type="range"
            min={0}
            max={wagerOptions.length - 1}
            step={1}
            value={wagerIndex}
            onChange={(event) => setWagerIndex(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-violet-100 accent-violet-600 dark:bg-zinc-700"
          />

          <div className="mt-3 flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {wagerOptions.map((option) => (
              <span key={option.label}>{option.label}</span>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
            <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
              {selectedWager.eth} ETH
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {selectedWager.subtitle}
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
