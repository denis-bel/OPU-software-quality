const tableName = 'tools';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Tool 1'
		}, {
			name: 'Tool 2'
		}, {
			name: 'Tool 3'
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};