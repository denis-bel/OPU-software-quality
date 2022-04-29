import middlewareWrapper from '@lib/middlewareWrapper';
import RoadObject from '@classes/dbModels/RoadObject';

async function getAll(req, res) {
	const roadObjects = await RoadObject.findAll();
	res.send({ roadObjects });
}

export default [middlewareWrapper(getAll)];