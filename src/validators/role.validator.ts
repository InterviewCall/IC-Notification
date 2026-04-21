import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string({ required_error: 'Role name is required' })
        .min(1, { message: 'Role name is required' })
        .max(20, { message: 'Role name must be less than 20 characters' })
});

export const updateRoleSchema = z.object({
    id: z.number({ required_error: 'Role ID is required' })
        .positive({ message: 'Role ID must be a positive number' }),
    name: z.string({ required_error: 'Role name is required' })
        .min(1, { message: 'Role name is required' })
        .max(20, { message: 'Role name must be less than 20 characters' })
});