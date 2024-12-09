import { PASSWORD, USERNAME } from '$env/static/private';
import { createSession } from '$lib/utils/session';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
    const session = cookies.get('session');

    if (session) {
        redirect(303, '/admin');
    }
};

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const { username, password } = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;

        if (username !== USERNAME || password !== PASSWORD) {
            return { success: false, message: 'Invalid username or password' };
        }

        const session = createSession({ username });
        cookies.set('session', session, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 5 // 5 hours
        });

        redirect(303, '/admin');
    }
} satisfies Actions;
