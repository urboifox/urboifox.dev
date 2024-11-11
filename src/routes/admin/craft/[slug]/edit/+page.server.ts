import { slug } from 'github-slugger';
import CraftModel from '$lib/models/craft';
import { error, redirect } from '@sveltejs/kit';
import { uploadImage } from '$lib/utils/image-uploader';
import { craftSchema } from '$lib/schemas/craft';
import type { Actions } from './$types';

export const actions = {
    edit: async ({ request, params }) => {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries());
        payload.slug = slug(payload.title as string);

        const result = craftSchema.safeParse(payload);

        // validate payload
        if (!result.success) {
            const errors = result?.error?.flatten()?.fieldErrors;
            return { errors };
        }

        // TODO: loop over additional images and upload them
        try {
            payload.image = await uploadImage(payload.image as string);
        } catch (error) {
            console.error('error uploading image', error);
            return { error: 'Failed to upload image' };
        }

        try {
            const newCraft = await CraftModel.findOneAndUpdate(
                { slug: params.slug },
                { $set: payload },
                { new: true }
            );

            if (!newCraft) {
                return error(404, 'Craft not found');
            }
        } catch (error: unknown) {
            console.log('error adding craft', error);
            if (error instanceof Error) {
                return { error: error?.message || 'Error adding craft' };
            }
        }

        if (payload.slug !== params.slug) {
            return redirect(303, `/admin/craft/${payload.slug}/edit`);
        }
        return { success: true };
    },
    delete: async ({ params }) => {
        const { slug } = params;

        try {
            const deleted = await CraftModel.deleteOne({ slug });
            if (!deleted) {
                return error(404, 'Craft not found');
            }
        } catch (error: unknown) {
            console.log('error deleting craft', error);
            if (error instanceof Error) {
                return { error: error?.message || 'Error deleting craft' };
            }
        }

        return redirect(303, '/admin/craft');
    }
} satisfies Actions;
