import { CreateRoleDto, DeleteRoleDto, GetAllRolesDto, UpdateRoleDto } from '../dtos/role.dto';
import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import { ConflictError, NotFoundError } from '../utils/errors/app.error';
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
        await authService.isAuthorized([Roles.ADMIN], data.userId);

        const existingRole = await this.roleRepository.findOne({ name: data.name, deletedAt: null });
        if (existingRole) {
            throw new ConflictError('Role already exists');
        }

        const role = await this.roleRepository.create({ name: data.name });
        return role;
    }

    async deleteRole(data: DeleteRoleDto) {
        await authService.isAuthorized([Roles.ADMIN], data.userId);

        const role = await this.roleRepository.findById(data.id);

        if (!role || role.deletedAt !== null) {
            throw new NotFoundError('Role not found');
        }

        await this.roleRepository.updateById(data.id, { deletedAt: new Date() });
        return true;
    }

    async updateRole(data: UpdateRoleDto) {
        await authService.isAuthorized([Roles.ADMIN], data.userId);

        const role = await this.roleRepository.findById(data.id);
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        const existingRole = await this.roleRepository.findOne({ name: data.name, deletedAt: null });
        if (existingRole && existingRole.id !== data.id) {
            throw new ConflictError('Role name already exists');
        }

        const updatedRole = await this.roleRepository.updateById(data.id, { name: data.name });
        return updatedRole;
    }
}

export default RoleService;