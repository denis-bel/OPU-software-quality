import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Transport from '@classes/dbModels/Transport';
import UserLog from '@classes/dbModels/UserLog';

async function deleteTransport(req, res) {
	const { id } = req.params;
	const transport = await Transport.findById(id);
	if (!transport) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Transport not found'
		});
	}
	const isDeleted = await Transport.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete transport' });
		return res.send({
			message: 'Transport deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting transport'
		});
	}
}

export default [middlewareWrapper(deleteTransport)];