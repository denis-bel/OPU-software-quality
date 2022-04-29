import middlewareWrapper from '@lib/middlewareWrapper';
import WorkType from '@classes/dbModels/WorkType';

async function getAll(req, res) {
	const workTypes = await WorkType.findAll();
	res.send({ workTypes });
}

export default [middlewareWrapper(getAll)];