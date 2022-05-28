import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import UsedTool from '@classes/dbModels/UsedTool';

async function deleteUsedTool(req, res) {
	const { id } = req.params;
	const usedTool = await UsedTool.findById(id);
	if (!usedTool) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Used tool not found'
		});
	}
	const isDeleted = await UsedTool.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Used tool deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting used tool'
		});
	}
}

export default [middlewareWrapper(deleteUsedTool)];