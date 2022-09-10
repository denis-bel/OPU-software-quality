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