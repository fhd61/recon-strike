import { error, redirect } from '@sveltejs/kit';

export async function POST({ locals }) {
    const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
        provider: "discord"
    });

    if (err) {
        throw error(400, { message: 'Server error. Try again later.' });
    }

    throw redirect(303, data.url);
}