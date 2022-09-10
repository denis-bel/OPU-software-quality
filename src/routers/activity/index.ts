import type { Request, Response, Router } from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import { AbstractRouter } from '@routers/AbstractRouter';
import { ActivityService } from '@routers/activity/activity.service';
import { HttpError } from '@lib/http-error';

type AuthedRequest = Request & { user: { id: string } }

class ActivityRouter extends AbstractRouter {
  private readonly activityService: ActivityService;

  constructor(router: Router) {
    super(router);
    this.activityService = new ActivityService();
  }

  protected initializeRoutes() {
    this.router.use(authorizeUser);
    this.router.get('/all', this.wrapRoute(this.getAll));
    this.router.post('/', this.wrapRoute(this.create));
    this.router.put('/', this.wrapRoute(this.update));
    this.router.delete('/:id', this.wrapRoute(this.delete));
  }

  private async getAll(req: Request, res: Response) {
    const { brigadeId, roadObjectId } = req.query;
    if (brigadeId && typeof brigadeId !== 'string' || roadObjectId && roadObjectId !== 'string') {
      return res.status(HTTP_CODE_BAD_REQUEST).send({ message: 'brigadeId and roadObjectId must be strings' });
    }
    const activities = await this.activityService.getAll({ brigadeId, roadObjectId });
    res.json({ activities });
  }

  private async create(req: AuthedRequest, res: Response) {
    const { startDate, finishDate, brigadeId, roadObjectId } = req.body;
    const { user } = req;
    const activity = await this.activityService.create({
      user,
      activityData: { startDate, finishDate, brigadeId, roadObjectId }
    });
    res.json({ activity });
  }

  private async update(req: AuthedRequest, res: Response) {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(HTTP_CODE_BAD_REQUEST).json({
        message: 'Missing id'
      });
    }
    const { user } = req;
    const activity = await this.activityService.update(id, { user, activityData: data });
    res.send({ activity });
  }

  private async delete(req: AuthedRequest, res: Response) {
    const { id } = req.params;
    const { user } = req;
    try {
      await this.activityService.delete(id, user);
      return res.send({
        message: 'Activity was deleted successfully'
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.code).send({ message: error.message });
      } else {
        throw error;
      }
    }
  }
}

export { ActivityRouter };