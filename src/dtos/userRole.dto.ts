import { z } from 'zod';

import { assignRoleSchema, removeRoleSchema } from '../validators/userRole.validator';

export type AssignRoleDto = z.infer<typeof assignRoleSchema> & { requestingUserId: number };

export type RemoveRoleDto = z.infer<typeof removeRoleSchema> & { requestingUserId: number };