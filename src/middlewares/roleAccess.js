import { HTTP_CODE_FORBIDDEN } from '@constants/httpCode';

export default roles => {
	return async (req, res, next) => {
		if (roles.includes(req.user.role)) {
			next();
		} else {
			res.status(HTTP_CODE_FORBIDDEN).json({
				message: 'You are not authorized to access this resource'
			});
		}
	};
};