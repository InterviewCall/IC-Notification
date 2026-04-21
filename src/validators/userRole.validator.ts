import { z } from 'zod';

export const assignRoleSchema = z.object({
    userId: z.number({ required_error: 'User ID is required', invalid_type_error: 'User ID must be a number' }),
    roleId: z.number({ required_error: 'Role ID is required', invalid_type_error: 'Role ID must be a number' })
});

export const removeRoleSchema = z.object({
    userId: z.number({ required_error: 'User ID is required', invalid_type_error: 'User ID must be a number' }),
    roleId: z.number({ required_error: 'Role ID is required', invalid_type_error: 'Role ID must be a number' })
});

