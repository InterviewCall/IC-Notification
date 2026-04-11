import { Association, BelongsToManyGetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import sequelize from './sequelize';
import User from './user.model';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: number;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

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

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    }
}, {
    tableName: 'roles',
    underscored: true,
    timestamps: true,
    sequelize
});

export default Role;