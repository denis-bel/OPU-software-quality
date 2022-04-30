import Brigade from '@classes/dbModels/Brigade';
import RoadObject from '@classes/dbModels/RoadObject';

const tableName = 'activities';
const now = () => new Date();

module.exports = {
	up: async queryInterface => {
		const brigade1 = await Brigade.findOne({ where: { number: 1 } });
		const brigade2 = await Brigade.findOne({ where: { number: 2 } });
		
		const roadObject1 = await RoadObject.findOne({ where: { number: 1 } });
		const roadObject2 = await RoadObject.findOne({ where: { number: 3 } });
		
		return await queryInterface.bulkInsert(tableName, [
			{
				startDate: new Date(now().setHours(now().getHours() - 5)),
				finishDate: now(),
				brigadeId: brigade1.id,
				roadObjectId: roadObject2.id
			},
			{
				startDate: new Date(now().setDate(now().getDate() - 3)),
				finishDate: new Date(now().setHours(now().getHours() - 5)),
				brigadeId: brigade1.id,
				roadObjectId: roadObject1.id
			},
			{
				startDate: new Date(now().setDate(now().getDate() - 7)),
				finishDate: new Date(now().setDate(now().getDate() - 2)),
				brigadeId: brigade2.id,
				roadObjectId: roadObject1.id
			}
		]);
	},
	down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};