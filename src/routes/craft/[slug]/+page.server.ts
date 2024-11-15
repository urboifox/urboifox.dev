import { EJSON } from 'bson';
import { error } from '@sveltejs/kit';
import CraftModel, { type Craft } from '$lib/models/craft';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<{ craft: Craft }> => {
    const { slug } = params;
    const craft = await CraftModel.findOne({ slug });

    if (!craft) {
        error(404, 'Craft not found');
    }

    return { craft: EJSON.deserialize(craft) };
};