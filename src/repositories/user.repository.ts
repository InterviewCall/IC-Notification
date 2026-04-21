import { CreationAttributes, Transaction } from 'sequelize';

import User from '../db/models/user.model';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async findById(id: number) {
        const record = await this.model.findOne({
            where: { id, deletedAt: null },
            attributes: ['id', 'email', 'fullName'],
            include: [
                {
                    association: User.associations.roles,
                    attributes: ['name', 'id'],

                } 
            ]
        });
        return record;
    }

    async findAllUsers(){
        const records = await this.model.findAll({
            where: { deletedAt: null },
            attributes: ['id', 'email', 'fullName'],
        });
        return records;
    }

    async create(data: CreationAttributes<User>, transaction?: Transaction): Promise<User> {
        const record = await this.model.create(data, { transaction });
        return record;
    }

    async getUserRoles(userId: number) {
        const userRoles = await this.model.findOne({
            where: { id: userId },
            include: [
                {
                    association: User.associations.roles,
                    attributes: ['name'],

                } 
            ]
        });

        return userRoles ;
    }
}

export default UserRepository;