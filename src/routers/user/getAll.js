import User from '@classes/dbModels/User';
import middlewareWrapper from '@lib/middlewareWrapper';

async function getAll(req, res) {
	const users = await User.findAll(['id', 'login', 'role', 'createdAt', 'updatedAt']);
	res.send({ users });
}

export default [middlewareWrapper(getAll)];