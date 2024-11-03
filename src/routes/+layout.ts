import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }): Promise<{ url: URL }> => {
    return { url };
};
