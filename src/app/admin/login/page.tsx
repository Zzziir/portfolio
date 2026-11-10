import type { Metadata } from "next";
import { GoogleSignIn } from "./google-sign-in";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

const ERRORS: Record<string, string> = {
  not_allowed: "That Google account doesn't have access.",
  auth_failed: "Sign-in didn't complete. Try again.",
  missing_code: "Sign-in didn't complete. Try again.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = error ? (ERRORS[error] ?? ERRORS.auth_failed) : null;

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-card p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Private
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          Portfolio admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with the owner&apos;s Google account.
        </p>

        <GoogleSignIn />

        {message && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
