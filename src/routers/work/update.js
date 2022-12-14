import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Work from '@classes/dbModels/Work';
import UserLog from '@classes/dbModels/UserLog';

async function checkData(req, res, next) {
	const { id } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	next();
}

async function update(req, res) {
	const { id, ...data } = req.body;
	const work = await Work.updateById(data, id);
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Update work' });
	res.send({ work });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];