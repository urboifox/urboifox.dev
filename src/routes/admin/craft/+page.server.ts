import { EJSON } from 'bson';
import type { PageServerLoad } from '../../craft/$types';
import CraftModel, { type Craft } from '$lib/models/craft';

export const load: PageServerLoad = async () => {
    let crafts: Craft[] = [];

    try {
        crafts = await CraftModel.find();
    } catch (error) {
        console.error(error);
        return {
            crafts: [],
            error: "Couldn't load crafts"
        };
    }
    return { crafts: EJSON.deserialize(crafts) };
};
