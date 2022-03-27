import { HTTP_CODE_AUTHORIZATION_REQUIRED } from '@constants/httpCode';
import User from '@classes/dbModels/User';

export default async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(HTTP_CODE_AUTHORIZATION_REQUIRED).json({
			message: 'Authorization required'
		});
	}
	const token = authHeader.split(' ')[1];
	const user = await User.findByToken(token);
	if (user) {
		req.user = user;
		next();
	} else {
		res.status(HTTP_CODE_AUTHORIZATION_REQUIRED).json({
			message: 'Authorization required'
		});
	}
	
}