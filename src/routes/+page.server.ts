import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals: { supabase } }) => {
    const { error } = await supabase.auth.signInWithOAuth({provider: 'discord'})

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false })
    }

    console.log({
      message: 'Please check your email for a magic link to log into the website.',
      success: true,
    }
)
    return {
      message: 'Please check your email for a magic link to log into the website.',
      success: true,
    }
  },
}