import middlewareWrapper from '@lib/middlewareWrapper';
import UsedTransport from '@classes/dbModels/UsedTransport';

async function getAll(req, res) {
	const { activityId } = req.query;
	const usedTransports = await UsedTransport.findWithName({ where: { activityId } });
	res.json({ usedTransports });
}

export default [middlewareWrapper(getAll)];