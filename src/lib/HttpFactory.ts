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