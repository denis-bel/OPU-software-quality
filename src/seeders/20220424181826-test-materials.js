const tableName = 'materials';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Material 1',
			unitFee: 13.95
		}, {
			name: 'Material 2',
			unitFee: 20
		}, {
			name: 'Material 3',
			unitFee: 45
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};