import ExpressError from '@classes/ExpressError';
import { NODE_ENV } from '@config/env';

export default middleware => (req, res, next) => {
	return middleware(req, res, next)
		.catch(error => {
			if (NODE_ENV === 'development') {
				console.error(error);
			}
			next(new ExpressError('Internal server error'));
		});
}
