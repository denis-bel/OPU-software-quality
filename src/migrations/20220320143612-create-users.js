const { USER_ROLE_ACCOUNTANT, USER_ROLE_EMPLOYEE, USER_ROLE_ADMIN } = require('@constants/User');

const tableName = 'users';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(tableName, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			login: {
				type: Sequelize.STRING(50),
				unique: true,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			role: {
				type: Sequelize.ENUM(USER_ROLE_ACCOUNTANT, USER_ROLE_EMPLOYEE, USER_ROLE_ADMIN),
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: 'TIMESTAMP',
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: 'TIMESTAMP',
				defaultValue: Sequelize.fn('NOW')
			}
		});
		/* eslint-disable no-useless-escape */
		await queryInterface.sequelize.query(`
      ALTER TABLE ${tableName} ADD constraint proper_login CHECK (login ~* '^[a-z0-9_-]{3,16}$');
      `);
	},
	async down(queryInterface) {
		await queryInterface.dropTable(tableName);
	}
};