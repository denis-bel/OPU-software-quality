import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';

async function update(req, res) {
	const { id, ...data } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	const activity = await Activity.updateById(data, id);
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Update activity' });
	res.send({ activity });
}

export default [middlewareWrapper(update)];