import { Router } from 'express';

import userRoleController from '../../controllers/userRole.controller';
import authenticationMiddleware from '../../middlewares/auth.middleware';
import { validateRequestBody } from '../../validators';
import { assignRoleSchema } from '../../validators/userRole.validator';

const userRoleRouter = Router();

userRoleRouter.get('/user/:id', authenticationMiddleware, userRoleController.getUserRolesHandler);

userRoleRouter.post('/assign-role', authenticationMiddleware, validateRequestBody(assignRoleSchema) , userRoleController.assignRoleHandler);

userRoleRouter.delete('/remove-role/user/:userId/role/:roleId', authenticationMiddleware, userRoleController.removeRoleHandler);

export default userRoleRouter;