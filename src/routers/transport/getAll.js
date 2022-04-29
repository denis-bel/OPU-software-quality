import middlewareWrapper from '@lib/middlewareWrapper';
import Transport from '@classes/dbModels/Transport';

async function getAll(req, res) {
	const transports = await Transport.findAll();
	res.send({ transports });
}

export default [middlewareWrapper(getAll)];