import User from '@classes/dbModels/User';
import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import UserLog from '@classes/dbModels/UserLog';

async function update(req, res) {
	const { id, password, ...data } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	if (password) {
		data.password = await User.hashPassword(password);
	}
	const user = await User.updateById(data, id);
	await UserLog.create({ userId: req.user.id, action: 'Update user' });
	res.send({ user });
}

export default [middlewareWrapper(update)];