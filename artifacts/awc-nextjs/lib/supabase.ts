import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

function publicEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || url.includes("your-project") || !anonKey || anonKey === "your-anon-key") {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return { url, anonKey };
}

/** Browser/client-side Supabase client (lazy — safe during Next.js build). */
export function getSupabase(): SupabaseClient {
  if (!browserClient) {
    const { url, anonKey } = publicEnv();
    browserClient = createClient(url, anonKey);
  }
  return browserClient;
}

/**
 * Server-side Supabase client with service role key.
 * Use ONLY in API routes and server actions — never expose to the browser.
 */
export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!url || url.includes("your-project") || !key || key === "your-service-role-key") {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
