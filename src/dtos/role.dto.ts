import { z } from 'zod';

import { createRoleSchema, updateRoleSchema } from '../validators/role.validator';

export type CreateRoleDto = z.infer<typeof createRoleSchema> & { userId: number };

export type DeleteRoleDto = { id: number, userId: number };

export type UpdateRoleDto = z.infer<typeof updateRoleSchema> & { userId: number };

export type GetAllRolesDto = { userId: number };                    