import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import PostModel from '$lib/models/post';
import { uploadImage } from '$lib/utils/image-uploader';
import { postSchema } from '$lib/schemas/post';

export const load: PageServerLoad = async ({ parent }) => {
    const { toc, post } = await parent();

    if (!post || !toc) {
        error(404, 'Post not found');
    }
    return { toc, post };
};

export const actions = {
    edit: async ({ request, params }) => {
        const { slug } = params;
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

        try {
            payload.image = await uploadImage(payload.image);
        } catch {
            return { toast: 'Error uploading image' };
        }

        try {
            // Update post in the database
            const updatedPost = await PostModel.findOneAndUpdate(
                { slug },
                { $set: payload },
                { new: true } // returns the updated document
            );

            if (!updatedPost) {
                return error(404, 'Post not found');
            }
        } catch (dbError) {
            console.log('Error updating post', dbError);
            return { toast: 'Error updating post' };
        }

        if (payload.slug !== slug) {
            return redirect(303, `/admin/blog/${payload.slug}/edit`);
        }
        return { toast: 'Post updated successfully' };
    },
    delete: async ({ params }) => {
        const { slug } = params;

        try {
            const deleted = await PostModel.deleteOne({ slug });
            if (!deleted) {
                return error(404, 'Post not found');
            }
        } catch (error: unknown) {
            console.log('error deleting post', error);
            if (error instanceof Error) {
                return { error: error?.message || 'Error deleting post' };
            }
        }

        return redirect(303, '/admin/blog');
    }
} satisfies Actions;
