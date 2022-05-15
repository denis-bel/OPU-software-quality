import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import Brigade from '@classes/dbModels/Brigade';
import middlewareWrapper from '@lib/middlewareWrapper';

async function checkData(req, res, next) {
	const { id, ...data } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	const { number } = data;
	if (number) {
		const existingBrigade = await Brigade.findOne({ where: { number } });
		if (existingBrigade) {
			return res.status(HTTP_CODE_BAD_REQUEST).json({
				message: 'Duplicated brigade number'
			});
		}
	}
	next();
}

async function update(req, res) {
	const { id, ...data } = req.body;
	const brigade = await Brigade.updateById(data, id);
	res.send({ brigade });
}

export default [middlewareWrapper(checkData), middlewareWrapper(update)];