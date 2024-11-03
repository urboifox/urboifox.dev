import type { Handle } from '@sveltejs/kit';
import { dbConnect } from './lib/utils/db';

try {
    await dbConnect();
} catch (error) {
    console.log('couldnt connect to mongodb');
}

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    return response;
};
