const tableName = 'work_types';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Work type 1'
		}, {
			name: 'Work type 2'
		}, {
			name: 'Work type 3'
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};