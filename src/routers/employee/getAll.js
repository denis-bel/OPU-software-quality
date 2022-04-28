import middlewareWrapper from '@lib/middlewareWrapper';
import Employee from '@classes/dbModels/Employee';

async function getAll(req, res) {
	const employees = await Employee.findAll();
	res.send({ employees });
}

export default [middlewareWrapper(getAll)];