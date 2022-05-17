import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Tool from '@classes/dbModels/Tool';

async function create(req, res) {
	const { name } = req.body;
	const tool = await Tool.create({ name });
	if (tool) {
		res.status(HTTP_CODE_CREATED).json({ tool });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];