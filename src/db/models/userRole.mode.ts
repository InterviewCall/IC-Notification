import { Association, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import Role from './role.model';
import sequelize from './sequelize';
import User from './user.model';

class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
    declare userId: ForeignKey<User['id']>;
    declare roleId: ForeignKey<Role['id']>;

    declare role?: NonAttribute<Role>;
    declare user?: NonAttribute<User>;

    static associations: {
        user: Association<UserRole, User>;
        role: Association<UserRole, Role>;
    };
}

UserRole.init({
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'user_roles',
    underscored: true,
    timestamps: false,
    sequelize
});

export default UserRole;