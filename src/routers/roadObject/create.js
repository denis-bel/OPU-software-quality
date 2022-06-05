import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import RoadObject from '@classes/dbModels/RoadObject';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { name, number, address } = req.body;
	const roadObject = await RoadObject.create({ name, number, address });
	if (roadObject) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create road object' });
		res.status(HTTP_CODE_CREATED).json({ roadObject });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];