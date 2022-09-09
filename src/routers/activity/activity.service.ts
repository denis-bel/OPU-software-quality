import Activity from '@classes/dbModels/Activity';

class ActivityService {
  async getAll(data: { brigadeId?: string, roadObjectId?: string }) {
    const { brigadeId, roadObjectId } = data;
    return await Activity.findWithInclude({ where: { brigadeId, roadObjectId } });
  }
}

export { ActivityService };