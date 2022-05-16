import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_NOT_FOUND, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Brigade from '@classes/dbModels/Brigade';

async function deleteBrigade(req, res) {
	const { id } = req.params;
	const brigade = await Brigade.findById(id);
	if (!brigade) {
		return res.status(HTTP_CODE_NOT_FOUND).json({
			message: 'Brigade not found'
		});
	}
	const isDeleted = await Brigade.deleteById(id);
	if (isDeleted) {
		return res.send({
			message: 'Brigade deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting brigade'
		});
	}
}

export default [middlewareWrapper(deleteBrigade)];