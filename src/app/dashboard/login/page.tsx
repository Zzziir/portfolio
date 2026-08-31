"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const res = await fetch("/api/dashboard/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    const data = (await res.json().catch(() => null)) as
      | { error?: string }
      | null;
    setError(data?.error ?? "Something went wrong.");
    setPending(false);
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-card p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Private
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          Inquiries dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the password to continue.
        </p>

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/10"
        />

        {error && (
          <p role="alert" className="mt-3 text-sm text-[color:var(--brand-soft)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-xl bg-foreground py-3.5 text-[15px] font-medium text-background transition-transform hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
