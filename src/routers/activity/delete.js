import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Activity from '@classes/dbModels/Activity';
import UserLog from '@classes/dbModels/UserLog';

async function deleteActivity(req, res) {
	const { id } = req.params;
	const activity = await Activity.findById(id);
	if (!activity) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Activity not found'
		});
	}
	const isDeleted = await Activity.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete activity' });
		return res.send({
			message: 'Activity was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting activity'
		});
	}
}

export default [middlewareWrapper(deleteActivity)];