import { slug } from 'github-slugger';
import type { Actions } from './$types';
import CraftModel from '$lib/models/craft';
import { redirect } from '@sveltejs/kit';
import { craftSchema } from '$lib/schemas/craft-schema';
import { uploadImage } from '$lib/utils/image-uploader';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries());
        payload.slug = slug(payload.title as string);

        const result = craftSchema.safeParse(payload);

        // validate payload
        if (!result.success) {
            const errors = result?.error?.flatten()?.fieldErrors;
            return { errors };
        }

        // check if craft with this slug already exists
        const existingCraft = await CraftModel.findOne({ slug: payload.slug });

        if (existingCraft) {
            return { error: 'Craft with this title already exists' };
        }

        // TODO: loop over additional images and upload them
        try {
            payload.image = await uploadImage(payload.image as string);
        } catch (error) {
            console.error('error uploading image', error);
            return { error: 'Failed to upload image' };
        }

        const newCraft = new CraftModel(payload);
        try {
            await newCraft.save();
        } catch (error: unknown) {
            console.log('error adding craft', error);
            if (error instanceof Error) {
                return { error: error?.message || 'Error adding craft' };
            }
        }

        redirect(303, '/admin/craft/' + newCraft.slug);
    }
} satisfies Actions;
