import { Router } from 'express';

import roleController from '../../controllers/role.controller';
import authenticationMiddleware from '../../middlewares/auth.middleware';
import { validateRequestBody } from '../../validators';
import { createRoleSchema, updateRoleSchema } from '../../validators/role.validator';

const roleRouter = Router();

roleRouter.get('/all-roles', authenticationMiddleware, roleController.getRolesHandler);

roleRouter.post('/create-role', validateRequestBody(createRoleSchema), authenticationMiddleware, roleController.createRoleHandler);

roleRouter.delete('/delete-role/:id', authenticationMiddleware, roleController.deleteRoleHandler);

roleRouter.patch('/update-role', validateRequestBody(updateRoleSchema), authenticationMiddleware, roleController.updateRoleHandler);

export default roleRouter;