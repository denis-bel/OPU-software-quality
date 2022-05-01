import Activity from '@classes/dbModels/Activity';
import Tool from '@classes/dbModels/Tool';

const tableName = 'used_tools';

module.exports = {
  up: async queryInterface => {
    const activity1 = await Activity.findById(1);
    const activity2 = await Activity.findById(2);
    
    const tool1 = await Tool.findById(3);
    const tool2 = await Tool.findById(2);
    return await queryInterface.bulkInsert(tableName, [
      {
        count: 5,
        toolId: tool1.id,
        activityId: activity1.id
      }, {
        count: 10,
        toolId: tool2.id,
        activityId: activity1.id
      }, {
        count: 1,
        toolId: tool2.id,
        activityId: activity2.id
      }
    ]);
  },
  
  down: queryInterface => queryInterface.bulkDelete(tableName, null, {})
};