import { NextFunction,  Response } from 'express';

import logger from '../configs/logger.config';
import UserService from '../services/user.service';
import { AuthRequest } from '../types/authRequest.types';
import { UserTokenPayload } from '../types/usertokenpayload.type';
import { UnauthorizedError } from '../utils/errors/app.error';



const userService = new UserService();

const authenticationMiddleware = (req : AuthRequest, _res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        logger.error('Authentication failed: No token provided');
        throw new UnauthorizedError('No token provided');
    }

    const decoded  = userService.isAuthenticated(authHeader);
    req.user = decoded as UserTokenPayload;
    next();
};

export default authenticationMiddleware;
