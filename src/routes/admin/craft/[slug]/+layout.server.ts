import { EJSON } from 'bson';
import type { LayoutServerLoad } from '../../../craft/[slug]/$types';
import { error } from '@sveltejs/kit';
import CraftModel, { type Craft } from '$lib/models/craft';

export const load: LayoutServerLoad = async ({ params }): Promise<{ craft: Craft }> => {
    const { slug } = params;
    const craft = await CraftModel.findOne({ slug });

    if (!craft) {
        error(404, 'Craft not found');
    }

    return { craft: EJSON.deserialize(craft) };
};
