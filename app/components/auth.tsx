"use client";

import { useState } from "react";
import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import { LuArrowRight, LuMail, LuShieldCheck, LuSparkles, LuWallet } from "react-icons/lu";

export default function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { authenticated, login } = usePrivy();

  const handleSendCode = async () => {
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await sendCode({ email });
      setStep("code");
      setMessage("A sign-in code has been sent to your inbox.");
    } catch {
      setMessage("We could not send the sign-in code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (!code.trim()) {
      setMessage("Please enter the verification code.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await loginWithCode({ code });
    } catch {
      setMessage("That code was invalid or has expired. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletLogin = () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      login({ loginMethods: ["wallet"] });
    } catch {
      setMessage("Wallet login was cancelled or failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.24),_transparent_60%)] px-4 py-8 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-[2rem] border border-violet-200 bg-white/90 p-6 shadow-[0_20px_70px_-20px_rgba(109,40,217,0.45)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
            <LuShieldCheck className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Welcome back</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sign in to continue your sleep challenges</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/60">
          <div className="flex items-center gap-2 text-sm font-medium text-violet-700 dark:text-violet-300">
            <LuSparkles className="text-base" />
            <span>Secure magic-link sign in</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            We’ll send a one-time verification code to your email so you can jump straight into the app.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/60">
          <button
            type="button"
            onClick={handleWalletLogin}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-violet-300"
          >
            <LuWallet className="text-base" />
            {isSubmitting ? "Connecting wallet..." : "Continue with wallet"}
          </button>
        </div>

        {step === "email" ? (
          <div className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
              <LuMail className="text-lg text-violet-500" />
              <input
                type="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none text-zinc-900 placeholder:text-zinc-400 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleSendCode}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send verification code"}
              <LuArrowRight className="text-base" />
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Verification code</label>
            <input
              type="text"
              onChange={(e) => setCode(e.currentTarget.value)}
              value={code}
              placeholder="Enter 6-digit code"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm outline-none placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
            <button
              type="button"
              onClick={handleLogin}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Continue"}
              <LuArrowRight className="text-base" />
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setMessage("");
              }}
              className="w-full text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-300"
            >
              Use a different email
            </button>
          </div>
        )}

        {message ? <p className="mt-4 text-sm text-violet-700 dark:text-violet-300">{message}</p> : null}
      </div>
    </div>
  );
}
