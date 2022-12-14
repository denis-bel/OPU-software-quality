import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Work from '@classes/dbModels/Work';
import UserLog from '@classes/dbModels/UserLog';

async function deleteWork(req, res) {
	const { id } = req.params;
	const work = await Work.findById(id);
	if (!work) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Work not found'
		});
	}
	const isDeleted = await Work.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete work' });
		return res.send({
			message: 'Work was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting work'
		});
	}
}

export default [middlewareWrapper(deleteWork)];