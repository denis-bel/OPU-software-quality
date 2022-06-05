import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Employee from '@classes/dbModels/Employee';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { fullName, address, phone, email, brigadeId } = req.body;
	const employee = await Employee.create({ fullName, address, phone, email, brigadeId });
	if (employee) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create employee' });
		res.status(HTTP_CODE_CREATED).json({ employee });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];