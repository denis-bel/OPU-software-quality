import middlewareWrapper from '@lib/middlewareWrapper';
import Tool from '@classes/dbModels/Tool';

async function getAll(req, res) {
	const tools = await Tool.findAll();
	res.send({ tools });
}

export default [middlewareWrapper(getAll)];