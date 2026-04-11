import { CreationAttributes, Transaction } from 'sequelize';

import User from '../db/models/user.model';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async create(data: CreationAttributes<User>, transaction?: Transaction): Promise<User> {
        const record = await this.model.create(data, { transaction });
        return record;
    }
}

export default UserRepository;