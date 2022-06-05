import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import UsedTool from '@classes/dbModels/UsedTool';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { count, activityId, toolId } = req.body;
	const usedTool = await UsedTool.create({ count, activityId, toolId });
	if (usedTool) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create used tool' });
		res.status(HTTP_CODE_CREATED).json({ usedTool });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];