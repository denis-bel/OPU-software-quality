import Activity from '@classes/dbModels/Activity';
import Transport from '@classes/dbModels/Transport';

const tableName = 'used_transports';

module.exports = {
	up: async queryInterface => {
		const activity1 = await Activity.findById(1);
		const activity2 = await Activity.findById(2);
		
		const transport1 = await Transport.findById(3);
		const transport2 = await Transport.findById(2);
		return await queryInterface.bulkInsert(tableName, [
			{
				count: 3,
				transportId: transport1.id,
				activityId: activity1.id
			}, {
				count: 1,
				transportId: transport2.id,
				activityId: activity1.id
			}, {
				count: 2,
				transportId: transport1.id,
				activityId: activity2.id
			}
		]);
	},
	
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};