import { UniqueConstraintError } from 'sequelize';

import { CreateRoleDto, DeleteRoleDto, GetAllRolesDto, UpdateRoleDto } from '../dtos/role.dto';
import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import { ConflictError } from '../utils/errors/app.error';
import AuthService from './auth.service';

const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const userRoleRepository = new UserRoleRepository();

const authService = new AuthService(userRepository, roleRepository, userRoleRepository );

class RoleService {
    private roleRepository: RoleRepository;

    constructor(roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    async getAllRoles(data: GetAllRolesDto) {
        await authService.isAuthorized([Roles.ADMIN], data.userId);
        const roles = await this.roleRepository.findAllWhere({ deletedAt: null });
        return roles;
    }

    async createRole(data: CreateRoleDto) {
        try {
            await authService.isAuthorized([Roles.ADMIN], data.userId);

            const role = await this.roleRepository.create({ name: data.name });
            return role;
        } catch (error) {
            if ( error instanceof UniqueConstraintError ){
                throw new ConflictError('Role with this name already exists');
            } else {
                throw error ;
            }
        }
    }

    async deleteRole(data: DeleteRoleDto) {
        await authService.isAuthorized([Roles.ADMIN], data.userId);

        await this.roleRepository.delete({ id: data.id });
        return true;
    }

    async updateRole(data: UpdateRoleDto) {
        await authService.isAuthorized([Roles.ADMIN], data.userId);

        const updatedRole = await this.roleRepository.updateById(data.id, { name: data.name });
        return updatedRole;
    }
}

export default RoleService;