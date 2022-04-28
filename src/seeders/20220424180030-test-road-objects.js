const tableName = 'road_objects';

module.exports = {
	up: async queryInterface =>
		await queryInterface.bulkInsert(tableName, [{
			name: 'Object 1',
			number: 1,
			address: '4363 Cinnamon Lane'
		}, {
			name: 'Object 2',
			number: 2,
			address: '1378 Progress Way'
		}, {
			name: 'Object 3',
			number: 3,
			address: '1320 American Drive'
		}]),
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};