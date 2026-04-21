import { CreationAttributes, Transaction } from 'sequelize';

import UserRole from '../db/models/userRole.mode';
import BaseRepository from './base.repository';

class UserRoleRepository extends BaseRepository<UserRole> {
    constructor() {
        super(UserRole);
    }

    async create(data: CreationAttributes<UserRole>, transaction?: Transaction) {
        const record = await this.model.create(data, { transaction });
        return record;
    }

    async getUserRoles(userId: number) {
        const userRoles = await this.model.findAll({
            where: { userId },
            attributes: [],
            include: [
                {
                    association: UserRole.associations.role,
                    attributes: ['name','id'],
                }
            ]
        });
        return userRoles;
    }
}

export default UserRoleRepository;