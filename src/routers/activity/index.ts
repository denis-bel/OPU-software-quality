import type { Request, Response } from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import { AbstractRouter } from '@routers/AbstractRouter';

type AuthedRequest = Request & { user: { id: string } }

class ActivityRouter extends AbstractRouter{
  protected initializeRoutes() {
    this.router.use(authorizeUser);
    this.router.get('/all', this.wrapRoute(this.getAll));
    this.router.post('/', this.wrapRoute(this.create));
    this.router.put('/', this.wrapRoute(this.update));
    this.router.delete('/:id', this.wrapRoute(this.delete));
  }

  private async getAll(req: Request, res: Response) {
    const { brigadeId, roadObjectId } = req.query;
    const activities = await Activity.findWithInclude({ where: { brigadeId, roadObjectId } });
    res.json({ activities });
  }

  private async create(req: AuthedRequest, res: Response) {
    const { startDate, finishDate, brigadeId, roadObjectId } = req.body;
    const activity = await Activity.create({ startDate, finishDate, brigadeId, roadObjectId });
    const { user } = req;
    await UserLog.create({ userId: user.id, action: 'Create activity' });
    res.json({ activity });
  }

  private async update(req: AuthedRequest, res: Response) {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(HTTP_CODE_BAD_REQUEST).json({
        message: 'Missing id'
      });
    }
    const activity = await Activity.updateById(data, id);
    const { user } = req;
    await UserLog.create({ userId: user.id, action: 'Update activity' });
    res.send({ activity });
  }

  private async delete(req: AuthedRequest, res: Response) {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(HTTP_CODE_NOT_FOUND).json({
        message: 'Activity not found'
      });
    }
    const isDeleted = await Activity.deleteById(id);
    if (isDeleted) {
      const { user } = req;
      await UserLog.create({ userId: user.id, action: 'Delete activity' });
      return res.send({
        message: 'Activity was deleted successfully'
      });
    } else {
      return res.status(HTTP_CODE_SERVER_ERROR).send({
        message: 'Error deleting activity'
      });
    }
  }
}

export { ActivityRouter };