import middlewareWrapper from '@lib/middlewareWrapper';
import UsedTool from '@classes/dbModels/UsedTool';

async function getAll(req, res) {
	const { activityId } = req.query;
	const usedTools = await UsedTool.findWithName({ where: { activityId } });
	res.json({ usedTools });
}

export default [middlewareWrapper(getAll)];