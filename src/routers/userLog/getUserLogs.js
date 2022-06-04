import UserLog from '@classes/dbModels/UserLog';
import middlewareWrapper from '@lib/middlewareWrapper';

async function getUserLogs(req, res) {
	const { userId } = req.params;
	const userLogs = await UserLog.find({ where: { userId } }, ['id', 'action', 'createdAt', 'updatedAt'], { orderBy: 'createdAt' });
	res.json({ userLogs });
}

export default [middlewareWrapper(getUserLogs)];