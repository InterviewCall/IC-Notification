import { z } from 'zod';

import { signinSchema, signupSchema } from '../validators/auth.validator';

export type SignupUserDto = z.infer<typeof signupSchema>;

export type SigninUserDto = z.infer<typeof signinSchema>;