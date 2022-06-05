import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import middlewareWrapper from '@lib/middlewareWrapper';
import Transport from '@classes/dbModels/Transport';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { name } = req.body;
	const transport = await Transport.create({ name });
	if (transport) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create transport' });
		res.status(HTTP_CODE_CREATED).json({ transport });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];