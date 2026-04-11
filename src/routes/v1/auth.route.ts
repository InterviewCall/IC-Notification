import { Router } from 'express';

import authController from '../../controllers/auth.controller';
import { validateRequestBody } from '../../validators';
import { signinSchema, signupSchema } from '../../validators/auth.validator';

const authRouter = Router();

authRouter.post('/signup', validateRequestBody(signupSchema), authController.signup);

authRouter.post('/signin', validateRequestBody(signinSchema), authController.signin);

export default authRouter;