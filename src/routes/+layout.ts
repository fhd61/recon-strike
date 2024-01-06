import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

const url: string = import.meta.env.VITE_SUPABASEURL;
const key: string = import.meta.env.VITE_SUPABASE_KEY;

export async function load({ fetch, data, depends }) {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: url,
    supabaseKey: key,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}