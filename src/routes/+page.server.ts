  import { supabase } from "$lib/supabaseClient";

  export async function load() {
    return
    const { data } = await supabase.from("skills").select();
    return {
      countries: data ?? [],
    };
  }