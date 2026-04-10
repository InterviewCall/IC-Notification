import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS user_roles (
                user_id INT UNSIGNED NOT NULL,
                role_id INT UNSIGNED NOT NULL,

                PRIMARY KEY (user_id, role_id),

                CONSTRAINT fk_user_roles_user
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,

                CONSTRAINT fk_user_roles_role
                FOREIGN KEY (role_id) REFERENCES roles(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROP TABLE IF EXISTS user_roles;
        `);
    }
};
