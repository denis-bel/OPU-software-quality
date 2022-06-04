import middlewareWrapper from '@lib/middlewareWrapper';
import RoadObject from '@classes/dbModels/RoadObject';

async function getWithoutActivities(req, res) {
	const roadObjects = await RoadObject.getAllWithoutActivities();
	res.send({ roadObjects });
}

export default [middlewareWrapper(getWithoutActivities)];