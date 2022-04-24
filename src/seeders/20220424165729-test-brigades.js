const tableName = 'brigades';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Brigade 1',
			number: 1
		}, {
			name: 'Brigade 2',
			number: 2
		}, {
			name: 'Brigade 3',
			number: 3
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};