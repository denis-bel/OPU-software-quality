import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import UsedMaterial from '@classes/dbModels/UsedMaterial';
import UserLog from '@classes/dbModels/UserLog';

async function deleteUsedMaterial(req, res) {
	const { id } = req.params;
	const usedMaterial = await UsedMaterial.findById(id);
	if (!usedMaterial) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Brigade not found'
		});
	}
	const isDeleted = await UsedMaterial.deleteById(id);
	if (isDeleted) {
		const { user } = req;
		await UserLog.create({ userId: user.id, action: 'Delete used material' });
		return res.send({
			message: 'Brigade deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting used material'
		});
	}
}

export default [middlewareWrapper(deleteUsedMaterial)];