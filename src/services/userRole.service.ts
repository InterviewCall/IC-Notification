import { AssignRoleDto, RemoveRoleDto } from '../dtos/userRole.dto';
import { Roles } from '../enums/role.enum';
import RoleRepository from '../repositories/role.repository';
import UserRepository from '../repositories/user.repository';
import UserRoleRepository from '../repositories/userRole.repository';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors/app.error';
import AuthService from './auth.service';


const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userRoleRepository = new UserRoleRepository();
const authService = new AuthService(userRepository, roleRepository, userRoleRepository);

class UserRoleService {
    private userRepository: UserRepository;
    private roleRepository: RoleRepository;
    private userRoleRepository: UserRoleRepository;

    constructor(userRepository: UserRepository, roleRepository: RoleRepository, userRoleRepository: UserRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    async getUserRoles(userId: number, requestingUserId: number) {
        await authService.isAuthorized([Roles.ADMIN], requestingUserId);

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return {
            userId: user.id,
            roles: user.roles?.map((r) => ({ id: r.id, name: r.name }))
        };
    }

    async assignRole( data: AssignRoleDto ) {
        await authService.isAuthorized([Roles.ADMIN], data.requestingUserId);

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const role = await this.roleRepository.findOne({id: data.roleId, deletedAt: null });
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        const existingAssignment = await this.userRoleRepository.findOne({roleId: data.roleId, userId: data.userId });
        if (existingAssignment) {
            throw new ConflictError('Role already assigned to this user');
        }

        await this.userRoleRepository.create({ userId: data.userId, roleId: data.roleId });

        return {
            userId: data.userId,
            role: { id: role.id, name: role.name }
        };
    }

    async removeRole(data: RemoveRoleDto,) {
        await authService.isAuthorized([Roles.ADMIN], data.requestingUserId);

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const role = await this.roleRepository.findById(data.roleId);
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        const existingAssignment = await this.userRoleRepository.findOne({ userId: data.userId, roleId: data.roleId });
        if (!existingAssignment) {
            throw new BadRequestError('Role not assigned to this user');
        }

        await this.userRoleRepository.delete({ userId: data.userId, roleId: data.roleId });

        return true ;
    }
}

export default UserRoleService;
