import middlewareWrapper from '@lib/middlewareWrapper';
import Material from '@classes/dbModels/Material';

async function update(req, res) {
	await Material.updateMostUsed();
	res.send({ message: 'updated' });
}

export default [middlewareWrapper(update)];