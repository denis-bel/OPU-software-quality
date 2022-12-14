## 1
class Model => abstract class Model
## 2
Make private fields
```typescript
	/**
	 * Name of the table
	 */
	private static _tableName: string;
	
	/**
	 * Client to execute database query
	 */
	private static _dbClient: Pool;
	
	/**
	 * If true, createdAt and updatedAt fields will be updated automatically
	 */
	private static _withTimeStamps = false;
```

## 3
Inline method
```typescript
import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';

async function update(req, res) {
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

export default [middlewareWrapper(update)];
```

## 4
Wrap methods to class
```typescript
import type { Request, Response, Router } from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';

type AuthedRequest = Request & { user: { id: string } }

class ActivityRouter {
  private readonly router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.router.use(authorizeUser);
    this.router.get('/all', this.wrapRoute(this.getAll));
    this.router.post('/', this.wrapRoute(this.create));
    this.router.put('/', this.wrapRoute(this.update));
    this.router.delete('/:id', this.wrapRoute(this.delete));
  }

  private wrapRoute(route: Function) {
    const wrappedRouter = middlewareWrapper(route);
    return wrappedRouter.bind(this);
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
```

```typescript
	app.use('/activity', new ActivityRouter(express.Router()).getRouter());
```

## 5
Move duplicated code to abstract class

```typescript
import { Router } from 'express';
import middlewareWrapper from '@lib/middlewareWrapper';

abstract class AbstractRouter {
  protected readonly router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  protected abstract initializeRoutes(): void;

  protected wrapRoute(route: Function) {
    const wrappedRouter = middlewareWrapper(route);
    return wrappedRouter.bind(this);
  }
}

export { AbstractRouter };
```

## 6
Rename method

```typescript
  static _addWhereClause(query: Query, where?: Object) {
```

## 7
Introduce factory
```typescript
import express, { Express } from 'express';
import cors from 'cors';
import { NODE_ENV } from '@config/env';
import errorHandler from '@middlewares/errorHandler';
import log from '@middlewares/log';

class HttpFactory {
  static createServer(addRouters: (server: Express) => void) {
    const httpServer = express();
    httpServer.use(log);
    if (NODE_ENV === 'development') {
      httpServer.use(cors());
    }
    httpServer.use(express.json());
    addRouters(httpServer);
    httpServer.use(errorHandler);
    return httpServer;
  }
}

export { HttpFactory };
```

## 7 
Move logic to activity service
```typescript
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
```

## 8
Extract methods

```javascript
import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

export default (error, req, res, next) => {
	const { message, status } = error;
	res.status(getStatus(status)).json({ message: getMessage(message) });
	next();
}

function getStatus(status) {
	return status || HTTP_CODE_SERVER_ERROR;
}

function getMessage(message) {
	return message || 'Internal server error';
}
```

## 9
Replace conditional with Polymorphism 

```typescript
import onFinished from 'on-finished';
import logger from '@lib/logger';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  onFinished(res, () => {
    const logMessage = LogMessageFactory.createLogMessage(req, res);
    logMessage.log();
  });
  next();
};

class LogMessageFactory {
  static createLogMessage(req: Request, res: Response) {
    if (res.statusCode >= 500) {
      return new ErrorLogMessage(req, res);
    } else if (res.statusCode >= 400) {
      return new WarnLogMessage(req, res);
    } else {
      return new HttpLogMessage(req, res);
    }
  }
}

abstract class LogMessage {
  protected readonly req: Request;
  protected readonly res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  abstract log(): void;
}

class ErrorLogMessage extends LogMessage {
  log() {
    logger.error(`${this.req.method} ${this.req.originalUrl} - ${this.res.statusCode}. request body: ${JSON.stringify(this.req.body)}`);
  }
}

class WarnLogMessage extends LogMessage {
  log() {
    logger.warn(`${this.req.method} ${this.req.originalUrl} - ${this.res.statusCode}. request body: ${JSON.stringify(this.req.body)}`);
  }
}

class HttpLogMessage extends LogMessage {
  log() {
    logger.http(`${this.req.method} ${this.req.originalUrl} - ${this.res.statusCode}`);
  }
}
```