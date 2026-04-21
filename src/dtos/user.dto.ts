import { z } from 'zod';

import { updateProfileSchema } from '../validators/user.validator';

export type UpdateProfileDto = z.infer<typeof updateProfileSchema> & { userId: number };

export type GetUserDetailsDto = { userId: number };

export type GetAllUsersDto = { userId: number };