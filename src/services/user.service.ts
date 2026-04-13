import logger from '../configs/logger.config';
import UserRepository from '../repositories/user.repository';
import { NotFoundError } from '../utils/errors/app.error';

class UserService{
    private userRepository:UserRepository;

    constructor(userRepository:UserRepository){
        this.userRepository = userRepository;
    }

    async findByIdService(id: number) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            logger.error('User not found');
            throw new NotFoundError('User not found');
        }
        return user;
    }

    
}

export default UserService;