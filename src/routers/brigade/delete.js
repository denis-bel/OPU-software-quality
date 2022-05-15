import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';
import Brigade from '@classes/dbModels/Brigade';

async function deleteBrigade(req, res) {
	const { id } = req.params;
	const user = await Brigade.findById(id);
	if (!user) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
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