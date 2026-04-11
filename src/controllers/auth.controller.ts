import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SigninUserDto, SignupUserDto } from '../dtos/auth.dto';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import AuthService from '../services/auth.service';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userRoleRepository = new UserRoleRepository();

const authService = new AuthService(userRepository, roleRepository, userRoleRepository);

async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const userDetails: SignupUserDto = req.body;
        const response = await authService.signup(userDetails);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully signed up',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        const userDetails: SigninUserDto = req.body;
        const response = await authService.signin(userDetails);
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully signed in',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default {
    signup, 
    signin
};