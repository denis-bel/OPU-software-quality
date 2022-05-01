import Activity from '@classes/dbModels/Activity';
import WorkType from '@classes/dbModels/WorkType';

const tableName = 'works';

module.exports = {
	up: async queryInterface => {
		const activity1 = await Activity.findById(1);
		const activity2 = await Activity.findById(3);
		
		const workType1 = await WorkType.findById(1);
		const workType2 = await WorkType.findById(2);
		return await queryInterface.bulkInsert(tableName, [
			{
				workTypeId: workType1.id,
				activityId: activity1.id,
				startDate: activity1.startDate,
				finishDate: activity1.finishDate
			}, {
				workTypeId: workType2.id,
				activityId: activity1.id,
				startDate: activity1.startDate,
				finishDate: activity1.finishDate
			}, {
				workTypeId: workType2.id,
				activityId: activity2.id,
				startDate: activity2.startDate,
				finishDate: activity2.finishDate
			}
		]);
	},
	
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};