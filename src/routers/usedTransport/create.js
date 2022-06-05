import middlewareWrapper from '@lib/middlewareWrapper';
import UsedTransport from '@classes/dbModels/UsedTransport';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { count, activityId, transportId } = req.body;
	const usedTransport = await UsedTransport.create({ count, activityId, transportId });
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Create used transport' });
	res.json({ usedTransport });
}

export default [middlewareWrapper(create)];