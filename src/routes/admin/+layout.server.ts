import { redirect } from '@sveltejs/kit';
import { validateSession } from '$lib/utils/session';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
    const session = cookies.get('session');

    if (!session) {
        redirect(303, '/login');
    }

    const valid = validateSession(session);

    if (!valid) {
        cookies.delete('session', { path: '/' });
        redirect(303, '/login');
    }
};
