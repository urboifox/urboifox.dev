import PostModel from '$lib/models/post';
import cloudinary from '$lib/utils/cloudinary';
import { z } from 'zod';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

const addPostSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    tags: z.array(z.string()).min(1, "Include at least one tag"),
    content: z.string().min(1),
    image: z.string().min(1, "Image is required"),
});

export const actions = {
    add: async ({ request }) => {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries()) as { [key: string]: string } & {
            tags: string[];
        };
        payload.tags = formData.getAll('tags') as string[];

        const result = addPostSchema.safeParse(payload);

        if (!result.success) {
            const errors = result?.error?.flatten()?.fieldErrors;
            return { errors, payload };
        }

        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(payload.image as string, {
                format: 'webp'
            });

            // replace image absolute path with cloudinary secure url
            payload.image = cloudinaryResponse.secure_url;
        } catch (error) {
            console.log('error uploading image', error);
            return { toast: 'Error uploading image', payload };
        }

        const post = new PostModel(payload);

        try {
            await post.save();
        } catch (error: unknown) {
            console.log('error adding post', error);
            if (error instanceof Error) {
                return { toast: error?.message || 'Error adding post', payload };
            }
        }

        redirect(303, '/admin/blog');
    }
} satisfies Actions;
