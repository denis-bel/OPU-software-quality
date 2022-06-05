import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Tool from '@classes/dbModels/Tool';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { name } = req.body;
	const tool = await Tool.create({ name });
	if (tool) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create tool' });
		res.status(HTTP_CODE_CREATED).json({ tool });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];