import middlewareWrapper from '@lib/middlewareWrapper';
import EmployeePayment from '@classes/dbModels/EmployeePayment';

async function findInRange(req, res) {
	const { minSum, maxSum } = req.query;
	const payments = await EmployeePayment.findInRange(minSum, maxSum);
	res.send({ payments });
}

export default [middlewareWrapper(findInRange)];