import { Router } from 'express';

import userController from '../../controllers/user.controller';
import authenticationMiddleware from '../../middlewares/auth.middleware';

const userRouter=Router();

userRouter.get('/', authenticationMiddleware, userController.getSelfDetails);
userRouter.get('/:id', authenticationMiddleware, userController.getUserDetailsById);

export default userRouter;

