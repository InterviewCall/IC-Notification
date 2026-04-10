import { Association, BelongsToManyGetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import sequelize from './sequelize';
import User from './user.model';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: number;
    declare name: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;

    declare users?: NonAttribute<User[]>;
    declare getUsers: BelongsToManyGetAssociationsMixin<User>;

    static associations: {
        users: Association<Role, User>
    };
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(20),
        validate: {
            notEmpty: {
                msg: 'Role name is required'
            }
        },
        allowNull: false
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    }
}, {
    tableName: 'roles',
    underscored: true,
    timestamps: false,
    sequelize
});

export default Role;