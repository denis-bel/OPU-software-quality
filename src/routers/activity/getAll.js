import middlewareWrapper from '@lib/middlewareWrapper';
import Activity from '@classes/dbModels/Activity';

async function getAll(req, res) {
	const { brigadeId, roadObjectId } = req.query;
	const activities = await Activity.findWithInclude({ where: { brigadeId, roadObjectId } });
	res.json({ activities });
}

export default [middlewareWrapper(getAll)];