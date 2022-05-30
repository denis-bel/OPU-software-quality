import Brigade from '@classes/dbModels/Brigade';
import middlewareWrapper from '@lib/middlewareWrapper';

async function getAll(req, res) {
	const brigades = await Brigade.findAllWithEmployeeCount();
	res.send({ brigades });
}

export default [middlewareWrapper(getAll)];