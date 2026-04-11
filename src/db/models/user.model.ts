import { Association, BelongsToManyGetAssociationsMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import auth from '../../utils/auth/auth';
import Role from './role.model';
import sequelize from './sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

    declare roles?: NonAttribute<Role[]>;
    declare getRoles: BelongsToManyGetAssociationsMixin<Role>;

    static associations: {
        roles: Association<User, Role>
    };
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },

    fullName: {
        type: DataTypes.STRING(50),
        validate: {
            notEmpty: {
                msg: 'Full name is required'
            }
        },
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(100), 
        unique: {
            name: 'unique_email',
            msg: 'User has already registered'
        },
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        },
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(255),
        validate: {
            notEmpty: {
                msg: 'Password is required'
            }
        },
        allowNull: false,
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
    tableName: 'users',
    underscored: true,
    timestamps: true,
    sequelize,
    hooks: {
        beforeSave: async (user: User) => {
            if(user.changed('password')) {
                user.password = await auth.hashPassword(user.password);
            }
        }
    }
});

export default User;