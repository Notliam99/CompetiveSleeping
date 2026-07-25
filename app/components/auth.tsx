"use client";

import { useState } from "react";
import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";
import { LuCloudMoon, LuKeyRound, LuMail, LuWallet } from "react-icons/lu";

export default function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { login } = useLogin();

  const handleSendCode = async () => {
    if (!email) return;
    await sendCode({ email });
    setCodeSent(true);
  };

  const handleLogin = async () => {
    if (!code) return;
    await loginWithCode({ code });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-50 px-4 py-10 dark:bg-zinc-950">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-violet-200 bg-white shadow-2xl shadow-violet-200/60 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-violet-950/40">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-8 text-white">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <LuCloudMoon className="text-3xl" />
          </div>
          <h1 className="text-3xl font-bold">Sleep App</h1>
          <p className="mt-2 text-sm text-violet-100">
            Log in to track sleep, join challenges, and manage your wagers.
          </p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <button
            type="button"
            onClick={() =>
              login({
                loginMethods: ["wallet"],
                walletChainType: "ethereum-only",
              })
            }
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-violet-300 dark:hover:bg-zinc-700"
          >
            <LuWallet className="text-lg" />
            <span>Continue with wallet</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-violet-200 dark:bg-zinc-700" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 dark:text-zinc-500">
              Or
            </span>
            <div className="h-px flex-1 bg-violet-200 dark:bg-zinc-700" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-violet-900 dark:text-white">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 focus-within:border-violet-400 focus-within:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:bg-zinc-900">
              <LuMail className="text-lg text-violet-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                className="w-full bg-transparent text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleSendCode()}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 dark:bg-violet-500 dark:shadow-violet-950/40 dark:hover:bg-violet-400"
          >
            {codeSent ? "Send a new code" : "Send login code"}
          </button>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-violet-900 dark:text-white">
              One-time code
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 focus-within:border-violet-400 focus-within:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:bg-zinc-900">
              <LuKeyRound className="text-lg text-violet-500" />
              <input
                value={code}
                onChange={(event) => setCode(event.currentTarget.value)}
                placeholder="Enter the code from your email"
                className="w-full bg-transparent text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleLogin()}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Log in
          </button>

          <p className="text-center text-sm text-violet-600 dark:text-zinc-400">
            We&apos;ll email you a secure code instead of asking for a password.
          </p>
        </div>
      </div>
    </div>
  );
}
