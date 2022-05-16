import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Material from '@classes/dbModels/Material';

async function create(req, res) {
	const { name, unitFee } = req.body;
	const material = await Material.create({ name, unitFee });
	if (material) {
		res.status(HTTP_CODE_CREATED).json({ material });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];