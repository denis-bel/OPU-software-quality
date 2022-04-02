import User from '@classes/dbModels/User';
import { HTTP_CODE_BAD_REQUEST } from '@constants/httpCode';

async function update(req, res) {
	const { id, password, ...data } = req.body;
	if(!id) {
		return res.status(HTTP_CODE_BAD_REQUEST).json({
			message: 'Missing id'
		});
	}
	if (password) {
		data.password = await User.hashPassword(password);
	}
	const user = await User.updateById(data, id);
	res.send({ user });
}

export default [update];