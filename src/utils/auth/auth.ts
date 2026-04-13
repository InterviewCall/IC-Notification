import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

import { serverConfig } from '../../configs/server.config';
import { JwtTokenInput } from '../../types/jsontokeninput.type';
import { UserTokenPayload } from '../../types/usertokenpayload.type';

const { SALT, JWT_SECRET, JWT_EXPIRES_IN } = serverConfig;

async function hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function checkPassword(password: string, hashedPasswrod: string): Promise<boolean> {
    try {
        const isMatchPassword = await bcrypt.compare(password, hashedPasswrod);
        return isMatchPassword;
    } catch (error) {
        throw error;
    }
}

function createToken(payload: JwtTokenInput): string {
    try {
        const token = jwt.sign(payload, JWT_SECRET as Secret, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token: string): UserTokenPayload {
    try {
        return jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    } catch (error) {
        throw error;
    }
}

export default {
    hashPassword,
    checkPassword,
    createToken,
    verifyToken
};