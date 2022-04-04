import User from '@classes/dbModels/User';
import middlewareWrapper from '@lib/middlewareWrapper';
import { HTTP_CODE_BAD_REQUEST, HTTP_CODE_SERVER_ERROR } from '@constants/httpCode';

async function deleteUser(req, res) {
	const { id } = req.params;
	const user = await User.findById(id);
	if(!user) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'User not found'
		});
	}
	const isDeleted = await User.deleteById(id);
	if(isDeleted) {
		return res.send({
			message: 'User deleted successfully'
		});
	} else {
		return res.status(HTTP_CODE_SERVER_ERROR).send({
			message: 'Error deleting user'
		});
	}
}

export default [middlewareWrapper(deleteUser)]