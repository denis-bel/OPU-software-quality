import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import { HttpError } from '@lib/http-error';

type User = {
  id: string;
}

type CreateActivityParam = {
  activityData: {
    startDate: string;
    finishDate: string;
    brigadeId: string;
    roadObjectId: string;
  }
  user: User;
}


class ActivityService {
  async getAll(data: { brigadeId?: string, roadObjectId?: string }) {
    const { brigadeId, roadObjectId } = data;
    return await Activity.findWithInclude({ where: { brigadeId, roadObjectId } });
  }

  async create({ activityData, user }: CreateActivityParam) {
    const { startDate, finishDate, brigadeId, roadObjectId } = activityData;
    const activity = await Activity.create({ startDate, finishDate, brigadeId, roadObjectId });
    await UserLog.create({ userId: user.id, action: 'Create activity' });
    return activity;
  }

  async update(id: string, data: { user: User, activityData: Object }) {
    const { user, activityData } = data;
    const activity = await Activity.updateById(activityData, id);
    await UserLog.create({ userId: user.id, action: 'Update activity' });
    return activity;
  }

  async delete(id: string, user: User) {
    const activity = await Activity.findById(id);
    if (!activity) {
      throw new HttpError('Activity not found', HTTP_CODE_NOT_FOUND);
    }
    const isDeleted = await Activity.deleteById(id);
    if (isDeleted) {
      await UserLog.create({ userId: user.id, action: 'Delete activity' });
      return true;
    } else {
      throw new HttpError('Error deleting activity', HTTP_CODE_SERVER_ERROR);
    }
  }
}

export { ActivityService };