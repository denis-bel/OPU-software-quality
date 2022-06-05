import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Employee from '@classes/dbModels/Employee';
import UserLog from '@classes/dbModels/UserLog';

async function deleteEmployee(req, res) {
	const { id } = req.params;
	const employee = await Employee.findById(id);
	if (!employee) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Employee not found'
		});
	}
	const isDeleted = await Employee.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete employee' });
		return res.send({
			message: 'Employee deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting employee'
		});
	}
}

export default [middlewareWrapper(deleteEmployee)];