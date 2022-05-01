import middlewareWrapper from '@lib/middlewareWrapper';
import Work from '@classes/dbModels/Work';

async function getAll(req, res) {
	const { activityId } = req.query;
	const works = await Work.findWithName({ where: { activityId } });
	res.json({ works });
}

export default [middlewareWrapper(getAll)];