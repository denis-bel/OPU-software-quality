import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Material from '@classes/dbModels/Material';

async function deleteMaterial(req, res) {
	const { id } = req.params;
	const material = await Material.findById(id);
	if (!material) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Material not found'
		});
	}
	const isDeleted = await Material.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Material deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting brigade'
		});
	}
}

export default [middlewareWrapper(deleteMaterial)];