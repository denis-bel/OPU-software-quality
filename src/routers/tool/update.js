import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Tool from '@classes/dbModels/Tool';

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
	const tool = await Tool.updateById(data, id);
	res.send({ tool });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];