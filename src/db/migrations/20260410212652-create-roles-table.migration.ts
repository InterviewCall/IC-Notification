import { QueryInterface } from 'sequelize';
 
export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL
            );
        `);

    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
            DROPT TABLE IF NOT EXISTS roles;
        `);
    }
};
