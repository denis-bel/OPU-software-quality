import middlewareWrapper from '@lib/middlewareWrapper';
import UserLog from '@classes/dbModels/UserLog';

async function logout(req, res) {
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Logged out' });
	res.send({ message: 'Logged out' });
}

export default [middlewareWrapper(logout)];