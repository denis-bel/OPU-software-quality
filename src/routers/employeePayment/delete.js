import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import EmployeePayment from '@classes/dbModels/EmployeePayment';

async function deletePayment(req, res) {
	const { id } = req.params;
	const payment = await EmployeePayment.findById(id);
	if (!payment) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Payment not found'
		});
	}
	const isDeleted = await EmployeePayment.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Payment was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting payment'
		});
	}
}

export default [middlewareWrapper(deletePayment)];