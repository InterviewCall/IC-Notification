import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import logger from '../configs/logger.config';
import authUtils from '../utils/auth/auth';
import { UnauthorizedError } from '../utils/errors/app.error';

class UserService {
    
    isAuthenticated(authToken: string){
        try {
            const decoded = authUtils.verifyToken(authToken as string);
            return decoded;
            
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return new UnauthorizedError('Session expired. Please login again.');
            } else if (error instanceof JsonWebTokenError) {
                logger.error('Invalid token');
                throw new UnauthorizedError('Invalid token');
            } else {
                logger.error('Verification of token failed');
                throw new UnauthorizedError('Verification of token failed');
            }
      
        }
    }
}

export default UserService;