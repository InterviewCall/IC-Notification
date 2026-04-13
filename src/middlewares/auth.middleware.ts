import { NextFunction,  Response } from 'express';

import logger from '../configs/logger.config';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import AuthService from '../services/auth.service';
import { AuthRequest } from '../types/AuthRequest';
import { UserTokenPayload } from '../types/UserTokenPayload';
import { UnauthorizedError } from '../utils/errors/app.error';


const userRepository = new UserRepository();
const roleRepository= new RoleRepository();
const userRoleRepository= new UserRoleRepository();

const authService= new AuthService(userRepository, roleRepository, userRoleRepository);

const authenticationMiddleware = (req : AuthRequest, _res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        logger.error('Authentication failed: No token provided');
        throw new UnauthorizedError('No token provided');
    }

    const decoded  = authService.isAuthenticated(authHeader);
    req.user = decoded as UserTokenPayload;
    next();
};

export default authenticationMiddleware;