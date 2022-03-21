const { USER_ROLE_USER, USER_ROLE_ADMIN, USER_ROLE_SUPER_ADMIN } = require('@constants/User');
import User from '@classes/dbModels/User';
const tableName = 'users';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			login: 'testUser',
			password: await User.hashPassword('userPassword'),
			role: USER_ROLE_USER,
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			login: 'testAdmin',
			password: await User.hashPassword('adminPassword'),
			role: USER_ROLE_ADMIN,
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			login: 'testSuperAdmin',
			password: await User.hashPassword('superAdminPassword'),
			role: USER_ROLE_SUPER_ADMIN,
			createdAt: new Date(),
			updatedAt: new Date()
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};