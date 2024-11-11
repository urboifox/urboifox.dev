import PostModel from '$lib/models/post';
import { redirect } from '@sveltejs/kit';
import { uploadImage } from '$lib/utils/image-uploader';
import { postSchema } from '$lib/schemas/post';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries()) as { [key: string]: string } & {
            tags: string[];
        };
        payload.tags = formData.getAll('tags') as string[];

        const result = postSchema.safeParse(payload);

        if (!result.success) {
            const errors = result?.error?.flatten()?.fieldErrors;
            return { errors };
        }

        const existingPost = await PostModel.findOne({ slug: payload.slug });

        if (existingPost) {
            return { error: 'Post with this slug already exists' };
        }

        try {
            payload.image = await uploadImage(payload.image as string);
        } catch {
            return { error: 'Error uploading image' };
        }

        const post = new PostModel(payload);

        try {
            await post.save();
        } catch (error: unknown) {
            console.log('error adding post', error);
            if (error instanceof Error) {
                return { error: error?.message || 'Error adding post' };
            }
        }

        redirect(303, '/admin/blog/' + post.slug);
    }
} satisfies Actions;
