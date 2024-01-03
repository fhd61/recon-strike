import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'

const url: string = import.meta.env.VITE_SUPABASEURL;
const key: string = import.meta.env.VITE_SUPABASE_KEY;

export async function handle({ event, resolve }) {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: url,
        supabaseKey: key,
        event
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}