import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Tool from '@classes/dbModels/Tool';

async function deleteTool(req, res) {
	const { id } = req.params;
	const tool = await Tool.findById(id);
	if (!tool) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Tool not found'
		});
	}
	const isDeleted = await Tool.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Tool deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting brigade'
		});
	}
}

export default [middlewareWrapper(deleteTool)];