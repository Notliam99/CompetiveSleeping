"use client";

import { LuChartBar } from "react-icons/lu";
import { useSwipeNavigation } from "@/app/hooks/useSwipeNavigation";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Challenge = {
  id: number;
  opponent: string;
  status: string;
  detail: string;
  outcome: "active" | "won" | "lost";
  timeLeft?: string;
  amount?: number;
  yourSleep: number[];
  opponentSleep: number[];
};

const challenges: Challenge[] = [
  {
    id: 1,
    opponent: "Maya",
    status: "Active challenge",
    detail: "Current sleep comparison for this week",
    outcome: "active",
    timeLeft: "3 days left",
    amount: 18,
    yourSleep: [9.1, 9.3, 6.0, 10.6],
    opponentSleep: [10.8, 5.9, 7.6, 6.1],
  },
  {
    id: 2,
    opponent: "Liam",
    status: "Completed challenge",
    detail: "Match history from the last challenge",
    outcome: "won",
    amount: 24,
    yourSleep: [6.4, 8.8, 4.6, 10.2, 10.0, 7.9, 10.3],
    opponentSleep: [9.1, 6.5, 7.2, 10.7, 7.6, 9.4, 5.8],
  },
  {
    id: 3,
    opponent: "Nina",
    status: "Completed challenge",
    detail: "Final results from the previous matchup",
    outcome: "lost",
    amount: 16,
    yourSleep: [8.2, 9.9, 8.9, 4.8, 6.1, 5.9, 4.7],
    opponentSleep: [5.5, 5.8, 6.7, 6.1, 9.9, 10.2, 11.0],
  },
];

function buildChartData(yourSleep: number[], opponentSleep: number[]) {
  let yourTotal = 0;
  let opponentTotal = 0;

  return yourSleep.map((value, index) => {
    yourTotal += value;
    opponentTotal += opponentSleep[index];

    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index],
      you: yourTotal,
      opponent: opponentTotal,
    };
  });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-violet-200 bg-white px-3 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-2 text-sm font-semibold text-violet-900 dark:text-white">
        {label}
      </p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs text-violet-700 dark:text-zinc-300">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize">{entry.name}</span>
          <span className="ml-1 font-semibold">{entry.value.toFixed(1)}h</span>
        </div>
      ))}
    </div>
  );
}

export default function StatsPage() {
  useSwipeNavigation();

  return (
    <div className="min-h-screen space-y-0 bg-violet-50 p-0 dark:bg-zinc-950">
      <div className="border-b border-violet-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-1 flex items-center gap-2 text-3xl font-bold text-violet-900 dark:text-white">
          <LuChartBar className="text-2xl text-violet-600 dark:text-violet-400" />
          <span>Stats</span>
        </h1>
        <p className="text-violet-700 dark:text-zinc-400">
          Your active challenges, opponent sleep trends, and match history
        </p>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between px-1 pb-3">
          <div>
            <h2 className="font-semibold text-violet-900 dark:text-white">
              Challenges
            </h2>
            <p className="text-sm text-violet-600 dark:text-zinc-400">
              Live and past matchups in one place
            </p>
          </div>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
            {challenges.length} total
          </span>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => {
            const chartData = buildChartData(challenge.yourSleep, challenge.opponentSleep);
            const latestPoint = chartData[chartData.length - 1];
            const maxTotal = Math.max(latestPoint.you, latestPoint.opponent);
            const yAxisMax = Math.ceil(maxTotal / 20) * 20;
            const latestDiff = latestPoint.you - latestPoint.opponent;
            const leadText =
              latestDiff >= 0
                ? `You lead by ${Math.abs(latestDiff).toFixed(1)}h`
                : `${challenge.opponent} leads by ${Math.abs(latestDiff).toFixed(1)}h`;

            const statusClasses =
              challenge.outcome === "active"
                ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                : challenge.outcome === "won"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";

            return (
              <div
                key={challenge.id}
                className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className={`px-4 py-3 ${statusClasses}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{challenge.opponent}</p>
                      <p className="text-sm opacity-90">{challenge.status}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {challenge.timeLeft ??
                          (challenge.outcome === "won" ? "You won" : "You lost")}
                      </span>
                      {challenge.amount ? (
                        <p className="text-xs font-medium opacity-90">
                          {challenge.timeLeft
                            ? `Wager: $${challenge.amount}`
                            : challenge.outcome === "won"
                              ? `+$${challenge.amount}`
                              : `-$${challenge.amount}`}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-violet-900 dark:text-white">
                        Sleep comparison
                      </p>
                      <p className="text-xs text-violet-600 dark:text-zinc-400">
                        {challenge.detail}
                      </p>
                    </div>
                    <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {leadText}
                    </div>
                  </div>

                  <div className="mt-4 h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={buildChartData(challenge.yourSleep, challenge.opponentSleep)}>
                        <CartesianGrid vertical={false} horizontal={false} stroke="#e9d5ff" />
                        <XAxis
                          dataKey="day"
                          tick={{ fontSize: 11, fill: "#7c3aed" }}
                          axisLine={false}
                          tickLine
                          minTickGap={8}
                        />
                        <YAxis
                          label={{
                            value: "Total hours slept",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#7c3aed",
                            dx: 12,
                            dy: 38,
                            fontSize: 10,
                          }}
                          tick={{ fontSize: 11, fill: "#7c3aed" }}
                          axisLine={false}
                          tickLine={false}
                          domain={[0, yAxisMax]}
                          ticks={Array.from({ length: yAxisMax / 20 + 1 }, (_, index) => index * 20)}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="you"
                          name="You"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          dot={{ r: 2.5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="opponent"
                          name={challenge.opponent}
                          stroke="#8b5cf6"
                          strokeWidth={2.5}
                          dot={{ r: 2.5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-violet-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <span>You</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                      <span>{challenge.opponent}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
