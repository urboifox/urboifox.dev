import PostModel from '$lib/models/post';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const post = await PostModel.findOne({ where: { slug } });

    return { post };
};
