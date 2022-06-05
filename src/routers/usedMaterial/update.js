import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import UsedMaterial from '@classes/dbModels/UsedMaterial';
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
	const usedMaterial = await UsedMaterial.updateById(data, id);
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Update used material' });
	res.send({ usedMaterial });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];