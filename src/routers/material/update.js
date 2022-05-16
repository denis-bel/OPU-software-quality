import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Material from '@classes/dbModels/Material';

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
	const material = await Material.updateById(data, id);
	res.send({ material });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];