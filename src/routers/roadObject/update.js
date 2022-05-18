import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import RoadObject from '@classes/dbModels/RoadObject';

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
	const roadObject = await RoadObject.updateById(data, id);
	res.send({ roadObject });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];