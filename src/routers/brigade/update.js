import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';
import Brigade from '@classes/dbModels/Brigade';
import middlewareWrapper from '@lib/middlewareWrapper';

async function update(req, res) {
	const { id, ...data } = req.body;
	if (!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	const brigade = await Brigade.updateById(data, id);
	res.send({ brigade });
}

export default [middlewareWrapper(update)];