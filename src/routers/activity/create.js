import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';

async function create(req, res) {
	const { startDate, finishDate, brigadeId, roadObjectId } = req.body;
	const activity = await Activity.create({ startDate, finishDate, brigadeId, roadObjectId });
	res.json({ activity });
}

export default [middlewareWrapper(create)];