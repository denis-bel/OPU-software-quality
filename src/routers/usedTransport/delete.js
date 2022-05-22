import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import UsedTransport from '@classes/dbModels/UsedTransport';

async function deleteUsedTransport(req, res) {
	const { id } = req.params;
	const usedTransport = await UsedTransport.findById(id);
	if (!usedTransport) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Used transport not found'
		});
	}
	const isDeleted = await UsedTransport.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Used transport was deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting used transport'
		});
	}
}

export default [middlewareWrapper(deleteUsedTransport)];