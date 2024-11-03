import PostModel from '$lib/models/post';
import cloudinary from '$lib/utils/cloudinary';
import type { Actions } from './$types';

export const actions = {
    add: async ({ request }) => {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries()) as { [key: string]: string };

        // TODO: validate payload

        const cloudinaryResponse = await cloudinary.uploader.upload(payload.image, {
            format: 'webp'
        });

        // replace image absolute path with cloudinary secure url
        payload.image = cloudinaryResponse.secure_url;

        const post = new PostModel(payload);

        try {
            await post.save();
        } catch (error: unknown) {
            console.log('error adding post', error);
            return { error: 'Error adding post' };
        }

        return { ...payload };
    }
} satisfies Actions;
