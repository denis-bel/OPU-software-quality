import User from '@classes/dbModels/User';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import UserLog from '@classes/dbModels/UserLog';

async function checkUserExists(req, res, next) {
	const { login } = req.body;
	const user = await User.findOne({ where: { login } });
	if (user) {
		res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'User with this login already exists'
		});
		return;
	}
	next();
}


async function create(req, res) {
	const { login, password, role } = req.body;
	const user = await User.create({ login, password, role });
	if (user) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create user' });
		res.status(HTTP_CODE_CREATED).json({ login, role });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(checkUserExists), middlewareWrapper(create)];