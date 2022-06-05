import middlewareWrapper from '@lib/middlewareWrapper';
import Work from '@classes/dbModels/Work';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { startDate, finishDate, activityId, workTypeId } = req.body;
	const work = await Work.create({ startDate, finishDate, activityId, workTypeId });
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Create work' });
	res.json({ work });
}

export default [middlewareWrapper(create)];