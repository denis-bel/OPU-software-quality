import middlewareWrapper from '@lib/middlewareWrapper';
import Material from '@classes/dbModels/Material';

async function getAll(req, res) {
	const materials = await Material.findAll();
	res.send({ materials });
}

export default [middlewareWrapper(getAll)];