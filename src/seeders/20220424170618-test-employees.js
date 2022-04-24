import Brigade from '@classes/dbModels/Brigade';

const tableName = 'employees';

module.exports = {
	up: async queryInterface => {
		const brigade1 = await Brigade.findOne({
			where: {
				name: 'Brigade 1'
			}
		});
		const brigade2 = await Brigade.findOne({
			where: {
				name: 'Brigade 2'
			}
		});
		return await queryInterface.bulkInsert(tableName, [{
			fullName: 'Joshua K. Gunn',
			address: '1009 Simpson Avenue',
			phone: '717-944-4268',
			email: 'JoshuaKGunn@armyspy.com',
			brigadeId: brigade1.id
		}, {
			fullName: 'Julie L. Furguson',
			address: '3099 Pinewood Avenue',
			phone: '',
			email: 'JulieLFurguson@armyspy.com',
			brigadeId: brigade1.id
		}, {
			fullName: 'David J. Torres',
			address: '',
			phone: '',
			email: 'DavidJTorres@teleworm.us',
			brigadeId: brigade2.id
		}]);
	},
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};