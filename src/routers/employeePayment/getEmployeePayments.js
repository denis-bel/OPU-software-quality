import middlewareWrapper from '@lib/middlewareWrapper';
import EmployeePayment from '@classes/dbModels/EmployeePayment';

async function getEmployeePayments(req, res) {
	const { employeeId } = req.params;
	const payments = await EmployeePayment.find({ where: { employeeId } });
	res.send({ payments });
}

export default [middlewareWrapper(getEmployeePayments)];