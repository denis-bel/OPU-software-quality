import middlewareWrapper from '@lib/middlewareWrapper';
import EmployeePayment from '@classes/dbModels/EmployeePayment';

async function getCount(req, res) {
	const { employeeId } = req.params;
	const count = await EmployeePayment.getPaymentCount(employeeId);
	res.send({ count });
}

export default [middlewareWrapper(getCount)];