import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';

import { AssignRoleDto, RemoveRoleDto } from '../dtos/userRole.dto';
import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import { BadRequestError } from '../utils/errors/app.error';
import AuthService from './auth.service';


const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userRoleRepository = new UserRoleRepository();
const authService = new AuthService(userRepository, roleRepository, userRoleRepository);

class UserRoleService {
    private userRoleRepository: UserRoleRepository;

    constructor(userRoleRepository: UserRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    async getUserRoles(userId: number, requestingUserId: number) {
        await authService.isAuthorized([Roles.ADMIN], requestingUserId);

        const userRoles = await this.userRoleRepository.getUserRoles(userId);
        
        if (!userRoles.length) {
            throw new BadRequestError('User not found');
        }

        return {
            userId,
            roles: userRoles.map((userRole) => ({ id: userRole.role?.id, name: userRole.role?.name }))
        };
    }

    async assignRole( data: AssignRoleDto ) {
        try {
            await authService.isAuthorized([Roles.ADMIN], data.requestingUserId);

            await this.userRoleRepository.create({ userId: data.userId, roleId: data.roleId });

            return {
                userId: data.userId,
                role: { id: data.roleId }
            };
        } catch (error) {

            if (error instanceof ForeignKeyConstraintError) {
                if (error.index === 'fk_user_roles_user') {
                    throw new BadRequestError('User does not exist');
                }

                if (error.index === 'fk_user_roles_role') {
                    throw new BadRequestError('Role does not exist');
                }

            } else if ( error instanceof UniqueConstraintError ){
                throw new BadRequestError('Role already assigned to this user');
            } else {
                throw error;
            }
        }
        
    }

    async removeRole(data: RemoveRoleDto,) {
        try {
            await authService.isAuthorized([Roles.ADMIN], data.requestingUserId);

            await this.userRoleRepository.delete({ userId: data.userId, roleId: data.roleId });

            return true ;
        } catch (error) {

            if (error instanceof ForeignKeyConstraintError) {
                if (error.index === 'fk_user_roles_user') {
                    throw new BadRequestError('User does not exist');
                }

                if (error.index === 'fk_user_roles_role') {
                    throw new BadRequestError('Role does not exist');
                }

            } else {
                throw error;
            }
        }
        
    }
}

export default UserRoleService;
