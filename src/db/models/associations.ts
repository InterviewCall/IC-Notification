import Role from './role.model';
import User from './user.model';
import UserRole from './userRole.mode';

User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId',
    as: 'roles'
});

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    otherKey: 'userId',
    as: 'users'
});

UserRole.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

UserRole.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});

User.hasMany(UserRole, {
    foreignKey: 'userId',
    as: 'userRoles'
});

Role.hasMany(UserRole, {
    foreignKey: 'roleId',
    as: 'roleUsers'
});