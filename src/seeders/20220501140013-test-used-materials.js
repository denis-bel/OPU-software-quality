import Activity from '@classes/dbModels/Activity';
import Material from '@classes/dbModels/Material';

const tableName = 'used_materials';

module.exports = {
  up: async queryInterface => {
    const activity1 = await Activity.findById(1);
    const activity2 = await Activity.findById(2);
    
    const material1 = await Material.findById(3);
    const material2 = await Material.findById(2);
    return await queryInterface.bulkInsert(tableName, [
      {
        count: 10,
        materialId: material1.id,
        activityId: activity1.id,
        unitFee: 19.90
      }, {
        count: 5,
        materialId: material2.id,
        activityId: activity1.id,
        unitFee: 23.10
      }, {
        count: 12,
        materialId: material1.id,
        activityId: activity2.id,
        unitFee: 5
      }
    ]);
  },
  
  down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};