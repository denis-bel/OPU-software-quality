import { HTTP_CODE_CREATED, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Brigade from '@classes/dbModels/Brigade';
import middlewareWrapper from '@lib/middlewareWrapper';
import UserLog from '@classes/dbModels/UserLog';

async function create(req, res) {
	const { name, number } = req.body;
	const brigade = await Brigade.create({ number, name });
	if (brigade) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Create brigade' });
		res.status(HTTP_CODE_CREATED).json({ brigade });
	} else {
		res.status(HTTP_CODE_SERVER_ERROR).json({ message: 'Internal server error' });
	}
}

export default [middlewareWrapper(create)];