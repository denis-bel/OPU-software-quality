const tableName = 'transports';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Transport 1'
		}, {
			name: 'Transport 2'
		}, {
			name: 'Transport 3'
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};