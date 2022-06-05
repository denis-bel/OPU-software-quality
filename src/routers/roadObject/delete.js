import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import RoadObject from '@classes/dbModels/RoadObject';
import UserLog from '@classes/dbModels/UserLog';

async function deleteRoadObject(req, res) {
	const { id } = req.params;
	const roadObject = await RoadObject.findById(id);
	if (!roadObject) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Road object not found'
		});
	}
	const isDeleted = await RoadObject.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete road object' });
		return res.send({
			message: 'Road object was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting road object'
		});
	}
}

export default [middlewareWrapper(deleteRoadObject)];