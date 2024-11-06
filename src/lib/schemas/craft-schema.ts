import { z } from 'zod';

export const craftSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1)
});
