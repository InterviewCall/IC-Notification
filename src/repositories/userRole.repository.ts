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
}

export default UserRoleRepository;