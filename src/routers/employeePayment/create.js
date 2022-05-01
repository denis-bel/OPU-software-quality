import middlewareWrapper from '@lib/middlewareWrapper';
import EmployeePayment from '@classes/dbModels/EmployeePayment';

async function create(req, res) {
	const { employeeId, sum, date } = req.body;
	const payment = await EmployeePayment.create({ employeeId, sum, date });
	res.json({ payment });
}

export default [middlewareWrapper(create)];