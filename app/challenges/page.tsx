"use client";

import { useState } from "react";
import { LuCloud, LuLock, LuUsers } from "react-icons/lu";
import { PageHeader } from "@/app/components/PageHeader";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";
import { sanitizeAddress } from "@/app/lib/challengeEscrow";

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
  const [opponentAddress, setOpponentAddress] = useState("");
  const [searchFeedback, setSearchFeedback] = useState<{
    tone: "idle" | "error" | "success";
    message: string;
  }>({
    tone: "idle",
    message: "",
  });

  const selectedWager = wagerOptions[wagerIndex];
  const durationProgress = ((duration - 1) / (weekOptions.length - 1)) * 100;
  const wagerProgress = (wagerIndex / (wagerOptions.length - 1)) * 100;

  const handleSearch = () => {
    const normalizedAddress = sanitizeAddress(opponentAddress.trim());

    if (!normalizedAddress) {
      setSearchFeedback({
        tone: "error",
        message: "Enter a valid wallet address to search.",
      });
      return;
    }

    setOpponentAddress(normalizedAddress);
    setSearchFeedback({
      tone: "success",
      message: `Ready to challenge ${normalizedAddress.slice(0, 6)}...${normalizedAddress.slice(-4)}`,
    });
  };

  return (
    <div className="flex h-[calc(100dvh-5rem)] min-h-0 flex-col gap-3 overflow-hidden bg-violet-50 p-3 pb-6 dark:bg-zinc-950">
      <PageHeader
        icon={LuLock}
        title="Challenge"
        description="Set the challenge and search for an opponent."
      />

      <div className="rounded-[1.5rem] border border-violet-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="grid gap-3">
          <div className="rounded-[1.25rem] bg-violet-50 p-3 shadow-inner dark:bg-zinc-800">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-violet-700 dark:text-zinc-300">
              <span>Challenge duration</span>
              <span className="text-zinc-900 dark:text-white">
                {duration} week{duration > 1 ? "s" : ""}
              </span>
            </div>

            <div className="relative py-1">
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
                className="duration-slider relative z-10 h-7 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Challenge duration in weeks"
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
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
          </div>

          <div className="rounded-[1.25rem] bg-violet-50 p-3 shadow-inner dark:bg-zinc-800">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-violet-700 dark:text-zinc-300">
              <span>Wager amount</span>
              <span className="text-zinc-900 dark:text-white">{selectedWager.eth} ETH</span>
            </div>

            <div className="relative py-1">
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
                className="duration-slider relative z-10 h-7 w-full cursor-pointer appearance-none bg-transparent"
                aria-label="Wager amount"
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
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
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="flex w-full items-center justify-center rounded-[999px] bg-transparent px-2 py-0.5 text-left transition hover:opacity-95"
      >
        <span className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-[999px] bg-violet-600 px-8 py-3.5 text-xl font-semibold text-white shadow-lg shadow-violet-200 dark:bg-violet-500 dark:shadow-violet-950/40">
          <LuCloud className="text-xl" />
          <span>Search</span>
        </span>
      </button>

      <div className="rounded-[1.5rem] border border-violet-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
          <LuUsers className="text-base" />
          <span>Opponent wallet address</span>
        </div>

        <input
          type="text"
          value={opponentAddress}
          onChange={(event) => {
            setOpponentAddress(event.target.value);
            if (searchFeedback.tone !== "idle") {
              setSearchFeedback({ tone: "idle", message: "" });
            }
          }}
          placeholder="0x..."
          className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        {searchFeedback.message ? (
          <p
            className={`mt-2 text-xs ${
              searchFeedback.tone === "error"
                ? "text-rose-500 dark:text-rose-300"
                : "text-emerald-600 dark:text-emerald-300"
            }`}
          >
            {searchFeedback.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
