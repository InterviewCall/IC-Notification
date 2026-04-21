import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import RoleRepository from '../repositories/role.repository';
import RoleService from '../services/role.service';
import { AuthRequest } from '../types/authRequest.type';

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);

async function getRolesHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const roles = await roleService.getAllRoles({ userId: userId! });
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Roles retrieved successfully',
            data: roles,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function createRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const validatedData: CreateRoleDto = (req.body);
        const role = await roleService.createRole({ ...validatedData, userId: userId! });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Role created successfully',
            data: role,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function deleteRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const roleId = Number(req.params.id);
        const result = await roleService.deleteRole({ id: roleId, userId: userId! });
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Role deleted successfully',
            data: result,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function updateRoleHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const validatedData: UpdateRoleDto = (req.body);
        const role = await roleService.updateRole({ ...validatedData, userId: userId! });
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Role updated successfully',
            data: role,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getRolesHandler,
    createRoleHandler,
    deleteRoleHandler,
    updateRoleHandler
};