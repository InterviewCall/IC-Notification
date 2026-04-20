import { Request } from 'express';

export type UserTokenPayload = {
    id: number,
    email: string,
}

export type AuthRequest = {
    user: UserTokenPayload;
} & Request;