import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            ALTER TABLE roles
            MODIFY COLUMN name VARCHAR(20) NOT NULL UNIQUE;
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            ALTER TABLE roles
            MODIFY COLUMN name VARCHAR(20) NOT NULL;
        `);
    }
};
