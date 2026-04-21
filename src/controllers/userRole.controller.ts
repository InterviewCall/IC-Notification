import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import UserRoleService from '../services/userRole.service';
import { AuthRequest } from '../types/authRequest.type';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userRoleRepository = new UserRoleRepository();
const userRoleService = new UserRoleService(userRepository, roleRepository, userRoleRepository);

async function getUserRolesHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id, 10);
        const requestingUserId = req.user?.id;

        const userRoles = await userRoleService.getUserRoles(userId, requestingUserId!);
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'User roles retrieved successfully',
            data: userRoles,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function assignRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { userId, roleId } = (req.body);
        const requestingUserId = req.user?.id;

        const result = await userRoleService.assignRole({ userId, roleId, requestingUserId: requestingUserId! });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Role assigned successfully',
            data: result,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function removeRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = Number(req.params.userId);
        const roleId = Number(req.params.roleId);
        const requestingUserId = req.user?.id;

        const result = await userRoleService.removeRole({ userId, roleId, requestingUserId: requestingUserId! });
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Role removed successfully',
            data: result,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getUserRolesHandler,
    assignRoleHandler,
    removeRoleHandler
};
