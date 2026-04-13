import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';
import { AuthRequest } from '../types/AuthRequest';


const userRepository = new UserRepository();

const userService=new UserService(userRepository);


async function getUserDetailsById(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const id= req.params.id ;
        const userDetails = await userService.findByIdService(Number(id));
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'User skills updated successfully',
            data: userDetails,
            error: {}
        });     
    } catch (error) {
        next(error);
    }
}

async function getSelfDetails(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const id = req.user?.id;
        const userDetails = await userService.findByIdService(Number(id));
        
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


export default {
    getUserDetailsById,
    getSelfDetails
};