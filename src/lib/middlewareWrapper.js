import logger from '@lib/logger';
import { HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

export default middleware => (req, res, next) => {
	return middleware(req, res, next)
		.catch(error => {
			logger.error(error.message);
			const expressError = new Error('Internal Server Error');
			expressError.status = HTTP_CODE_SERVER_ERROR;
			next(expressError);
		});
}
