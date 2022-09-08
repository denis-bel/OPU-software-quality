import { API_PORT } from '@config/env';
import logger from '@lib/logger';
import { HttpFactory } from '@lib/HttpFactory';
import addRouters from '@routers/index';

const httpServer = HttpFactory.createServer(addRouters);

httpServer.listen(API_PORT, () => {
	logger.info(`Server started on port: ${API_PORT}`);
});