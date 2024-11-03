import PostModel from '$lib/models/post';
import cloudinary from '$lib/utils/cloudinary';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { postSchema } from '$lib/schemas/post-schema';

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
            return { toast: 'Post with this slug already exists' };
        }

        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(payload.image as string, {
                format: 'webp'
            });

            // replace image absolute path with cloudinary secure url
            payload.image = cloudinaryResponse.secure_url;
        } catch (error) {
            console.log('error uploading image', error);
            return { toast: 'Error uploading image' };
        }

        const post = new PostModel(payload);

        try {
            await post.save();
        } catch (error: unknown) {
            console.log('error adding post', error);
            if (error instanceof Error) {
                return { toast: error?.message || 'Error adding post' };
            }
        }

        redirect(303, '/admin/blog');
    }
} satisfies Actions;
