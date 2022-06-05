import middlewareWrapper from '@lib/middlewareWrapper';
import Material from '@classes/dbModels/Material';
import UserLog from '@classes/dbModels/UserLog';

async function update(req, res) {
	await Material.updateMostUsed();
	const { user } = req;
	await UserLog.create({ userId: user.id, action: 'Update most used material' });
	res.send({ message: 'updated' });
}

export default [middlewareWrapper(update)];