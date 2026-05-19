import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_KAIZEN_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_KAIZEN_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

if (url && anon) {
  _client = createClient(url, anon);
} else {
  console.warn("[kaizen] Supabase env vars missing — form submissions are disabled.");
}

export const supabase = _client;
