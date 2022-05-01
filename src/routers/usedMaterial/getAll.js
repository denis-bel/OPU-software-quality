import middlewareWrapper from '@lib/middlewareWrapper';
import UsedMaterial from '@classes/dbModels/UsedMaterial';

async function getAll(req, res) {
	const { activityId } = req.query;
	const usedMaterials = await UsedMaterial.findWithName({ where: { activityId } });
	res.json({ usedMaterials });
}

export default [middlewareWrapper(getAll)];