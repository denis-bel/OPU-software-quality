import Brigade from '@classes/dbModels/Brigade';
import middlewareWrapper from '@lib/middlewareWrapper';

async function withBestEmployees(req, res) {
	const brigades = await Brigade.findAllWithBestEmployee();
	res.send({ brigades });
}

export default [middlewareWrapper(withBestEmployees)];