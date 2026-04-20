import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import { BadRequestError, ConflictError } from '../utils/errors/app.error';
import { UpdateProfileDto } from '../validators/user.validator';
import AuthService from './auth.service';


const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userRoleRepository = new UserRoleRepository();

const authService = new AuthService(userRepository, roleRepository, userRoleRepository);

class UserService {
    private userRepository: UserRepository ;

    constructor( userRepository: UserRepository ){
        this.userRepository = userRepository;
    }

    async getAllUsers({userId}: {userId: number}) {
        await authService.isAuthorized([Roles.ADMIN], userId);
        const users = await this.userRepository.findAllWhere({deletedAt: null});
        return users;
    }

    async getUserDetails(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) { 
            throw new BadRequestError('User not found');
        }

        return user;
    }

    async updateUserProfile(userId: number, data: UpdateProfileDto) {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new BadRequestError('User not found');
        }

        if (data.email && data.email !== existingUser.email) {
            const emailExists = await this.userRepository.findOne({ email: data.email });
            if (emailExists) {
                throw new ConflictError('Email already in use');
            }
        }

        const updatedUser = await this.userRepository.updateById(userId, data);

        return {
            id: updatedUser.id,
            fullName: updatedUser.fullName,
            email: updatedUser.email
        };
    }
    
    
}

export default UserService;