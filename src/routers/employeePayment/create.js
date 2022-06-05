import middlewareWrapper from '@lib/middlewareWrapper';
import EmployeePayment from '@classes/dbModels/EmployeePayment';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { employeeId, sum, date } = req.body;
	const payment = await EmployeePayment.create({ employeeId, sum, date });
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Create payment' });
	res.json({ payment });
}

export default [middlewareWrapper(create)];