import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';
import { AuthRequest } from '../types/authRequest.type';
import { updateProfileSchema } from '../validators/user.validator';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

async function userDetailsHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const userDetails = await userService.getUserDetails({userId: userId!});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'User details retrieved successfully',
            data: userDetails,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function allUsersHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const users = await userService.getAllUsers({userId: userId!});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function updateUserHandler(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const validatedData = updateProfileSchema.parse(req.body);
        const updatedUser = await userService.updateUserProfile({ ...validatedData, userId: userId! });
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'User profile updated successfully',
            data: updatedUser,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default {
    userDetailsHandler,
    allUsersHandler,
    updateUserHandler
};