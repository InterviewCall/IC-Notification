import { z } from 'zod';

export const updateProfileSchema = z.object({
    fullName: z.string({ required_error: 'Full name is required' })
        .min(5, { message: 'Full name must be at least 5 characters' })
        .max(50, { message: 'Full name must be less than 50 characters' })
        .optional(),

    email: z.string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' })
        .optional()
}).refine((data) => data.fullName || data.email, {
    message: 'At least one of fullName or email is required'
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;