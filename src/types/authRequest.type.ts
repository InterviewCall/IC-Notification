import { Request } from 'express';

import { UserTokenPayload } from './usertokenpayload.type';



export type AuthRequest = {
    user?: UserTokenPayload;
} & Request;