import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import WorkType from '@classes/dbModels/WorkType';
import UserLog from '@classes/dbModels/UserLog';

async function deleteWorkType(req, res) {
	const { id } = req.params;
	const workType = await WorkType.findById(id);
	if (!workType) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Work type not found'
		});
	}
	const isDeleted = await WorkType.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete work type' });
		return res.send({
			message: 'Work type was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting work type'
		});
	}
}

export default [middlewareWrapper(deleteWorkType)];