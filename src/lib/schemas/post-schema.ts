import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    tags: z.array(z.string()).min(1, 'Include at least one tag'),
    content: z.string().min(1),
    image: z.string().min(1, 'Image is required')
});
