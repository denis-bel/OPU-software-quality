import middlewareWrapper from '@lib/middlewareWrapper';
import Employee from '@classes/dbModels/Employee';

async function find(req, res) {
	const employees = await Employee.findMaxAndMinPayment();
	res.send({ employees });
}

export default [middlewareWrapper(find)];