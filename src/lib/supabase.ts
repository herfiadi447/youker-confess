import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Client for public operations (safe for build time)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client function (reads process.env dynamically at runtime, prioritizing valid service role key for RLS bypass)
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  
  const isValidKey = (k?: string) => k && k.trim() !== '' && !k.includes('isi_dengan') && !k.includes('placeholder');
  const key = isValidKey(serviceKey) ? serviceKey! : anonKey;
  
  return createClient(url, key);
}


