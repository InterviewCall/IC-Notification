import { Router } from 'express';

import userController from '../../controllers/user.controller';
import authenticationMiddleware from '../../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/user-details', authenticationMiddleware, userController.userDetailsHandler);

userRouter.get('/all-users', authenticationMiddleware, userController.allUsersHandler);

userRouter.patch('/update-profile', authenticationMiddleware, userController.updateUserHandler);

export default userRouter;