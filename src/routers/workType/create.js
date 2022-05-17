import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import WorkType from '@classes/dbModels/WorkType';

async function create(req, res) {
	const { name } = req.body;
	const workType = await WorkType.create({ name });
	if (workType) {
		res.status(HTTP_CODE_CREATED).json({ workType });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];