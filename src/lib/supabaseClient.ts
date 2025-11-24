import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[supabaseClient] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. " +
      "Supabase calls will fail until you configure them."
  );
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? ""
);
