const { USER_ROLE_EMPLOYEE, USER_ROLE_ACCOUNTANT, USER_ROLE_ADMIN } = require('@constants/User');
import User from '@classes/dbModels/User';
const tableName = 'users';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			login: 'employee',
			password: await User.hashPassword('employee'),
			role: USER_ROLE_EMPLOYEE,
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			login: 'accountant',
			password: await User.hashPassword('accountant'),
			role: USER_ROLE_ACCOUNTANT,
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			login: 'admin',
			password: await User.hashPassword('admin'),
			role: USER_ROLE_ADMIN,
			createdAt: new Date(),
			updatedAt: new Date()
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};