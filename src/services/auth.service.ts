import { UniqueConstraintError, ValidationError } from 'sequelize';

import logger from '../configs/logger.config';
import sequelize from '../db/models/sequelize';
import { SigninUserDto, SignupUserDto } from '../dtos/auth.dto';
import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import auth from '../utils/auth/auth';
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../utils/errors/app.error';

class AuthService {
    private userRepository: UserRepository;
    private roleRepository: RoleRepository;
    private userRoleRepository: UserRoleRepository;

    constructor(userRepository: UserRepository, roleRepository: RoleRepository, userRoleRepository: UserRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    async signup(data: SignupUserDto): Promise<string> {
        const role = await this.roleRepository.findOne({ name: Roles.OPERATION_ADMIN, deleted_at: null });
        if(!role) {
            throw new NotFoundError(`Role with name ${Roles.OPERATION_ADMIN} is not found`);
        }

        const transaction = await sequelize.transaction();
        try {
            const user = await this.userRepository.create(data, transaction);
            await this.userRoleRepository.create({ userId: user.id, roleId: role.id }, transaction);
            await transaction.commit();

            const token = auth.createToken({ id: user.id, email: user.email });
            return token;
        } catch (error) {
            await transaction.rollback();
            logger.error('Signup failed', error);

            if(error instanceof UniqueConstraintError) {
                throw new ConflictError(error.errors[0].message);
            }

            if(error instanceof ValidationError) {
                console.log('this one');
                throw new BadRequestError(error.errors[0].message);
            }

            throw new InternalServerError('Something went wrong');
        }
    }

    async signin(data: SigninUserDto): Promise<string> {
        const user = await this.userRepository.findOne({ email: data.email, deletedAt: null });
        if(!user) {
            throw new UnauthorizedError('User is not present');
        }

        const isPasswordMatched = await auth.checkPassword(data.password, user.password);
        if(!isPasswordMatched) {
            throw new UnauthorizedError('Incorrect password');
        }

        const token = auth.createToken({ id: user.id, email: user.email });
        return token;
    }
}

export default AuthService;