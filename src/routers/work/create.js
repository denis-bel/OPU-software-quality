import middlewareWrapper from '@lib/middlewareWrapper';
import Work from '@classes/dbModels/Work';

async function create(req, res) {
	const { startDate, finishDate, activityId, workTypeId } = req.body;
	const work = await Work.create({ startDate, finishDate, activityId, workTypeId });
	res.json({ work });
}

export default [middlewareWrapper(create)];