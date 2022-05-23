import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import UsedMaterial from '@classes/dbModels/UsedMaterial';

async function create(req, res) {
	const { unitFee, count, activityId, materialId } = req.body;
	const usedMaterial = await UsedMaterial.create({ unitFee, count, activityId, materialId });
	if (usedMaterial) {
		res.status(HTTP_CODE_CREATED).json({ usedMaterial });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];