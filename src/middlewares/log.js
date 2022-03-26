import onFinished from 'on-finished';
import logger from '@lib/logger';

export default (req, res, next) => {
	onFinished(res, () => {
		if (res.statusCode >= 500) {
			logger.error(`${req.method} ${req.originalUrl} - ${res.statusCode}. request body: ${JSON.stringify(req.body)}`);
		} else if (res.statusCode >= 400) {
			logger.warn(`${req.method} ${req.originalUrl} - ${res.statusCode}. request body: ${JSON.stringify(req.body)}`);
		} else {
			logger.http(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
		}
	});
	next();
};