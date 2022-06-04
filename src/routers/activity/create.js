import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { startDate, finishDate, brigadeId, roadObjectId } = req.body;
	const activity = await Activity.create({ startDate, finishDate, brigadeId, roadObjectId });
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Create activity' });
	res.json({ activity });
}

export default [middlewareWrapper(create)];