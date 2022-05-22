import middlewareWrapper from '@lib/middlewareWrapper';
import UsedTransport from '@classes/dbModels/UsedTransport';

async function create(req, res) {
	const { count, activityId, transportId } = req.body;
	const usedTransport = await UsedTransport.create({ count, activityId, transportId });
	res.json({ usedTransport });
}

export default [middlewareWrapper(create)];