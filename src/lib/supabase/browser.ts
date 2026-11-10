import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client (publishable key), used to start Google sign-in. */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
